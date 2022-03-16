const User = require('../models/User')
const Transaction = require('../models/Transaction')
const Wallet = require('../models/Wallet')
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


    paystack.initializePayment(params,  (error, body) => {

        // check for errors during request
        if(error) return res.json({status:400, message:error})

        const response = JSON.parse(body)

        // check for payment gateway error
        if(!response.status) return res.json({status:400, message:response.message})

        // store transaction details
        const transaction  = new Transaction({
            user_id: user._id,
            reference: response.data.reference,
            amount: req.body.amount,
            status: 'unverified',
            type:'deposit'
        })

        transaction.save()
        .then((result) => res.json({status:200, message:response.message, auth_url:response.data.authorization_url}))
        .catch((err) => res.json({status:400, message:err}))

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

        //update transaction document status to verified
        Transaction.updateOne({user_id:req.user.id, reference:ref}, {$set: {
            status:'verified',
            updatedAt:Date.now
        }}).then((result) => {
    
            // update user wallet
            Transaction.findOne({user_id:req.user.id, reference:ref}).then((transaction) => {

                // update wallet
                updateWallet(req.user.id, transaction.amount, (error, message) => {

                    if(error) return res.json({status:400, message:message})

                    res.json({status:200, message:'Deposit transaction verified'})

                })
    
            }).catch((error) => res.json({status:400, message:error}))
    
        })
        .catch((err) => res.json({status:400, message:err}))

     })
}

// wallet update function

const updateWallet = (user_id, amount, callback) => {

    Wallet.findOne({user_id:user_id}).then((wallet) => {

        if(!wallet) {

            const newWallet = new Wallet({
                user_id: user_id,
                balance: amount
            })

            newWallet.save()
            .then((result) => {

                callback(false, result)

            })
            .catch((err) => callback(true, err))

        } else {

            Wallet.updateOne({user_id:user_id}, {$set: {
                balance: wallet.balance + amount,
                updatedAt: Date.now
            }})
            .then((result) => callback(false, result))
            .catch((err) => callback(true, err))
        }

    }).catch((err) => callback(true, err))

    return callback

}

module.exports = {
    createDeposit,
    verifyDeposit
}