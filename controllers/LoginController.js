const User = require('../models/User')
const bcrypt = require('bcryptjs')

const { loginValidation } = require('../validation')

const authenticateUser = (req, res) => {

    res.send('Wawu we got here buddy!')

}

module.exports = {

    authenticateUser

}