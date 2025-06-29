const sendOTPToUser = require("../Mail_Transporter/TransportMail.js");
const generateRandomOTP = require("../utils/generateOTP.js");
const otpStoreTemp = require("../utils/storage.js");

async function sendOTP(req, res, next) {
    const { email } = req.body;
    const otp = generateRandomOTP();

    try {
        // response -> true
        const response = await sendOTPToUser(email, otp);
    

        // deleting the otp from the in-memory after 5 minutes
        const timeOut = setTimeout(function() {
            delete otpStoreTemp[email]; // using delete keyword deleting the key-value after 5 minutes
        }, 5 * 60 * 1000);

        otpStoreTemp[email] = {
            timeOut, // if it is verified before 5 minutes => using clearTimout will remove the setTimout
            otp
        };

        console.log(otpStoreTemp[email]);

        res.status(200).json({
            msg: "OTP is send successfully",
        })

    } catch(error) {
        console.log(error);
        next(error);
    }

}

// checking the otp that is stored inside the in-memory storage is matching with the user-send-otp
function verifyOTP(req, res, next) {
    const { email, otp} = req.body;
    const value = otpStoreTemp[email];

    if(!value) {
        res.status(410).json({
            msg: "OTP expired"
        })
        return
        // means the otp is expired know
    }

    if(value.otp !== otp) {
        // 401 -> unauthorized
        res.status(401).json({
            msg: "Invalid OTP"
        })
        return
    }

    clearTimeout(otpStoreTemp[email].timeOut);
    delete(otpStoreTemp[email]);

    res.status(200).json({
        msg: "OTP is correct"
    })

}

module.exports = {
    sendOTP, verifyOTP
}