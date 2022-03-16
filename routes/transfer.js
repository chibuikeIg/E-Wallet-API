const router=require('express').Router()
const verifiedUser=require('./verifyAuth')

// import controllers
const TransferController = require('../controllers/TransferController')

// transfer fund 
router.post('/create', verifiedUser, TransferController.createTransfer)

module.exports = router