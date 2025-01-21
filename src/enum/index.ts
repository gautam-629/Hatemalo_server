export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  PLAYER = 'player',
}
export enum UserType{
  provider='provider',
  partner='partner'
}
export enum ErrorMessages {
  AlreadyExist = 'Resource already exists.',
  TimeExpire = 'Time Expire',
  WrongCredentials = 'Email or Password is Wrong!',
  UnAuthorized = 'UnAuthorized',
  NotFound = 'Not found',
  ServerError = 'Internal Server Error',
}
