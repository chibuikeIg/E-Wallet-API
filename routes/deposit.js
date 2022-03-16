const router=require('express').Router()
const verifiedUser=require('./verifyAuth')

// import controllers
const DepositController = require('../controllers/DepositController')

// fund user account

/**
 * @swagger
 * /api/user/deposits/create:
 *  post:
 *   description: Use this endpoint to fund user account or initialize deposit transaction
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              amount:
 *                type: integer,
 *                example: 100
 *              callback_url:
 *                type: string
 *                example: https://yourcallback_url.com
 *                description: Specify the callback url which will receive the reference id as a query string from payment gateway
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
 *              auth_url:
 *                type: string
 *                description: paystack payment gateway authorization url, use this to make payment and generate reference id
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
 *                description: error message
 *         
 */

router.post('/create', verifiedUser, DepositController.createDeposit)

// verify deposit transaction

/**
 * @swagger
 * /api/user/deposits/verify:
 *  post:
 *   description: Use this endpoint to verify deposit transaction and complete funding user account
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              reference_id:
 *                type: string,
 *                description: Provide the reference code you got from the callback url query string
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
 *                description: error message
 *         
 */

router.post('/verify', verifiedUser, DepositController.verifyDeposit)

module.exports = router