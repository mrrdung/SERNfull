require("dotenv").config;
const nodemailer = require("nodemailer");
let sendSimpleEmail = async dataSend => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
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
        to: dataSend.receiversEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHTMLEmail(dataSend),
    });
};
let getBodyHTMLEmail = dataSend => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `<h3>Xin chào ${dataSend.patientName} </h3>
    <p> Bạn nhận được email này vì đã đặt lịch khám bệnh tại HelthDoctor</p>
    <p> Thông tin đặt lịch khám bệnh</p>
    <div><b>THời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là chính xác, vui lòng click vào đường link bên dưới để xác nhận!</p>
    <div>
    <a href="${dataSend.redirectLink}" target="_blank">Click Me</a>
    </div>
     <div>Xin chân thành cảm ơn !</div>
    `;
    }
    if (dataSend.language === "en") {
        result = `<h3>Dear ${dataSend.patientName} </h3>
    <p> You have received this email because you have made an appointment at HelthDoctor</p>
    <p> Appointment information</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    <p>If the above information is correct, please click on the link below to confirm.!</p>
    <div>
    <a href="${dataSend.redirectLink}" target="_blank">Click Me</a>
    </div>
    <div>Thank you very much !</div>
    `;
    }
    return result;
};
// async function main() {}
module.exports = {
    sendSimpleEmail,
};
