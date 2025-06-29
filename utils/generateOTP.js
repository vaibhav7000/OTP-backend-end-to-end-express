function generateRandomOTP(digits = 6) {
    // by-default we need to make 6 digit otp
    return Math.floor(1000 + Math.random() * 9000).toString();
}

module.exports = generateRandomOTP;