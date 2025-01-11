import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import * as paypal from '../lib/paypal.js'
import { verifyToken } from '../middleware/verifyToken.js';


const router = express.Router()
let chosenSerials = [];
let chosenCards = [];
let totalAmount = 0;
router.post('/create-purshase',verifyToken, async(req, res) => {
chosenSerials = [];
chosenCards = [];
totalAmount = 0;
    try {
        const url = await paypal.createOrder()
        res.status(200).json({url})
      
    } catch (error) {
        res.send('Error: ' + error.message)
    }
})
router.post('/test',verifyToken,async (req, res) => {
    try {
        const { giftCards } = req.body;
        res.status(200).json(giftCards)
        await paypal.test(giftCards)
    } catch (error) {
        console.log(error);
        
    }
})
router.post('/complete-order',verifyToken, async (req, res) => {
    try {
        const token = req.body
        await paypal.capturePayment(token.token,req,res)
    } catch (error) {
        res.json('Error: ' + error)
    }
})

router.get('/cancel-order', (req, res) => {
    res.redirect('/')
})

export default router
