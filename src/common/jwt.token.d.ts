interface IJwtToken{
    generateToken(payload:Object):string
    verifyToken(token:string):strig | object
}