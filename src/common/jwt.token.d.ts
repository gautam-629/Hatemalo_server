export interface IJwtToken {
    generateToken(payload: { sub: string; role: string }): string;
    verifyToken(token: string): JwtPayloadWithRole;
  }
  