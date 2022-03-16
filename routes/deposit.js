const router=require('express').Router()
const verifiedUser=require('./verifyAuth')

// import controllers
const DepositController = require('../controllers/DepositController')

// fund user account
router.post('/create', verifiedUser, DepositController.createDeposit)


module.exports = router