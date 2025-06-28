const { emailSchema } = require("../utils/types.js");

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

module.exports = {
    emailVerifySchema
}