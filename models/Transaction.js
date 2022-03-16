const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('Transaction', schema)