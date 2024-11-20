import express from "express"
import { checkOutSuccess, createCheckoutSession } from "../controllers/payment.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
const router = express.Router()
router.post('/create-checkout-session',verifyToken,createCheckoutSession)
router.post('/checkout-success',verifyToken,checkOutSuccess)
export default router