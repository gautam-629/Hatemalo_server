
export interface IEmailOptions{
    to:string;
    subject:string;
    html:string;
}

export interface IEmailService{
   sendEmail(options:IEmailOptions):Promise<void>
}