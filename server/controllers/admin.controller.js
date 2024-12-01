import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import { generateTokenAndeSetCookie } from "../utils/generateTokenAndeSetCookie.js";
import Order from "../models/cardOrder.model.js";
import CardOrder from "../models/cardOrder.model.js";
import GiftCard from "../models/card.model.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(400).json({message:"لا يوجد مستخدمين حاليا في قاعدة البانيات"})
        }
        const totalUsers = await User.countDocuments();
        const data ={
            total :totalUsers,
            users
        }

        res.status(200).json(data);
    } catch (error) {
        console.log("err with getting users",error)
        res.status(500).json({ message: error.message });
    }
};
export const getUser = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({message:"لا يوجد هذا المستخدم حاليا في قاعدة البانيات"})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(400).json({message:"لا يوجد هذا المستخدم حاليا في قاعدة البانيات"})
        }
        res.status(200).json({message:"تم حذف المستخدم بنجاح"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const createUser = async (req,res)=>{
try {
    const {userName,email,password,userPicture,userType} = req.body
    const userExist = await User.findOne({email})
    let cloudinaryResponse
if(userPicture){
    cloudinaryResponse = await cloudinary.uploader.upload(userPicture, { folder: "Profile" });
}
    if (userExist) {
      return  res.status(400).json({message:'المستخدم موجود بالفعل'})
    }
    const user = await User.create({userName,email,password,userPicture:cloudinaryResponse?.secure_url && cloudinaryResponse.secure_url,userType,isVerified:true,verificationToken:undefined,verificationTokenExpire:undefined,})
    generateTokenAndeSetCookie(res,user._id)
    res.status(201).json({message:'تم إنشاء حسابك بنجاح !',user:{
    ...user._doc,
    password:undefined,
   
}})
} catch (error) {
    console.log("errr with creating user in admin",error)
    res.status(500).json({message:error.message})

}
}
export const editUser = async (req,res)=>{
        const {userName,email,password,userType,id} = req.body
        try {
            const user = await User.findOne(
               { 
                _id:id,
               }
            )
            if(!user){
                return res.status(401).json({success:false,message:"الحساب غير موجود"})
            }
            user.userName = userName?userName:user.userName
            user.email = email ? email:user.email
            user.password = password?password:user.password
            user.userType = userType?userType:user.userType
            await user.save()
            res.status(200).json({success:true ,message:" تم تحديث الحساب بنجاح "})
            
        } catch (error) {
            console.log("err with updating user",error);
            res.status(500).json({message:error.message || 'حدث خطأ ما'})
            
        }
}
export const Adminedit =async (req,res)=>{
    const {id} =req.params
    const {userName,email,password,userPicture} = req.body
    try {
        const user = await User.findOne(
           { 
            _id:id,
           }
        )
        if(!user){
            return res.status(401).json({success:false,message:"الحساب غير موجود"})
        }
        if (user.userPicture) {
            const publicId = user.userPicture.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(publicId)
        }
        let cloudinaryResponse
    if(userPicture){
        cloudinaryResponse = await cloudinary.uploader.upload(userPicture, { folder: "profile" });
    }        user.userName = userName?userName:user.userName
        user.email = email ? email:user.email
        user.password = password?password:user.password
        user.userPicture = userPicture?(cloudinaryResponse?.secure_url && cloudinaryResponse.secure_url):user.userPicture
        user.userType
        await user.save()
        res.status(200).json({success:true ,message:" تم تحديث الحساب بنجاح "})
        
    } catch (error) {
        console.log("err with updating user",error);
        res.status(500).json({message:error.message || 'حدث خطأ ما'})
        
    }
}
export const getAdminReport = async (req,res)=>{
  try {
    const totalIncome = await Order.aggregate([
        {$group:{ _id:null, total:{$sum:"$totalPrice"}}}
    ])
    const VipEarnings = await Order.aggregate([
        {
            $group:{
                _id:'$seller',
                totalEarning:{$sum:"$totalPrice"},
                transactions:{$push:{amount:'$totalPrice',buyer:'$buyer',giftCard:'$giftCard',date:'$createdAt'}},
            },
        },
        {
            $lookup:{
                from:'users',
                localField:'_id',
                foreignField:'_id',
                as:'sellerInfo'
            }
        },
        {
            $unwind:'$sellerInfo'
        },{
            $project:{
                sellerId:'$_id',
                sellerName:'$sellerInfo.userName',
                totalEarning:1,
                transactions:1
            }
        }
    ])
    res.json({
        totalIncome:totalIncome[0]?.total || 0,
        VipEarnings
    })
  } catch (error) {
    console.log("err with getting admin report",error);
    res.status(500).json({message:error.message})
    
  }
}
export const getReport = async (req,res)=>{
    try {
      const seller = req.user.orderId
      if (!seller) {
        return res.status(404).json({message:'لايوجد مستخدم'})
      }
      const transactions = await Promise.all(
        seller.map(async (id) => {
            const transaction = await CardOrder.findById(id).populate('seller', 'userName email balance').populate('buyer', 'userName email').populate('giftCards.giftCard', 'cardName cardImg quantity price');
            return {
                 transactionId: transaction?._id,
                 seller: transaction?.seller,
                 buyer: transaction?.buyer,
                 balance:transaction.balance,
                 giftCards: transaction?.giftCards,
                 totalPrice: transaction?.totalPrice,
                 createdAt: transaction?.createdAt
             }
        })
      ) 
    
        res.status(200).json(transactions);

    } catch (error) {
        console.log("err in getting report",error);
        res.status(500).json({message:error.message})
    }

}
export const getVipBalance = async (req,res)=>{
    try {
        const vipBalance = await User.aggregate([
            {$match:{userType:'VIP'}},
            {$group:{
                _id:null,
                totalBalance:{$sum:"$balance"}
            }}
        ])
        res.json({vipBalance:vipBalance[0]?.totalBalance || 0}) 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})

    }
}
export const vipTransactions = async (req,res)=>{
    const {id} = req.params
    const seller = await User.findById(id).select('orderId')
    try {
        const transactions = await Promise.all(
            seller.orderId.map(async (id) => {
                const transaction = await CardOrder.findById(id).populate('giftCards.giftCard', 'cardName cardImg quantity price');
                return {
                     transactionId: transaction?._id,
                     giftCards: transaction?.giftCards,
                     totalPrice: transaction?.totalPrice,
                     createdAt: transaction?.createdAt
                 }
            })
          ) 
        
            res.status(200).json(transactions);
    } catch (error) {
        console.log("err on vipTransactions");
        res.status(500).json({message:error.message})

    }
}
export const deleteReport = async  (req,res)=>{
    try {
        const {id} = req.params
        const  user = req.user
        if (!user) {
            return res.status(404).json({message:'لايوجد مستخدم'})
          }
        const transaction = await CardOrder.findByIdAndDelete(id)
        if (!transaction) {
            return res.status(404).json({message:'لايوجد معامله'})
        }
         user.orderId = user?.orderId?.filter((order)=> order.toString() !== id)        
        await user.save();
        res.status(200).json({message:'تم حذف المعامله بنجاح'});
        
    } catch (error) {
        console.log("err in deleting report",error);
        res.status(500).json({message:error.message})
        
        
    }
}
export const getVipFunds = async(req,res)=>{
    
const {serialNumber} = req.body
try {
const giftCard = await GiftCard.findOne({
    'serialNumber.serial':serialNumber,
    'serialNumber.status':"sold"
})
if (!giftCard) {
    return res.status(404).json({message:"خطأ في رقم البطاقة"})
}
const cardOrder = await CardOrder.findOne({
'giftCards.giftCard': giftCard._id,
    buyer: req.user._id
}).populate('giftCards.giftCard', 'serialNumber cardType');
if (!cardOrder) {
    return res.json({message:"خطـأ في اضافة البطاقة الى الطلب"})
}

const isSerialIncluded = cardOrder.giftCards.some(card => card.giftCard.serialNumber.some(serial => serial.serial === serialNumber && serial.status === 'sold' && card.giftCard.cardType === 'VipCard' ) );


if (isSerialIncluded) { 
     const user = await User.findById(req.user._id); 
     if (user.redeemCards.includes(serialNumber)) { 
        return res.status(400).json({ message: "هذه البطاقة تم استخدامها من قبل" })}
    user.chosenCards.forEach(card=>{
        if(card.serial === serialNumber && card.isRedeemed === false){
            card.isRedeemed =true
            user.redeemCards.push(card.serial)
        }
     } )
   
       user.balance += giftCard.price; 
       await user.save()
 return res.json({ message: "تم إضافة الرصيد إلى حسابك", newBalance: user.balance }); }

  return res.status(400).json({ message: "البطاقة غير موجودة في الطلب" });

    } catch (error) {
        console.log("err with get vip funds in vip admin",error);
        res.status(500).json({message:error.message||'حدث خطاء ما'})
    }
}

