import express from "express";
import {
  getMessagesByRoom,
  createMessage,
  updateMessage,
  deleteMessage,
  markMessagesAsRead
} from "../controllers/message.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Chat messages & conversations
 */

/**
 * @swagger
 * /api/messages/{roomId}:
 *   get:
 *     summary: Get chat history of a room
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         example: 693e55d13f7eac8130855793
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 50
 *     responses:
 *       200:
 *         description: Messages fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/:roomId", protect, getMessagesByRoom);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a message (REST fallback)
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - content
 *             properties:
 *               roomId:
 *                 type: string
 *                 example: 693e55d13f7eac8130855793
 *               content:
 *                 type: string
 *                 example: Hello 👋 How are you?
 *               messageType:
 *                 type: string
 *                 example: text
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, createMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   put:
 *     summary: Edit a message (sender only)
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 694012ab3f7eac813085579a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Edited message ✏️
 *     responses:
 *       200:
 *         description: Message updated
 *       403:
 *         description: Not allowed
 */
router.put("/:id", protect, updateMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Delete a message (soft delete – sender only)
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 694012ab3f7eac813085579a
 *     responses:
 *       200:
 *         description: Message deleted
 *       403:
 *         description: Not allowed
 */
router.delete("/:id", protect, deleteMessage);

/**
 * @swagger
 * /api/messages/read/{roomId}:
 *   patch:
 *     summary: Mark all messages as read in a room
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         example: 693e55d13f7eac8130855793
 *     responses:
 *       200:
 *         description: Messages marked as read
 *       401:
 *         description: Unauthorized
 */
router.patch("/read/:roomId", protect, markMessagesAsRead);

export default router;
