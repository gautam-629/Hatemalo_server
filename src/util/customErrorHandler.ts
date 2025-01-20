import { ErrorMessages } from "../enum";

class CustomErrorHandler extends Error {
    statusCode: number;
    public errors: any[];

    constructor(statusCode: number, message: string,errors: any[] = []) {
        super(message);
        this.statusCode=statusCode
        this.errors = errors;
    }

    static alreadyExist(message: string = ErrorMessages.AlreadyExist) {
        return new CustomErrorHandler(409, message);
    }

    static timeExpire(message: string = ErrorMessages.TimeExpire) {
        return new CustomErrorHandler(500, message);
    }

    static wrongCredentials(message: string = ErrorMessages.WrongCredentials) {
        return new CustomErrorHandler(401, message);
    }

    static unAuthorized(message: string = ErrorMessages.UnAuthorized) {
        return new CustomErrorHandler(401, message);
    }

    static notFound(message: string = ErrorMessages.NotFound) {
        return new CustomErrorHandler(404, message);
    }

    static serverError(message: string = ErrorMessages.ServerError) {
        return new CustomErrorHandler(500, message);
    }
}

export default CustomErrorHandler;
