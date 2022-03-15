const express= require('express')

// initialize the express application
const app = express()

//import routes

const authRoute= require('./routes/auth')

// routes middleware
app.use('/api/user', authRoute)

// listen for incoming request
app.listen(3000)