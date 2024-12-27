import express from "express";
import { 
    createBrand,
    createColor,
    deleteBrand,
    deleteCategory, 
    deleteColor, 
    getAllCategory, 
    getBrand, 
    getColor, 
    getOneCategory,
    getallBrand,
    getallColor,
    newCategory, 
    updateBrand, 
    updateCategory,
    updateColor,
 } from "../controller/prodCategoryCrtl";
 import { verifyToken } from "../middleWare";
import { isAdmin, uploaded } from "../middleWare";

const prodCategoryRouter = express.Router();

prodCategoryRouter.post('/create', uploaded,verifyToken,isAdmin, newCategory);

/**
 * @swagger
 * 
 * /category/create:
 *   post:
 *     summary: Create a new category.
 *     tags:
 *       - Categories
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               image:
 *                 type: file
 *     responses:
 *       '200':
 *         description: Successful operation. Returns the created category.
 *       '500':
 *         description: Internal server error.
 */

prodCategoryRouter.put("/update/:id",uploaded,verifyToken, isAdmin, updateCategory);
/**
 * @swagger
 * 
 * /category/update/{id}:
 *   put:
 *     summary: Update a category by ID.
 *     tags:
 *       - Categories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID to update.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               image:
 *                 type: file
 *     responses:
 *       '200':
 *         description: Successful operation. Returns the updated category.
 *       '500':
 *         description: Internal server error.
 */


prodCategoryRouter.delete("/delete/:id",verifyToken, isAdmin,deleteCategory);

/**
 * @swagger
 * /category/delete/{id}:
 *   delete:
 *     summary: Delete a category by ID.
 *     tags:
 *       - Categories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation. Returns the deleted category.
 *       '500':
 *         description: Internal server error.
 */

prodCategoryRouter.get("/viewAll",getAllCategory);
/**
 * @swagger
 * /category/viewAll:
 *   get:
 *     summary: Get all categories with pagination.
 *     tags:
 *       - Categories
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation. Returns a list of categories.
 *       '500':
 *         description: Internal server error.
 */

prodCategoryRouter.get("/viewOne/:id",getOneCategory);

/**
 * @swagger
 * /category/viewOne/{id}:
 *   get:
 *     summary: Get one category by ID.
 *     tags:
 *       - Categories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ViewOne Category.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieve. .
 *       '500':
 *         description: Internal server error.
 */


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The category ID.
 *         categoryName:
 *           type: string
 *           description: The name of the category.
 */
export default prodCategoryRouter;




export const brandrouter = express.Router();

brandrouter.post("/create",uploaded, verifyToken, isAdmin, createBrand);
/**
 * @swagger
 * /brand/create:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               image:
 *                 type: file
 *     responses:
 *       '201':
 *         description: Brand added successfully
 *       '500':
 *         description: Internal Server Error
 */



brandrouter.put("/update/:id",uploaded, verifyToken, isAdmin, updateBrand);
/**
 * @swagger
 * /brand/update/{id}:
 *   put:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated brand data
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               image:
 *                 type: file
 *     responses:
 *       '200':
 *         description: Brand updated successfully
 *       '500':
 *         description: Internal Server Error
 */

brandrouter.delete("/delete/:id", verifyToken, isAdmin, deleteBrand);
/**
 * @swagger
 * /brand/delete/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Brand deleted successfully
 *       '500':
 *         description: Internal Server Error
 */

brandrouter.get("/view/:id", getBrand);
/**
 * @swagger
 * /brand/view/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Retrieved brand successfully
 *       '500':
 *         description: Internal Server Error
 */

brandrouter.get("/get",getallBrand);
/**
 * @swagger
 * /brand/get:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       '200':
 *         description: Retrieved all brands successfully
 *       '500':
 *         description: Internal Server Error
 */







// API for managing colors
export const colorRouter = express.Router();


colorRouter.post("/create",uploaded, verifyToken, isAdmin, createColor);
/**
 * @swagger
 * /color/create:
 *   post:
 *     summary: Create a new color
 *     tags: [Colors]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               colorName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Color created successfully
 *       '500':
 *         description: Internal Server Error
 */

colorRouter.put("/update/:id", verifyToken, isAdmin, updateColor);
/**
 * @swagger
 * /color/update/{id}:
 *   put:
 *     summary: Update a color by ID
 *     tags: [Colors]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the color to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated color data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               colorName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Color updated successfully
 *       '500':
 *         description: Internal Server Error
 */

colorRouter.delete("/delete/:id", verifyToken, isAdmin, deleteColor);
/**
 * @swagger
 * /color/delete/{id}:
 *   delete:
 *     summary: Delete a color by ID
 *     tags: [Colors]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the color to delete
 *     responses:
 *       '200':
 *         description: Color deleted successfully
 *       '500':
 *         description: Internal Server Error
 */

colorRouter.get("/view/:id", getColor);
/**
 * @swagger
 * /color/view/{id}:
 *   get:
 *     summary: Get a color by ID
 *     tags: [Colors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the color to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Retrieved color successfully
 *       '500':
 *         description: Internal Server Error
 */

colorRouter.get("/get", getallColor);
/**
 * @swagger
 * /color/get:
 *   get:
 *     summary: Get all colors
 *     tags: [Colors]
 *     responses:
 *       '200':
 *         description: Retrieved all colors successfully
 *       '500':
 *         description: Internal Server Error
 */


/**
 * @swagger
 * tags:
 *   description: Operations related to the shopping cart
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the category
 *         categoryName:
 *           type: string
 *         image:
 *           type: file
 */
