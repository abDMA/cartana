import express from 'express'
const router = express.Router()
import {adminOnly} from '../middleware/adminOnly.js'
import { Adminedit, createUser, deleteReport, deleteUser, editUser, getAllUsers, getReport, getUser, getVipBalance, vipTransactions } from '../controllers/admin.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'

router.post('/',verifyToken,adminOnly,createUser)
router.get('/',verifyToken,adminOnly,getAllUsers)
router.get('/admin-report',verifyToken,adminOnly,getReport)
router.get('/vip-balance',verifyToken,adminOnly,getVipBalance)
router.delete('/delete-report/:id',verifyToken,adminOnly,deleteReport)
router.get('/vip-transactions/:id',verifyToken,adminOnly,vipTransactions)
router.get('/:id',verifyToken,adminOnly,getUser)
router.patch('/',verifyToken,adminOnly,editUser)
router.patch('/:id',verifyToken,adminOnly,Adminedit)
router.delete('/:id',verifyToken,adminOnly,deleteUser)


export default router
