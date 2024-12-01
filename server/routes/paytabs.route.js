import express from 'express'
import {createCheckoutSession, paytabsCallback,  } from '../controllers/paytabs.controller.js'
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()
router.post('/create-checkout-session',verifyToken,createCheckoutSession)
router.post('/checkout-success',verifyToken,paytabsCallback)
export default router