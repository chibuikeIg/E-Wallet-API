const Joi = require('@hapi/joi')

// create registration validation

const registrationValidation = (data) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}


module.exports = {
    registrationValidation
}