import express from 'express'
import { logIn,logOut, signUp,verifyEmail,forgotPassword,resetPassword, checkAuth } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'
const router = express.Router()
router.get('/check-auth',verifyToken,checkAuth)
router.post('/signup',signUp)
router.post('/login',logIn)
router.post('/logout',logOut)
router.post('/verify_email',verifyEmail)
router.post('/forgot_password',forgotPassword)
router.post('/reset_password/:token',resetPassword)
export default router