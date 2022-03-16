const User = require('../models/User')
const {depositRequestValidation} = require('../validation')

const createDeposit = async (req, res) => {

    // validate incoming request
    const {error} = depositRequestValidation(req.body)
    if(error) return res.json({status:400, message:error.details[0].message})

    // find user
    const user = await User.findById({ _id: req.user.id})

    

    res.send(user)

}

module.exports = {
    createDeposit
}