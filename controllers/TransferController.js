const User = require('../models/User')
const Transaction = require('../models/Transaction')
const Wallet = require('../models/Wallet')


const createTransfer = (req, res) => {

    res.json({status:200, message:'wawu we got here'})
}


module.exports = {
    createTransfer
}