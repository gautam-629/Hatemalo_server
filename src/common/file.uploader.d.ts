export interface IFileUploader {
    single(fieldName: string): multer.Middleware;
    array(fieldName: string, maxCount: number): multer.Middleware;
    fields(fields: multer.Field[]): multer.Middleware;
    deleteFile(filename: string): Promise<boolean>;
  }
  