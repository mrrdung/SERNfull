require("dotenv").config;
const nodemailer = require("nodemailer");
let sendSimpleEmail = async receiversEmail => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORK,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"HelthDoctor" <devtran6789@gmail.com>', // sender address
        to: receiversEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    // async..await is not allowed in global scope, must use a wrapper
};
async function main() {}
module.export = {
    sendSimpleEmail,
};
