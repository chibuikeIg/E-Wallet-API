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

// create login validation

const loginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}


// create deposit validation 

const depositRequestValidation = (data) => {

    const schema = Joi.object({
        amount: Joi.number().required(),
        callback_url: Joi.string().required()
    })

    return schema.validate(data)
}

// create deposit verification request validation

const depositVerificationRequestValidation = (data) => {

    const schema = Joi.object({
        reference_id: Joi.string().required(),
    })

    return schema.validate(data)
}


// create transfer request validation 

const transferRequestValidation = (data) => {

    const schema = Joi.object({
        beneficiary_email: Joi.string().required().email(),
        amount: Joi.number().required().min(1)
    })

    return schema.validate(data)

}

module.exports = {
    registrationValidation,
    loginValidation,
    depositRequestValidation,
    depositVerificationRequestValidation,
    transferRequestValidation
}