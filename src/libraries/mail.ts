import nodemailer from 'nodemailer';
import htmlToText from 'html-to-text';
import { devConfig } from '../config/config';

export const sendEmail = (options: any) =>
    new Promise((resolve, reject) => {
        const transpoter = nodemailer.createTransport({
            service: devConfig.email.SERVICE,
            auth: {
                user: 'qa.appcrates@gmail.com',
                pass: 'Appcrates123'
            }
        });
        const text = htmlToText.fromString(options.html, {
            wordwrap: 130
        });
        const mailOptions = {
            from: 'qa.appcrates@gmail.com',
            to: options.email,
            subject: options.subject,
            text,
            html: options.html
        };
        transpoter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return reject(error);
            }
            // console.log('Info ', info);
            // console.log('Message id ', info.messageId);
            // console.log('Preview URL ', nodemailer.getTestMessageUrl(info));
            return resolve(info);
        });
    });
