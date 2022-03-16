const User = require('../models/User')
const Transaction = require('../models/Transaction')
const Wallet = require('../models/Wallet')

const {transferRequestValidation} = require('../validation')
const {updateWallet} = require('../controllers/WalletController')
const {randomChars} = require('../helpers')

const createTransfer = async (req, res) => {

    // validate incoming request
    const {error} = transferRequestValidation(req.body)
    if(error) return res.json({status:400, message:error.details[0].message})

    /// find beneficiary (user)
    const beneficiary = await User.findOne({ email:req.body.beneficiary_email })
    if(!beneficiary) return res.json({status:404, message:'Beneficiary not found'})

    // check if user is same as beneficiary
    if(beneficiary._id == req.user.id) return res.json({status:400, message:'Cannot transfer to yourself'})

    // fetch user balance
    const wallet = await Wallet.findOne({ user_id:req.user.id })
    if(!wallet || wallet.balance < req.body.amount) return res.json({status:400, message:'Insufficient balance'})

    // update user wallet balance
    updateWallet(req.user.id, req.body.amount, 'decrease', (error, message) => {

        if(error) return res.json({status:400, message:message})

        // update beneficiary wallet
        updateWallet(beneficiary._id, req.body.amount, 'increase', (error, message) => {

            if(error) return res.json({status:400, message:message})

            // store transaction details
            const transaction  = new Transaction({
                user_id: req.user.id,
                reference: randomChars(10),
                amount: req.body.amount,
                status: 'verified',
                type:'transfer'
            })

            transaction.save()
            .then((result) => res.json({status:200, message:'Successfully transfered funds'}))
            .catch((err) => res.json({status:400, message:err}))

        })

    });

}


module.exports = {
    createTransfer
}