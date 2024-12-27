import express from "express";
import { createBlog, deleteBlog, dislikedBlog, getAllBlogs, getBlog, likedBlog, updateBlog } from "../controller/blogCrtl";
import { Blog } from "../models/blogModel";
import { uploaded, verifyToken } from "../middleWare";

const blogRoute = express.Router();
/**
 * @swagger
 * /blog/create:
 *   post:
 *     summary: Create a new blog 
 *     tags: [Blogs]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                  type: string
 *               image:
 *                 type: file
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
blogRoute.post("/create",uploaded, createBlog);

/**
 * @swagger
 * 
 * /blog/update/{id}:
 *   put:
 *     summary: Update a blog by ID.
 *     tags:
 *       - Blogs
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                  type: string
 *               image:
 *                 type: file
 *     responses:
 *       '200':
 *         description: Successful operation. Returns the updated category.
 *       '500':
 *         description: Internal server error.
 */
blogRoute.put("/update/:id",uploaded, updateBlog);

/**
 * @swagger
 * /blog/get/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
blogRoute.get("/get/:id", getBlog);

/**
 * @swagger
 * /blog/delete/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
blogRoute.delete("/delete/:id", deleteBlog);

/**
 * @swagger
 * /blog/like/{id}:
 *   post:
 *     summary: Like a blog post
 *     tags: [Blogs]
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
blogRoute.post("/like/:id",verifyToken, likedBlog);

/**
 * @swagger
 * /blog/dislike/{id}:
 *   post:
 *     summary: Dislike a blog post
 *     tags: [Blogs]
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
blogRoute.post("/dislike/:id", dislikedBlog);



blogRoute.get("/viewAll",getAllBlogs)
/**
 * @swagger
 * /blog/viewAll:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     security:
 *         - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */


export default blogRoute;




/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         numViews:
 *           type: number
 *         isLiked:
 *           type: boolean
 *         isDisliked:
 *           type: boolean
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who liked the blog
 *         dislikes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who disliked the blog
 */