import { envs } from "./env";
import nodemailer from 'nodemailer'


const sendMail = (email: string, subject: string, text: string) => {

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "ahmedadama231@gmail.com",
            pass: envs.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "ahmedadama231@gmail.com",
        to: email,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });


}
export default sendMail