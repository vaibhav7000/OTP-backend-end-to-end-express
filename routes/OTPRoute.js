const { Router } = require("express");
const { emailVerifySchema } = require("../middleware/OTPMiddleware.js");
const { sendOTP } = require("../controller/otpController.js");
const router = Router();

// post request for getting email
router.post("/get-otp", emailVerifySchema, sendOTP);

module.exports = router;
