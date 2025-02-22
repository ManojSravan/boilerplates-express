const express = require('express');
const {
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, admin, getUsers);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.delete('/profile', protect, deleteUserProfile);

module.exports = router;