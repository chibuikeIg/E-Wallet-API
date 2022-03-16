const Transaction = require('../models/Transaction')
const Wallet = require('../models/Wallet')

const {withdrawalRequestValidation} = require('../validation')
const {updateWallet} = require('../controllers/WalletController')
const {randomChars} = require('../helpers')


const createWithdrawal = async (req, res) => {

    // validate incoming request
    const {error} = withdrawalRequestValidation(req.body)
    if(error) return res.json({status:400, message:error.details[0].message})

    // fetch user balance
    const wallet = await Wallet.findOne({ user_id:req.user.id })
    if(!wallet || wallet.balance < req.body.amount) return res.json({status:400, message:'Insufficient balance'})

    // update user wallet balance
    updateWallet(req.user.id, req.body.amount, 'decrease', (error, message) => {

        if(error) return res.json({status:400, message:message})

        // store transaction details/ basic information
        const transaction  = new Transaction({
            user_id: req.user.id,
            reference: randomChars(10),
            amount: req.body.amount,
            status: 'verified',
            type:'withdrawal'
        })

        transaction.save()
        .then((result) => res.json({status:200, message:'Successfully withdraw funds!'}))
        .catch((err) => res.json({status:400, message:err}))

    });
}


module.exports = {
    createWithdrawal
}