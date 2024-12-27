import express from "express";
import { deleteContact, getSubmittedMessages, respondToMessage, submitMessage } from "../controller/contactCrtl";
import { isAdmin, verifyToken } from "../middleWare";

const contactRouter = express.Router();
contactRouter.post("/submit-message", submitMessage);
/**
 * @swagger
 * /submit-message:
 *   post:
 *     summary: Submit a message from a client.
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message submitted successfully.
 *       500:
 *         description: Internal Server Error.
 */



contactRouter.get("/get-submitted-messages",verifyToken, isAdmin,getSubmittedMessages);
/**
 * @swagger
 * /get-submitted-messages:
 *   get:
 *     summary: Get a list of submitted messages.
 *     tags: [Contact]
 *     security:
 *         - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of submitted messages.
 *       500:
 *         description: Internal Server Error.
 */



contactRouter.post("/respond-to-message",verifyToken,isAdmin, respondToMessage);
/**
 * @swagger
 * /respond-to-message:
 *   post:
 *     summary: Respond to a client's message.
 *     tags: [Contact]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contactId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin response added successfully.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Internal Server Error.
 */

contactRouter.delete("/deleteContact/:id",verifyToken, isAdmin,deleteContact);

/**
 * @swagger
 * /deleteContact/{id}:
 *   delete:
 *     summary: Delete contact by ID
 *     description: Delete contact by their ID.
 *     tags:
 *       - Contact
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Contact successfully deleted.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Internal Server Error.
 */


export default contactRouter;