const User = require('../models/User')
const request = require('request')
const paystack = require('../config/paystack')(request)
const {depositRequestValidation, depositVerificationRequestValidation} = require('../validation')

const createDeposit = async (req, res) => {

    // validate incoming request
    const {error} = depositRequestValidation(req.body)
    if(error) return res.json({status:400, message:error.details[0].message})

    // find user
    const user = await User.findById({ _id: req.user.id})

    // start payment transaction

    const params = {
        amount: req.body.amount*100,
        email: user.email,
        callback_url: req.body.callback_url
    }


    paystack.initializePayment(params, (error, body) => {

        // check for errors during request
        if(error) return res.json({status:400, message:error})

        const response = JSON.parse(body)

        // check for payment gateway error
        if(!response.status) return res.json({status:400, message:response.message})


        res.json({status:200, message:response.message, auth_url:response.data.authorization_url})

    })

}

// verify deposit

const verifyDeposit = async (req, res) => {

     // validate incoming request
     const {error} = depositVerificationRequestValidation(req.body)
     if(error) return res.json({status:400, message:error.details[0].message})

     // verify transaction
     const ref = req.body.reference_id

     paystack.verifyPayment(ref, (error, body) => {

         // check for errors during request
        if(error) return res.json({status:400, message:error})

        const response = JSON.parse(body)
        // check for payment gateway verification error
        if(!response.status) return res.json({status:400, message:response.message})

        res.json({status:200, message:'Deposit transaction verified'})

     })
}

module.exports = {
    createDeposit,
    verifyDeposit
}