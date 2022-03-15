const router=require('express').Router()
const RegistrationController = require('../controllers/RegistrationController')

// create user account
router.post('/register', RegistrationController.storeUser)


module.exports = router