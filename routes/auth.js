const router=require('express').Router()

// import controllers
const RegistrationController = require('../controllers/RegistrationController')
const LoginController = require('../controllers/LoginController')

// create user account
router.post('/register', RegistrationController.storeUser)

// authenticate user
router.post('/login', LoginController.authenticateUser)

// import routes
const depositRoute = require('./deposit')
const transferRoute = require('./transfer')
const withdrawalRoute = require('./withdrawal')

// middlewares
router.use('/deposits', depositRoute)
router.use('/transfers', transferRoute)
router.use('/withdrawals', withdrawalRoute)

module.exports = router