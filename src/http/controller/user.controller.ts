import { Response, Request, NextFunction } from 'express';
import ResponseHandler from '../../util/responseHandler';
import { IUserservice } from '../../domain/services';

export class UserController {
  constructor(private userService: IUserservice) {}
  async create(req: Request, res: Response, next: NextFunction) {

    try {
      const user = await this.userService.create(req.body);
       ResponseHandler.success(res,user,'User Create SucessFully',201)
    } catch (error) {
      next(error);
    }
  }

 async findAllUsers(req:Request,res:Response,next:NextFunction){
       try {
        const users = await this.userService.findAllUsers()
        return ResponseHandler.success(res,users,"Sucess",201)
       } catch (error) {
          next(error)
       }
  }
  
}
