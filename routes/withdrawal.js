const router=require('express').Router()
const verifiedUser=require('./verifyAuth')

// import controllers
const WithdrawalController = require('../controllers/WithdrawalController')

// withdraw fund 
router.post('/create', verifiedUser, WithdrawalController.createWithdrawal)

module.exports = router