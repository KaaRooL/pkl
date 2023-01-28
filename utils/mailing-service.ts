import nodemailer from 'nodemailer';

async function sendEmail(html:string) {

    let testAccount = await nodemailer.createTestAccount();
    // Create a transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'hallie.kerluke55@ethereal.email',
            pass: 'VwkRF17XZcNfKEPy7U'
        }
    });

    // Define the email options
    let mailOptions = {
        from: '<hallie.kerluke55@ethereal.email>',
        to: 'siwakkarol@gmail.com',
        subject: "Hello world?",
        text: "Hello world?",
        html: "<b>Hello world?</b>"
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);

    console.log(`Email sent: ${info.response}`);
}

export default sendEmail;