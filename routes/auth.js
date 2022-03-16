const router=require('express').Router()

// import controllers
const RegistrationController = require('../controllers/RegistrationController')
const LoginController = require('../controllers/LoginController')

// create user account

/**
 * @swagger
 * /api/user/register:
 *  post:
 *   description: Use this endpoint to create new user account
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string,
 *                example: John Doe
 *              email:
 *                type: string
 *                example: example@domain.com
 *              password:
 *                type: string
 *                example: example123
 *   responses:
 *    '200':
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *              status:
 *                type: integer
 *                description: response status
 *                example: 200
 *              message:
 *                type: string
 *                description: response message
 *                example: User account successfully created
 *    '400':
 *     description: Bad Request
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *              status:
 *                type: integer
 *                description: response status
 *                example: 400
 *              message:
 *                type: string
 *                description: response message
 *                example: Failed to create user account.
 */

router.post('/register', RegistrationController.storeUser)

// authenticate user

/**
 * @swagger
 * /api/user/login:
 *  post:
 *   description: Use this endpoint to create a login session for user
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: example@domain.com
 *              password:
 *                type: string
 *                example: example123
 *   responses:
 *    '200':
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *              status:
 *                type: integer
 *                description: response status
 *                example: 200
 *              _token:
 *                type: string
 *                description: access token
 *              message:
 *                type: string
 *                description: response message
 *                example: User Authenticated
 *    '400':
 *     description: Bad Request
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *              status:
 *                type: integer
 *                description: response status
 *                example: 400
 *              message:
 *                type: string
 *                description: response message
 *                example: Failed to create user account.
 */
router.post('/login', LoginController.authenticateUser)

// import routes
const depositRoute = require('./deposit')
const transferRoute = require('./transfer')
const withdrawalRoute = require('./withdrawal')

// middlewares
router.use('/deposits', depositRoute)
router.use('/transfers', transferRoute)
router.use('/withdrawals', withdrawalRoute)

module.exports = router