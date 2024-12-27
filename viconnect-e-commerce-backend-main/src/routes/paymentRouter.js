/**
 * @swagger
 * components:
 *   schemas:
 *     CashInResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *         data:
 *           type: object
 *           description: Data response from Paypack API
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */
import {
  processCashIn,
  cashOut,
  transactions,
  getAllPayments,
  callback,
} from "../controller/paymentCrtl";
import express from "express";
import { verifyToken } from "../middleWare";

const paymentRouter = express.Router();

paymentRouter.post("/callBack",verifyToken, callback);

paymentRouter.post("/cashin/:orderId", verifyToken, processCashIn);

/**
 * @swagger
 * /payment/cashin/{orderId}:
 *   post:
 *     summary: Perform cash-in operation
 *     tags:
 *       - Payment
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID of the order to process cash in
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: Phone number for cash-in
 *           example:
 *             number: "07xxxxxxx"
 *     responses:
 *       200:
 *         description: Cash-in operation successful
 *       500:
 *         description: Internal server error
 */

paymentRouter.post("/cashout", cashOut);
/**
 * @swagger
 * /payment/cashout:
 *   post:
 *     summary: Perform cash-out operation
 *     tags: [Payment]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: Phone number for cash-in
 *               amount:
 *                 type: number
 *                 description: Amount for cash-in
 *             example:
 *               number: "07xxxxxxx"
 *               amount: 100
 *     responses:
 *       200:
 *         description: Cash-out operation successful
 *       500:
 *         description: Internal server error
 */

paymentRouter.get("/transaction", transactions);
/**
 * @swagger
 * /payment/transaction:
 *   get:
 *     summary: Perform cash-transaction operation
 *     tags: [Payment]
 *
 *     responses:
 *       200:
 *         description: Cash-transaction operation successful
 *       500:
 *         description: Internal server error
 */

paymentRouter.get("/view-all-Payment", getAllPayments);
/**
 * @swagger
 * /payment/view-all-Payment:
 *   get:
 *     summary: Get all payments
 *     tags:
 *       - Payment
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Filtered payments by status (Completed or Pending)
 *         schema:
 *           type: string
 *           enum: [Successful, Pending]
 *     responses:
 *       '200':
 *         description: Successful response with an array of payments
 *       '400':
 *         description: Invalid payment status provided
 *       '500':
 *         description: Internal Server Error
 */



export default paymentRouter;
