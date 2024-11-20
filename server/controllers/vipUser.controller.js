import cloudinary from "../lib/cloudinary.js"
import GiftCard from "../models/card.model.js"
import Order from "../models/cardOrder.model.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";

export const createVipCard = async(req,res)=>{
    const {cardName,price,cardOverView,cardImg,serialNumber,cardType,cardGenre,stock,category} = req.body
    try {
        const giftCard = await GiftCard.findOne({serialNumber})
        if (giftCard) {
            return res.status(400).json({success:false,message:'كود الرقم غير صالح'})
        }
        let cloudinaryResponse
    if(cardImg){
        cloudinaryResponse = await cloudinary.uploader.upload(cardImg, { folder: "giftCard" });
    }

    const newGiftCard = new GiftCard({
        cardName,price,cardOverView,cardImg:cloudinaryResponse?.secure_url && cloudinaryResponse.secure_url,serialNumber,cardType,cardGenre,stock,category
    })
    await newGiftCard.save()

        res.status(200).json({success:true,newGiftCard,message:"تم إنشاء بطاقتك بنجاح"})
    } catch (error) {
        console.log('err with creating gift Card',error);
        res.status(500).json({message:error.message||' حدث خطاء ما'})
        
    }
}
export const getVipCard = async(req,res)=>{
try {
    const {id}= req.params
    const giftCard = await GiftCard.findById({_id:id,seller:req.user._id})
    if (!giftCard) {
        return res.status(400).json({success:false,message:"البطاقة غير موجودة"})
    }
    const orederCount = await Order.countDocuments({giftCard:id})
    const newGiftCard = {
        ...giftCard._doc,
        serialNumber:undefined,
        isSold:undefined,
    }
  
    res.status(200).json({success:true,newGiftCard,orederCount})
} catch (error) {
    console.log("err with get specific vip card in vip dashboard",error);
    res.status(500).json({message:error.message||'حدث خطاء ما'})
}
}
export const getAllVipCards = async(req,res)=>{
try {
    const giftCards = await GiftCard.find({seller:req.user._id})
    const giftCardWithOrderCount = await Promise.all(giftCards.map(async (giftCard) => {
        const orderCount = await Order.countDocuments({giftCard:giftCard._id});
        return { ...giftCard.toObject(),serialNumber:undefined,isSold:undefined,orderCount };
    }))
  
    res.json(giftCardWithOrderCount);
} catch (error) {
    console.log("err with get all vip card in vip admin",error);
    res.status(500).json({message:error.message||'حدث خطاء ما'})
    
}
}
export const editVipCard = async(req,res)=>{
try {
    const {id} = req.params
    const {cardName,price,cardOverView,cardImg,serialNumber,cardType,cardGenre,stock,category} = req.body
    const giftCard = await GiftCard.findOne({serialNumber})
    const vipCard = await GiftCard.findOne({_id:id})
    let cloudinaryResponse
    if (giftCard) {
        return res.status(400).json({success:false,message:'كود الرقم غير صالح'})
    }  
    if (vipCard.cardImg) {
		const publicId = vipCard.cardImg.split('/').pop().split('.')[0]
		await cloudinary.uploader.destroy(publicId)
	}
if(cardImg){
    cloudinaryResponse = await cloudinary.uploader.upload(cardImg, { folder: "VipCard" });
}
    const card = await GiftCard.findOneAndUpdate({_id:id},{cardName,price,cardOverView,cardImg:cardImg?(cloudinaryResponse?.secure_url && cloudinaryResponse.secure_url):card.cardImg,serialNumber,cardType,cardGenre,stock,category},{new:true})
   res.status(200).json({success:true,card,message:"تم تعديل بطاقتك بنجاح"})
   
} catch (error) {
    console.log("err with edit vip card in vip admin",error);
    res.status(500).json({message:error.message||'حدث خطاء ما'})   
}
}
export const deleteVipCard = async(req,res)=>{
try {
    const {id}= req.params
    const giftCard = await GiftCard.findByIdAndDelete({_id:id,seller:req.user._id})
    if (!giftCard) {
        return res.status(400).json({success:false,message:"البطاقة غير موجودة"})
    }
    res.status(200).json({success:true,message:"تم حذف البطاقة بنجاح"})
} catch (error) {
    console.log("err with delete vip card in vip admin",error);
    res.status(500).json({message:error.message||'حدث خطاء ما'})   
}
}
export const updateVipAccount = async (req,res)=>{
try {
    const {userName,email,password,userPicture} = req.body
    const user = await User.findOne({_id:req.user._id})
    let cloudinaryResponse 
    if (user.userPicture) {
		const publicId = user.userPicture.split('/').pop().split('.')[0]
		await cloudinary.uploader.destroy(publicId)
	}
if(userPicture){
    cloudinaryResponse = await cloudinary.uploader.upload(cardImg, { folder: "VipUserProfile" });
}
    const updates = {}
    if(userName) updates.userName = userName
    if(email) updates.email = email
    if(userPicture) updates.userPicture
    if(password){
        const hashedPassword = await bcrypt.hash(password,10)
        updates.password = hashedPassword
    }
    const saveUser  = await User.findByIdAndUpdate(req.user._id , updates,{new:true})
    res.status(200).json({success:true,saveUser})
} catch (error) {
    console.log("err with edit vip account in vip admin",error);
    res.status(500).json({message:error.message||'حدث خطاء ما'})   
}
}
export const getVipReport = async(req,res)=>{
try {
    const giftCards = await GiftCard.find({seller:req.user._id}).populate('buyer','name')
    if (!giftCards) {
        return res.status(400).json({success:false,message:"البطاقات غير موجودة"})
    }
    const transactions = await Promise.all(giftCards.map(async (giftCard) => {
        const orders = await Order.find({giftCard:giftCard._id})
        const totalEarningFromCard = orders.reduce((acc,order) => acc + order.totalPrice,0)
        return {
        giftCard:{
            id:giftCard._id,
            cardName:giftCard.cardName,
            cardImg:giftCard.cardImg,
            cardOverView:giftCard.cardOverView
        },orderCount:orders.length,totalEarningFromCard,
        orders:orders.map((order) => ({
            buyerName:order.buyer.userName,
            quantity:order.quantity,
            totalPrice:order.totalPrice,
            orderDate:order.createdAt  
        }))
    }
    }))
    const totalBalance = transactions.reduce((acc,transaction) => acc + transaction.totalEarningFromCard,0)
    res.json({message:"المعاملات السابقة للعميل",transactions,totalBalance})


} catch (error) {
    console.log("err with get vip report in vip admin",error);
    res.status(500).json({message:error.message||'حدث خطاء ما'})
}
}
