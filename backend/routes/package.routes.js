import express from "express";
import {
  getAllPackages,
  getFeaturedPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} from "../controllers/package.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Packages
 *   description: Travel packages management
 */

/**
 * @swagger
 * /api/packages:
 *   get:
 *     summary: Get all active packages
 *     tags: [Packages]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: hiking
 *     responses:
 *       200:
 *         description: Packages fetched successfully
 */
router.get("/", getAllPackages);

/**
 * @swagger
 * /api/packages/featured:
 *   get:
 *     summary: Get featured packages
 *     tags: [Packages]
 *     responses:
 *       200:
 *         description: Featured packages fetched successfully
 */
router.get("/featured", getFeaturedPackages);

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Get package by ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 693e55d13f7eac8130855793
 *     responses:
 *       200:
 *         description: Package fetched successfully
 *       404:
 *         description: Package not found
 */
router.get("/:id", getPackageById);

/**
 * @swagger
 * /api/packages:
 *   post:
 *     summary: Create a new package (Admin only)
 *     tags: [Packages]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - coverImage
 *               - gallery
 *               - location
 *               - duration
 *               - tourType
 *               - category
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: Himalayan Adventure Trek
 *               description:
 *                 type: string
 *                 example: A breathtaking trekking experience in the Himalayas
 *               coverImage:
 *                 type: string
 *                 example: https://example.com/cover.jpg
 *               gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://example.com/1.jpg
 *                   - https://example.com/2.jpg
 *                   - https://example.com/3.jpg
 *               location:
 *                 type: string
 *                 example: Himachal Pradesh
 *               duration:
 *                 type: string
 *                 example: 5 Days
 *               tourType:
 *                 type: string
 *                 example: Hiking
 *               category:
 *                 type: string
 *                 example: hiking
 *               groupSize:
 *                 type: string
 *                 example: 10-15
 *               languages:
 *                 type: string
 *                 example: English, Hindi
 *               price:
 *                 type: number
 *                 example: 14999
 *     responses:
 *       201:
 *         description: Package created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post("/", protect, authorize("admin"), createPackage);

/**
 * @swagger
 * /api/packages/{id}:
 *   put:
 *     summary: Update a package (Admin only)
 *     tags: [Packages]
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
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               price: 17999
 *               isFeatured: true
 *     responses:
 *       200:
 *         description: Package updated successfully
 */
router.put("/:id", protect, authorize("admin"), updatePackage);

/**
 * @swagger
 * /api/packages/{id}:
 *   delete:
 *     summary: Delete a package (soft delete – Admin only)
 *     tags: [Packages]
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
 *         description: Package deleted successfully
 */
router.delete("/:id", protect, authorize("admin"), deletePackage);

export default router;
