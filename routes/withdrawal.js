const router=require('express').Router()
const verifiedUser=require('./verifyAuth')

// import controllers
const WithdrawalController = require('../controllers/WithdrawalController')

// withdraw fund 

/**
 * @swagger
 * /api/user/withdrawals/create:
 *  post:
 *   description: Use this endpoint to withdraw funds from user account
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
router.post('/create', verifiedUser, WithdrawalController.createWithdrawal)

module.exports = router