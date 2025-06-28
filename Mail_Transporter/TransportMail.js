const nodeMailer = require("nodemailer");

// creating a client to send the mail to the end user using nodemailer
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.TRANSPORTER_EMAIL}`,
        pass: `${process.env.TRANSPORTER_PASS}`
    }
})

// this function will be using email-client / transporter to send the email to the end user
async function sendOTPToUser(userEmail, otp) {
    // sending email is async task => will be performed asynchronoulsy 
    try {
        const response = await transporter.sendMail({
            from: `VocalForLocal ${process.env.TRANSPORTER_EMAIL}`, // becomes the main line of the mail (always mention you brand here)
            to: userEmail,
            subject: "Your OTP code ",
            text: `Your OTP is ${otp}. 
            Do not share it with anyone.
            Expires in 5 minutes`
        })

        return true;

    } catch(error) {
        // will be thrown inside the main function and hence will be calling next
        throw error;
    }
}

module.exports = sendOTPToUser;