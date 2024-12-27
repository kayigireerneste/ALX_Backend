
import express from "express";
import {createCart, getCart, updateCart, removeItemFromCart } from "../controller/cartCrtl";
import { authenticateUser, verifyToken } from "../middleWare";


const CartRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the shopping cart
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Cart id
 */


CartRouter.post("/createCart",verifyToken,createCart);

/**
 * @swagger
 * /cart/createCart:
 *   post:
 *     summary: Add a product to the user's cart 
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Cart data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productDetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     count:
 *                       type: number
 *                     colorId:
 *                       type: string
 *     responses:
 *       '201':
 *         description: Cart details after adding items
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */






CartRouter.put("/updateCart",verifyToken, updateCart);
/**
 * @swagger
 * /cart/updateCart:
 *   put:
 *     summary: Update the quantity of items in the user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Request body for updating the cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to update in the cart
 *               colorId:
 *                 type: string
 *                 description: ID of the color for the product
 *               count:
 *                 type: number
 *                 description: New quantity for the product in the cart
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       401:
 *         description: Unauthorized (for missing or invalid tokens)
 *       404:
 *         description: User not found, Cart not found for the user, or Product not found in the user's cart
 *       500:
 *         description: Internal Server Error
 */


CartRouter.get("/getUserCart",verifyToken, getCart);

/**
 * @swagger
 * /cart/getUserCart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart retrieved successfully
 *       404:
 *         description: User not found or Cart not found for the user
 *       500:
 *         description: Internal Server Error
 */




CartRouter.delete("/removeItem/:itemId/",verifyToken, removeItemFromCart);

/**
 * @swagger
 * /cart/removeItem/{itemId}:
 *   delete:
 *     summary: Remove an item from the user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         description: Specify ID of the product in cart to be removed
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       404:
 *         description: User not found, Cart not found for the user, or Product not found in the user's cart
 *       500:
 *         description: Internal Server Error
 */












export default CartRouter;