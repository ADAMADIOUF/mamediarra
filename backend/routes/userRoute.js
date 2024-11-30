import express from 'express'
import {
  login,
  register,
  logout,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deletedUser,
  getUserByID,
  updatedUser,
  forgotPassword,
  resetPassword,
  googleAuth,
} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
import passport from 'passport'
const router = express.Router()
router.route('/').post(register).get(protect, admin, getUsers)

router.post('/logout', logout)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deletedUser)
  .get(getUserByID)
  .put(protect, admin, updatedUser)

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.post(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleAuth
)

export default router
