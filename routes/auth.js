const router=require('express').Router()
const UserController = require('../controllers/UserController')

// create user account
router.post('/register', UserController.storeUser)


module.exports = router