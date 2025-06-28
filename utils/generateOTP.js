function generateRandomOTP(digits = 6) {
    // by-default we need to make 6 digit otp
    return Math.floor(Math.random() * 1000000);
}

module.exports = generateRandomOTP;