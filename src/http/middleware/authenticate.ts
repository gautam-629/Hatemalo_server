import { NextFunction, Request, Response } from "express";
import { IAsyncLocalStorage } from "../../common";
import { IUserRepository } from "../../domain/repositories";
import { UserRepository } from "../../infrastructure/database/pgSql/repository/user.repository";
import { AsyncLocalStorage } from "../../util/asyncLocalStorage";
import { JwtToken } from "../../util/jwtToken";
import CustomErrorHandler from "../../util/customErrorHandler";

type CheckOptions = {
  checkAdmin?: boolean;
  checkProvider?: boolean;
  checkSeeker?: boolean;
};

export interface AuthenticatedRequest extends Request {
  user?: { sub: string };
  headers: {
    authorization?: string;
  };
}
 class AuthMiddleware {
  private jwtToken: JwtToken;
  private userRepository: IUserRepository;
  private asyncLocalStorage: IAsyncLocalStorage;

  constructor() {
    this.jwtToken = new JwtToken();
    this.userRepository = new UserRepository();
    this.asyncLocalStorage = new AsyncLocalStorage();
  }

  authenticate = ({
    checkAdmin = false,
    checkProvider = false,
    checkSeeker = false,
  }: CheckOptions) => {
    return async (
      req: AuthenticatedRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          throw CustomErrorHandler.unAuthorized();
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
          throw CustomErrorHandler.unAuthorized();
        }

        const payload = this.jwtToken.verifyToken(token);
        if (!payload) {
          throw CustomErrorHandler.unAuthorized();
        }

        const roles: Record<string, boolean> = {
          admin: checkAdmin,
          provider: checkProvider,
          seeker: checkSeeker,
        };

        const hasValidRole = Object.keys(roles).some(
          (role) => roles[role] && payload.role === role
        );

        if (!hasValidRole) {
          throw CustomErrorHandler.unAuthorized();
        }

        const user = await this.userRepository.findById(payload.sub);
        if (!user) {
          throw CustomErrorHandler.unAuthorized();
        }

        req.user = { sub: payload.sub };
        this.asyncLocalStorage.setUser(user, next);
      } catch (error) {
        next(error); 
      }
    };
  };
}

export const authMiddleware=new AuthMiddleware()