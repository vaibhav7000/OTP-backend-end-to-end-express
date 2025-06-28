const { Router } = require("express");
const { emailVerifySchema, OTPVerificationSchema } = require("../middleware/OTPMiddleware.js");
const { sendOTP, verifyOTP } = require("../controller/otpController.js");
const router = Router();

// post request for getting email
router.post("/get-otp", emailVerifySchema, sendOTP);

// post request for verifying the otp that is saved inside the temporary storage (in-memory)
router.post("/verify-otp", emailVerifySchema, OTPVerificationSchema, verifyOTP);

module.exports = router;
