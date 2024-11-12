// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminMiddleware = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', userController.registerUser);

// Update userType (admin only)
router.put('/updateUserType', adminMiddleware, userController.updateUserType);

module.exports = router;
