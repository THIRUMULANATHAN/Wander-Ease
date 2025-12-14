import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserStatus,
  addFriend,
  removeFriend,
  getFriends,
  deleteUser,
  promoteUserToAdmin
} from "../controllers/user.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management & social features
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       403:
 *         description: Admin access required
 */
router.get("/", protect, authorize("admin"), getAllUsers);

/**
 * @swagger
 * /api/users/me/friends:
 *   get:
 *     summary: Get current user's friends
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Friends list fetched successfully
 */
router.get("/me/friends", protect, getFriends);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 693e42816b8d14c12525f6c3
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 */
router.get("/:id", protect, getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               name: Updated Name
 *               bio: Traveller & explorer
 *               avatar: https://i.pravatar.cc/300
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put("/:id", protect, updateUserProfile);

/**
 * @swagger
 * /api/users/{id}/status:
 *   patch:
 *     summary: Update user online status
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: online
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.patch("/:id/status", protect, updateUserStatus);

/**
 * @swagger
 * /api/users/friends/add:
 *   post:
 *     summary: Add a friend
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendId
 *             properties:
 *               friendId:
 *                 type: string
 *                 example: 693e4749b3dac8eb000c41c7
 *     responses:
 *       200:
 *         description: Friend added successfully
 */
router.post("/friends/add", protect, addFriend);

/**
 * @swagger
 * /api/users/friends/remove:
 *   post:
 *     summary: Remove a friend
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendId
 *             properties:
 *               friendId:
 *                 type: string
 *                 example: 693e4749b3dac8eb000c41c7
 *     responses:
 *       200:
 *         description: Friend removed successfully
 */
router.post("/friends/remove", protect, removeFriend);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (Admin only – soft delete)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/:id", protect, authorize("admin"), deleteUser);

/**
 * @swagger
 * /api/users/{id}/promote:
 *   patch:
 *     summary: Promote user to admin (Admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User promoted to admin successfully
 *       403:
 *         description: Admin access required
 */
router.patch("/:id/promote", protect, authorize("admin"), promoteUserToAdmin);

export default router;
