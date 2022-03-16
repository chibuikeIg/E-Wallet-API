const User = require('../models/User')
const Transaction = require('../models/Transaction')
const Wallet = require('../models/Wallet')

const {withdrawalRequestValidation} = require('../validation')
const {updateWallet} = require('../controllers/WalletController')
const {randomChars} = require('../helpers')


const createWithdrawal = (req, res) => {

    res.json({status:200, message:'Hello world'})
}


module.exports = {
    createWithdrawal
}