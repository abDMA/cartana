import express from 'express'
import { adminGetAllGiftCards, checkSerial, createGiftCard, deleteCard,editCard,getAllGiftCards, getAllVipCards, getCard, relatedCard, vipGetCard } from '../controllers/giftCard.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { adminOnly } from '../middleware/adminOnly.js'
import {vipOnly} from '../middleware/vipOnly.js'
const router = express.Router()

router.get('/',getAllGiftCards)
router.get('/admin_card',verifyToken,adminOnly,adminGetAllGiftCards)
router.get('/vipAllCards',verifyToken,vipOnly,getAllVipCards)
router.post('/',verifyToken,vipOnly,createGiftCard)
router.post('/checkSerial',verifyToken,vipOnly,checkSerial)
router.delete('/:id',verifyToken,vipOnly,deleteCard)
router.patch('/:id',verifyToken,vipOnly,editCard)
router.get('/vip_card/:id',verifyToken,vipOnly,vipGetCard)
router.get('/related/:id',relatedCard)
router.get('/:id',getCard)
export default router