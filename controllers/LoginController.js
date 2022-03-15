const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { loginValidation } = require('../validation')

const authenticateUser = async (req, res) => {

   // validate request 
   const {error} = loginValidation(req.body)
   if(error) return res.json({status:400, message:error.details[0].message})

   // check if user exists using email address
   const user = await User.findOne({ email:req.body.email })
   if(!user) return res.json({status:400, message:'Email or password is incorrect.'})

   // check if password is valid
   const validPassword = await bcrypt.compare(req.body.password, user.password)
   if(!validPassword) return res.json({status:400, message:'Email or password is incorrect.'})


   try {

       const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
       res.header('auth-token', token).json({status:200, _token:token, message:'User Authenticated.'})

   } catch(err) {

        res.json({status:400, message:'User authentication failed'})

   }

}

module.exports = {

    authenticateUser

}