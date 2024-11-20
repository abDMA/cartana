import express from 'express'
import { vipOnly } from '../middleware/vipOnly.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { createVipCard, deleteVipCard, editVipCard, getVipCard, getAllVipCards, updateVipAccount, getVipReport } from '../controllers/vipUser.controller.js'
const router = express.Router()
router.get('/',getAllVipCards)
router.get('/:id',getVipCard)
router.get('/vip-report',verifyToken,vipOnly,getVipReport)
router.post('/',verifyToken,vipOnly,createVipCard)
router.delete('/:id',verifyToken,vipOnly,deleteVipCard)
router.patch('/:id',verifyToken,vipOnly,editVipCard)
router.patch('/create-user',verifyToken,vipOnly,updateVipAccount)
export default router
