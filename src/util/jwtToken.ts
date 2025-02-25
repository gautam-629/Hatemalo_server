import jwt, { JwtPayload } from "jsonwebtoken";
import { Config } from "../config";
import CustomErrorHandler from "./customErrorHandler";
import { IJwtToken } from "../common/types";

export interface JwtPayloadWithRole extends JwtPayload {
  sub: string;
  role: string;
}

export class JwtToken implements IJwtToken {
  private secretKey: string;
  private expiresIn: string;

  constructor() {
    this.secretKey = Config.JWT_SECRET || "secretKey";
    this.expiresIn = Config.JWT_EXPIRES_IN || "1h";
  }

  generateToken(payload: { sub: string; role: string }): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): JwtPayloadWithRole {
    try {
      const decoded = jwt.verify(token, this.secretKey) as JwtPayloadWithRole;
      if (!decoded || !decoded.sub || !decoded.role) {
        throw new Error("Invalid token structure");
      }
      return decoded;
    } catch (error: any) {
      throw CustomErrorHandler.unAuthorized(error.message);
    }
  }
}
