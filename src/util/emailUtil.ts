import * as nodemailer from 'nodemailer'
import { Config } from '../config';
import { IEmailOptions, IEmailService } from '../common/types';
export class EmailService implements IEmailService{
    private transporter:nodemailer.Transporter;

    constructor(){
        this.transporter=nodemailer.createTransport({
            host: "smtp.ethereal.email",
           port: 587,
            auth:{
               user:Config.EMAIL_USER,
               pass:Config.EMAIL_PASS
            }
        })
    }
async sendEmail(options: IEmailOptions): Promise<void> {
    try {
         await  this.transporter.sendMail({
            from:Config.EMAIL_USER,
            to:options.to,
            subject:options.subject,
            html:options.html
         })
    } catch (error) {
        throw error;
    }
}
}