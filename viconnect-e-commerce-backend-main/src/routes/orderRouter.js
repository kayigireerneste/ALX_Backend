import express from "express";
import { createDirectOrder, createOrder, deleteOrder, earningsByCategory, 
    getAllOrders, getOneOrder, getUserOrders, removeOrder, 
    updateOrder, updateOrderStatus 
     } from "../controller/orderCtrl";
import { isAdmin, uploaded, verifyToken } from "../middleWare";


const orderRouter = express.Router();


 orderRouter.post("/createCartOrder",uploaded,verifyToken, createOrder);
/**
 * @swagger
 * /order/createCartOrder:
 *   post:
 *     summary: Create a new order from cart
 *     tags: [Orders]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               selectedProductIndices:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of product indices to include in the order. First element is 0, others [1, 2, ...]
 *               shippingAddress:
 *                 type: string
 *                 description: The shipping address for the order
 *     responses:
 *       '201':
 *         description: Order successfully created
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */


orderRouter.post("/createOrder", uploaded, verifyToken, createDirectOrder);

/**
 * @swagger
 * /order/createOrder:
 *   post:
 *     summary: Create a new order directly from product
 *     tags: [Orders]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to create the order for
 *               count:
 *                 type: number
 *                 description: The quantity of the product to order
 *               colorId:
 *                 type: string
 *                 description: The ID of the color for the product
 *               shippingAddress:
 *                 type: string
 *                 description: The shipping address for the order
 *     responses:
 *       '200':
 *         description: Order successfully created
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */



orderRouter.get("/getOrder",verifyToken, getUserOrders);
/**
 * @swagger
 * /order/getOrder:
 *   get:
 *     summary: Get user's order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User's order retrieved successfully
 *       404:
 *         description: User not found or Order not found for the user
 *       500:
 *         description: Internal Server Error
 */

orderRouter.put("/updateOrder",verifyToken,updateOrder);

/**
 * @swagger
 * /order/updateOrder:
 *   put:
 *     summary: Update an existing order
 *     tags: [Orders]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: The ID of the order to update
 *               count:
 *                 type: number
 *                 description: The fields to update in the order
 *               colorId:
 *                 type: string
 *                 description: The ID of the color for the product
 *     responses:
 *       '200':
 *         description: Order successfully updated
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal Server Error
 */


orderRouter.delete("/removeOrder/:orderId", verifyToken,deleteOrder);
/**
 * @swagger
 * /order/removeOrder/{orderId}:
 *   delete:
 *     summary: Remove an existing order
 *     tags: [Orders]
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order to remove
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order successfully removed
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal Server Error
 */


orderRouter.get("/orderMade",verifyToken,isAdmin, getAllOrders);
/**
 * @swagger
 * /order/orderMade:
 *   get:
 *     summary: Get all user orders
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User's order retrieved successfully
 *       404:
 *         description: Users not found or Order not found for the user
 *       500:
 *         description: Internal Server Error
 */
orderRouter.get("/GetOneOrder/:orderId",getOneOrder);
   /**
    * @swagger
    * /order/GetOneOrder/{orderId}:
    *   get:
    *     summary: Get details of a specific order
    *     tags: [Orders]
    *     parameters:
    *       - in: path
    *         name: orderId
    *         required: true
    *         description: ID of the order to get details
    *         schema:
    *           type: string
    *     responses:
    *       200:
    *         description: Successful response
    *       500:
    *         description: Internal Server Error
    */



orderRouter.get("/categoryEarnings",earningsByCategory);
/**
 * @swagger
 * /order/categoryEarnings:
 *   get:
 *     summary: Get all earnings by Category
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Earnings by Category retrieved successfully
 *       404:
 *         description: Category not found or Order not found 
 *       500:
 *         description: Internal Server Error
 */
export default orderRouter;


/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the order
 *           example: 60f8a9f65b992c001c74bfc8
 *         products:
 *           type: array
 *           description: Array of products in the order
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID of the product
 *                 example: 60f8a9f65b992c001c74bfc9
 *               count:
 *                 type: integer
 *                 description: Quantity of the product
 *                 example: 2
 *               color:
 *                 type: string
 *                 description: Color of the product
 *                 example: "blue"
 *         orderMadeBy:
 *           type: string
 *           description: ID of the user who made the order
 *           example: 60f8a9f65b992c001c74bfca
 *         paymentMethod:
 *           type: string
 *           description: Payment method used for the order
 *           example: "Credit Card"
 *         shippingAddress:
 *           type: string
 *           description: Shipping address for the order
 *           example: "123 Main St, City"
 *         orderTotal:
 *           type: number
 *           description: Total cost of the order
 *           example: 150.00
 *         orderStatus:
 *           type: string
 *           description: Status of the order
 *           enum:
 *             - "Pending"
 *             - "Cash on Delivery"
 *             - "Processing"
 *             - "Dispatched"
 *             - "Cancelled"
 *             - "Delivered"
 *           default: "Pending"
 *           example: "Pending"
 *       required:
 *         - products
 *         - orderMadeBy
 *         - paymentMethod
 *         - shippingAddress
 *         - orderTotal
 */

