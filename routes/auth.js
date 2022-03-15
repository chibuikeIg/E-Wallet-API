const router=require('express').Router()
const RegistrationController = require('../controllers/RegistrationController')
const LoginController = require('../controllers/LoginController')

// create user account
router.post('/register', RegistrationController.storeUser)

// authenticate user
router.post('/login', LoginController.authenticateUser)


module.exports = router