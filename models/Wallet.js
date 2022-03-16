const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
}, {timestamps:true})

module.exports = mongoose.model('Wallet', schema)