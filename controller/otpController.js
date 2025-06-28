const sendOTPToUser = require("../Mail_Transporter/TransportMail.js");
const generateRandomOTP = require("../utils/generateOTP.js");
const otpStoreTemp = require("../utils/storage.js");

async function sendOTP(req, res, next) {
    const { email } = req.body;
    const otp = generateRandomOTP();

    try {
        // response -> true
        const response = await sendOTPToUser(email, otp);
        
        otpStoreTemp[email] = otp;
        console.log(otpStoreTemp);

        res.status(200).json({
            msg: "OTP is send successfully",
        })

    } catch(error) {
        console.log(error);
        next(error);
    }

}

module.exports = {
    sendOTP
}