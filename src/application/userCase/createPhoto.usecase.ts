import { IAsyncLocalStorage, IFileUploader } from "../../common";
import { IPhoto } from "../../domain/entities";
import { IPhotoRepository, IUserRepository } from "../../domain/repositories";
import { IUseCase } from "../../domain/usecase/userCase";
import CustomErrorHandler from "../../util/customErrorHandler";
import { ORMHelper } from "../../util/ormHelper";

export class CreatePhotoUseCase implements IUseCase<{ fileName: string }, IPhoto> {
    constructor(
      private readonly userRepository: IUserRepository,
      private readonly photoRepository: IPhotoRepository,
      private readonly asyncLocalStorage: IAsyncLocalStorage,
      private readonly fileUploader: IFileUploader
    ) {}
  
    async execute(data: { fileName: string }): Promise<IPhoto> {
      const runner = await ORMHelper.createQueryRunner();
      try {
        await runner.startTransaction();
  
        const userId = this.asyncLocalStorage.getUser()?.id;
        if (!userId) {
          throw CustomErrorHandler.unAuthorized();
        }
  
        const user = await this.userRepository.findById(userId);
        if (!user) {
          throw CustomErrorHandler.notFound("User not found");
        }
  
        const photo = await this.photoRepository.createWithRunner({
          runner,
          user,
          url: data.fileName,
        });
  
        await runner.commitTransaction();
        return photo;
      } catch (error) {
        this.fileUploader.deleteFile(data.fileName);
        await runner.rollbackTransaction();
        throw error;
      } finally {
        await runner.release();
      }
    }
  }
  