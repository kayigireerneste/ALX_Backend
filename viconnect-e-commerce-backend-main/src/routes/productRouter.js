import express from "express";
import { addToWishlist,
      createProduct, 
      deleteProduct, 
      getAllProduct, 
      getLastProductsAdded, 
      getWishlist, 
      productByBrand, 
      productByCategory, 
      rating, 
      updateProduct, 
      updateProductRating, viewOneProduct } from "../controller/productCrtl";
import { authenticateUser,isAdmin, uploaded, verifyToken } from "../middleWare";

const ProductRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to the product
 * components:
 *    schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the category
 *         categoryName:
 *           type: string
 * 
 *     Color:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the color
 *         colorName:
 *           type: string
 *     Brand:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the brand
 *         brandName:
 *           type: string
 *   
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The product ID.
 *         productName:
 *           type: string
 *           description: The name of the product.
 *         slug:
 *           type: string
 *           description: The slug for creating clean, readable, and SEO-friendly URLs.
 *         description:
 *           type: string
 *           description: The description of the product.
 *         price:
 *           type: number
 *           description: The price of the product.
 *         brand:
 *           type: string
 *           description: The brand of the product.
 *         sold:
 *           type: number
 *           description: The number of units sold.
 *         productImage:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of product image URLs.
 *         ratings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               star:
 *                 type: number
 *               comment:
 *                 type: string
 *               postedBy:
 *                 type: string
 *           description: Array of rating objects including star, comment, and postedBy.
 *         totalRating:
 *           type: string
 *           description: The total rating of the product.
 *         stock_quantity:
 *           type: number
 *           description: The stock quantity of the product.
 *         categoryId:
 *           type: string
 *           description: The category ID to which the product belongs.
 *       required:
 *         - productName
 *         - slug
 *         - description
 *         - price
 *         - brand
 *         - categoryId
 */





ProductRouter.post("/create",uploaded,verifyToken,isAdmin, createProduct);
/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Name of the product
 *               description:
 *                 type: string
 *                 description: Description of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               brandId:
 *                 type: string
 *                 description: BrandId of the product
 *               colorId:
 *                 type: string
 *                 description: ColorId of the product
 *               productImage:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: Array of product image URLsray of product colors
 *               stock_quantity:
 *                 type: number
 *                 description: The stock quantity of the product.
 *               categoryId:
 *                 type: string
 *                 description: ID of the category
 *     responses:
 *       '200':
 *         description: Successfully created a new product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newProduct:
 *                   type: object
 *                   properties:
 *                     brand:
 *                       $ref: '#/components/schemas/BrandDetails'
 *       '404':
 *         description: Failed to save the product
 *       '500':
 *         description: Internal Server Error
 */

ProductRouter.put("/updateProduct/:id",uploaded,verifyToken,isAdmin, updateProduct);
/**
 * @swagger
 * /product/updateProduct/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Name of the product
 *                 required: true
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               brand:
 *                 type: string
 *                 description: BrandId of the product
 *               color:
 *                 type: string
 *                 description: ColorId of the product
 *               productImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of product image URLs
 *               stock_quantity:
 *                 type: number
 *                 description: The stock quantity of the product.
 *               categoryId:
 *                 type: string
 *                 description: ID of the category
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal Server Error
 */




ProductRouter.get("/viewAllProd",getAllProduct);
/**
 * @swagger
 * /product/viewAllProd:
 *   get:
 *     summary: Get all products
 *     tags: 
 *       - Products
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of products
 *       '500':
 *         description: Internal Server Error
 */



 ProductRouter.get("/viewProd/:id",viewOneProduct);
/**
 * @swagger
 * 
 * paths:
 *   /product/viewProd/{id}:
 *     get:
 *       summary: View details of a specific product
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the product to view
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully retrieved the product details
 *         '500':
 *           description: Internal Server Error
 */

  ProductRouter.delete("/deleteProduct/:id",verifyToken,isAdmin, deleteProduct);

/**
 * @swagger
 *
 * paths:
 *   /product/deleteProduct/{id}:
 *     delete:
 *       summary: Delete a product by ID
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the product to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully deleted the product
 *         '404':
 *           description: Product not found
 *         '500':
 *           description: Internal Server Error
 */

  
  ProductRouter.post("/wishlist/:productId",verifyToken,addToWishlist);
 /**
 * @swagger
 *
 * paths:
 *   /product/wishlist/{productId}:
 *     post:
 *       summary: Add a product to the user's wishlist
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: productId
 *           required: true
 *           description: ID of the product to add to wishlist
 *       responses:
 *         '201':
 *           description: Wishlist updated successfully
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Internal Server Error
 */

 ProductRouter.get("/getwishlist",verifyToken,getWishlist);
/**
 * @swagger
 * /product/getwishlist:
 *   get:
 *     summary: Get all wishlist
 *     tags: 
 *       - Products
 *     security:
 *         - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of product wishlist
 *       '500':
 *         description: Internal Server Error
 */
      
  ProductRouter.post("/rating/:productId", verifyToken, rating);

/**
* @swagger
* 
* paths:
*   /product/rating/{productId}:
*     post:
*       summary: Rate a product
*       tags: [Products]
*       security:
*         - BearerAuth: []
*       parameters:
*         - in: path
*           name: productId
*           required: true
*           description: ID of the product to rate
*       requestBody:
*         description: Rating details
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 star:
*                   type: number
*                   description: The rating given by the user (between 1 and 5)
*                 comment:
*                   type: string
*                   description: Optional comment provided by the user
*       responses:
*         '201':
*           description: Product rated successfully
*         '400':
*           description: Bad Request. Invalid star rating.
*         '404':
*           description: Product not found
*         '500':
*           description: Internal Server Error
*/


ProductRouter.put("/updateRating/:productId",verifyToken, isAdmin, updateProductRating);




ProductRouter.get("/brand/:brandName",productByBrand);
/**
 * @swagger
 * /product/brand/{brandName}:
 *   get:
 *     summary: Get products by brand
 *     description: Retrieve products based on the specified brand.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: brandName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the brand to filter products.
 *     responses:
 *       '200':
 *         description: Successful response with the list of products.
 *       '404':
 *         description: Brand not found.
 *       '500':
 *         description: Internal Server Error.
 */



ProductRouter.get("/category/:categoryName",productByCategory);
/**
 * @swagger
 * /product/category/{categoryName}:
 *   get:
 *     summary: Get products by category
 *     description: Retrieve products based on the specified category.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the category to filter products.
 *     responses:
 *       '200':
 *         description: Successful response with the list of products.
 *       '404':
 *         description: category not found.
 *       '500':
 *         description: Internal Server Error.
 */


ProductRouter.get("/last-n-products",getLastProductsAdded);
/**
 * @swagger
 * /product/last-n-products:
 *   get:
 *     summary: Get the last N products added.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the last N products.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *       500:
 *         description: Internal Server Error.
 */

export default ProductRouter;









/**
 * @swagger
 * components:
 *   schemas:
 *     BrandDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         brandName:
 *           type: string
 *         brandImage:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         __v:
 *           type: integer
 */
