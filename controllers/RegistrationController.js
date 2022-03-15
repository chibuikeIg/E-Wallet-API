const User = require('../models/User')
const bcrypt = require('bcryptjs')

const { registrationValidation } = require('../validation')

const storeUser = async (req, res) => {

    // validate request 
    const {error} = registrationValidation(req.body)
    if(error) return res.json({status:400, message:error.details[0].message})

    // check if email already exists
    const emailExists = await User.findOne({ email:req.body.email })

    if(emailExists) return res.json({status:400, message:'Email already exists in our records'})

    // create password hash algorithm
    const salt = await bcrypt.genSalt(10)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
    })

    try {

        await user.save()
        res.json({status:200, message:'User Account created successfully.'})

    } catch(err) {

        res.json({status:400, message:'Failed to create user account.'})

    }
}

module.exports = {
    storeUser
}