const z = require("zod");

const emailSchema = z.object({
    email: z.string().email()
})

const otpSchema = z.object({
    otp: z.string().length(4).regex(/^\d+$/)
})

module.exports = {
    emailSchema,
    otpSchema
}