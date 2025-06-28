const { emailSchema, otpSchema } = require("../utils/types.js");

function emailVerifySchema(req, res, next) {
    const { email } = req.body;

    const result = emailSchema.safeParse({
        email
    })

    if(!result.success) {
        res.status(400).json({
            msg: "Invalid email"
        })
        return
    }

    next();
}

function OTPVerificationSchema(req, res, next) {
    const { otp } = req.body;

    const result = otpSchema.safeParse({
        otp
    })

    if(!result.success) {
        res.status(400).json({
            msg: "You does not the OTP"
        })
        return
    }

    next();
}   

module.exports = {
    emailVerifySchema, OTPVerificationSchema
}