import express from "express";
import {
  getUserRooms,
  getRoomById,
  createRoom,
  addMemberToRoom,
  removeMemberFromRoom,
  deleteRoom
} from "../controllers/room.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Chat rooms & virtual rooms management
 */

/**
 * @swagger
 * /api/rooms/user/{userId}:
 *   get:
 *     summary: Get all rooms of a user
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: 693e4749b3dac8eb000c41c7
 *     responses:
 *       200:
 *         description: User rooms fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/user/:userId", protect, getUserRooms);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get room details by ID
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 693e55d13f7eac8130855793
 *     responses:
 *       200:
 *         description: Room fetched successfully
 *       404:
 *         description: Room not found
 */
router.get("/:id", protect, getRoomById);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room (private / group / virtual)
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - members
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin ↔ User Chat
 *               type:
 *                 type: string
 *                 example: private
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - 693e4749b3dac8eb000c41c7
 *                   - 693e42816b8d14c12525f6c3
 *               createdBy:
 *                 type: string
 *                 example: 693e4749b3dac8eb000c41c7
 *               description:
 *                 type: string
 *                 example: Private chat room
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", protect, createRoom);

/**
 * @swagger
 * /api/rooms/{id}/add:
 *   patch:
 *     summary: Add a member to a room
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 693e55d13f7eac8130855793
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 693e42816b8d14c12525f6c3
 *     responses:
 *       200:
 *         description: Member added successfully
 */
router.patch("/:id/add", protect, addMemberToRoom);

/**
 * @swagger
 * /api/rooms/{id}/remove:
 *   patch:
 *     summary: Remove a member from a room
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 693e55d13f7eac8130855793
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 693e42816b8d14c12525f6c3
 *     responses:
 *       200:
 *         description: Member removed successfully
 */
router.patch("/:id/remove", protect, removeMemberFromRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room (soft delete)
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 693e55d13f7eac8130855793
 *     responses:
 *       200:
 *         description: Room deleted successfully
 */
router.delete("/:id", protect, deleteRoom);

export default router;
