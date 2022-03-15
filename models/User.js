const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:3,
        max:255
    },
    email: {
        type: String,
        required: true,
        min:6,
        max: 255
    },
    email_verified_at: {
        type: Date,
        required: false,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1045
    }
}, {timestamps:true})

module.exports = mongoose.model('User', schema)