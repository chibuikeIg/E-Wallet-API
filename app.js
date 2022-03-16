const express= require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

// initialize the express application
const app = express()

// initialize db connection and // listen for incoming request
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true, useUnifiedTopology:true})
.then((result) => app.listen(process.env.PORT)).catch((err)=> console.log(err))

//import routes
const authRoute= require('./routes/auth')


// parse json request
app.use(cors())
app.use(express.json())

// routes middleware
app.use('/api/user', authRoute)