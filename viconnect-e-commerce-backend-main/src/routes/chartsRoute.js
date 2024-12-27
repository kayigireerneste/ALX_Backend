import express from "express";
import {getTotalEarnings,getOrdersCountPerDay, getLatestPopularProduct, 
    getOrdersCountPerWeek, getUsersCount, 
    productPerday,  
    getTotalEarningsPerWeek,
    getTotalEarningsPerday} from "../controller/charts/chartsCtrl";

const chartRoute = express.Router();


chartRoute.get("/order/countPerDay", getOrdersCountPerDay);
/**
 * @swagger
 *   /order/countPerDay:
 *     get:
 *       summary: Get the number of orders made
 *       tags:
 *         - Chart
 *       responses:
 *         '200':
 *           description: Successful response
 *         '500':
 *           description: Internal Server Error
 */

chartRoute.get("/order/countPerWeek", getOrdersCountPerWeek);
/**
 * @swagger
 *   /order/countPerWeek:
 *     get:
 *       summary: Get the number of orders made
 *       tags:
 *         - Chart
 *       parameters:
 *         - name: year
 *           in: query
 *           description: Year  for which to retrieve order count per week
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *         '500':
 *           description: Internal Server Error
 */


chartRoute.get("/earnings/totalEarning",getTotalEarnings);
/**
 * @swagger
 *   /earnings/totalEarning:
 *     get:
 *       summary: Get total earnings by time unit
 *       tags:
 *         - Chart
 *       parameters:
 *         - name: year
 *           in: query
 *           description: The year for which to retrieve earnings
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful response
 *         '400':
 *           description: Invalid request parameters
 *         '500':
 *           description: Internal Server Error
 */

chartRoute.get("/earningsPerDay", getTotalEarningsPerday);
/**
 * @swagger
 * /earningsPerDay:
 *   get:
 *     summary: Get the total earning per day 
 *     tags:
 *       - Chart
 *     responses:
 *       '200':
 *         description: Successful response

 *       '400':
 *         description: Invalid year parameter
 *       '500':
 *         description: Internal Server Error
 */


chartRoute.get("/orders/countPerDay", getOrdersCountPerDay);
/**
 * @swagger
 * /orders/countPerDay:
 *   get:
 *     summary: Get the total order count per day 
 *     tags:
 *       - Chart
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { date: "2023-01-01", count: 20 },
 *                 { date: "2023-01-02", count: 30 },
 *               ]

 *       '400':
 *         description: Invalid year parameter
 *       '500':
 *         description: Internal Server Error
 */


chartRoute.get("/product/latestPopular", getLatestPopularProduct);
/**
 * @swagger
 * /product/latestPopular:
 *   get:
 *     summary: Latest popular product 
 *     tags:
 *       - Chart
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of popular products default is 5)
 * 
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               popularProduct:
 *                 productId: "5f7d5fbff52ed20a387ea7a2"
 *                 productName: "Product"
 *                 productDetails: 
 *                 orderCount: 10

 *       '404':
 *         description: No orders found
 *       '500':
 *         description: Internal Server Error
 */



chartRoute.get("/users", getUsersCount);
/**
 * @swagger
 *   /users:
 *     get:
 *       summary: Get number of Users for the Last 7 Days
 *       tags:
 *         - Chart
 *       responses:
 *         '200':
 *           description: Successful response
 *         '400':
 *           description: Invalid request parameters
 *         '500':
 *           description: Internal Server Error
 */

chartRoute.get("/productsData",productPerday);
/**
 * @swagger
 * /productsData:
 *   get:
 *     summary: Get products added each day.
 *     tags: [Chart]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

export default chartRoute;