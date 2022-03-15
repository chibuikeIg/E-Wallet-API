const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    // check if request header contains auth token
    const token = req.header('auth-token')
    if(!token) return res.json({status:400, message:'Access Denied'})

    try {
        
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()

    } catch(err) {

        res.json({status:400, message:'Unable to verify token'})

    }
}