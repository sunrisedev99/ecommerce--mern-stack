import express from 'express';
import { authUser, getUserProfile } from '../controllers/userControllers.js';
import protectRoute from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc authenticate user and get token
// @route POST /api/users/login
// @access PUBLIC
router.route('/login').post(authUser);

// @desc get data for an authenticated user
// @route GET /api/users/profile
// @access PRIVATE
router.route('/profile').get(protectRoute, getUserProfile);

export default router;
