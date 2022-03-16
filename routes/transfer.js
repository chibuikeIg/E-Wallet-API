const router=require('express').Router()
const verifiedUser=require('./verifyAuth')

// import controllers
const TransferController = require('../controllers/TransferController')

// transfer fund 

/**
 * @swagger
 * /api/user/transfers/create:
 *  post:
 *   description: Use this endpoint to transfer funds to another user account
 *   paramaters:
 *     - in: header
 *       name: Auth-Token
 *       schema:
 *         type: string
 *       required: true
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
 *              beneficiary_email:
 *                type: string
 *                example: example@mail.com
 *                description: Specify the user account you want to transfer funds to
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
 *    '404':
 *      description: Not Found
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               status:
 *                 type: integer
 *               message:
 *                 type: string
 *                 description: error message
 *         
 */

router.post('/create', verifiedUser, TransferController.createTransfer)

module.exports = router