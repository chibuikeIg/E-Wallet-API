const express= require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

// swagger documentation autogen

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// initialize the express application
const app = express()

// initialize db connection and // listen for incoming request
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true, useUnifiedTopology:true})
.then((result) => app.listen(process.env.PORT)).catch((err)=> console.log(err))


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Nodejs User Wallet System API',
            description: 'Nodejs user wallet system api developer test documention',
            contact: {
                name: 'Paul Chibuike Igweze'
            },
            servers: [process.env.APP_URL]
        }
    },

    apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//import routes
const authRoute= require('./routes/auth')

app.use(cors())

// parse json request
app.use(express.json())


// routes middleware
app.use('/api/user', authRoute)