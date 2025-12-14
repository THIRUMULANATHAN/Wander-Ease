import express from "express";
import {
  getAllActivities,
  getActivityBySlug,
  createActivity,
  updateActivity,
  deleteActivity
} from "../controllers/activity.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Activities management (Hiking, Yachting)
 */

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Get all active activities
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: List of activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", getAllActivities);

/**
 * @swagger
 * /api/activities/{slug}:
 *   get:
 *     summary: Get activity by slug
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *           enum: [hiking, yachting]
 *     responses:
 *       200:
 *         description: Activity data
 *       404:
 *         description: Activity not found
 */
router.get("/:slug", getActivityBySlug);

/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Create a new activity (Admin only)
 *     tags: [Activities]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - slug
 *               - name
 *               - title
 *               - description
 *               - bannerImage
 *             properties:
 *               slug:
 *                 type: string
 *                 example: hiking
 *               name:
 *                 type: string
 *                 example: Hiking
 *               title:
 *                 type: string
 *                 example: The Himalayas
 *               description:
 *                 type: string
 *               bannerImage:
 *                 type: string
 *               ctaText:
 *                 type: string
 *               ctaLink:
 *                 type: string
 *               sections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     heading:
 *                       type: string
 *                     content:
 *                       type: string
 *                     image:
 *                       type: string
 *     responses:
 *       201:
 *         description: Activity created
 *       403:
 *         description: Admin access required
 */
router.post("/", protect, authorize("admin"), createActivity);

/**
 * @swagger
 * /api/activities/{id}:
 *   put:
 *     summary: Update an activity (Admin only)
 *     tags: [Activities]
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
 *             type: object
 *     responses:
 *       200:
 *         description: Activity updated
 */
router.put("/:id", protect, authorize("admin"), updateActivity);

/**
 * @swagger
 * /api/activities/{id}:
 *   delete:
 *     summary: Delete an activity (Admin only)
 *     tags: [Activities]
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
 *         description: Activity deleted
 */
router.delete("/:id", protect, authorize("admin"), deleteActivity);

export default router;
