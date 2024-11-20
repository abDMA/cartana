import { sendPasswordForgetEmail, sendSuccessEmailMessage, sendVerficationEmail } from '../mailTrap/email.js.js'
import cloudinary from "../lib/cloudinary.js";
import User from '../models/user.model.js'
import { generateTokenAndeSetCookie } from '../utils/generateTokenAndeSetCookie.js'
import crypto from 'crypto'
import dotenv from 'dotenv'
import bcrypt from "bcryptjs";

dotenv.config()
export const signUp = async (req,res)=>{

const { userName,email,password,userPicture } = req.body
try {
    const userExist = await User.findOne({email})
if (userExist) {
  return  res.status(400).json({message:'المستخدم موجود بالفعل'})
}
let cloudinaryResponse
if(userPicture){
    cloudinaryResponse = await cloudinary.uploader.upload(userPicture, { folder: "Profile" });
}
const verificationToken = Math.floor( 100000 + Math.random() *900000  ).toString()
const user = await User.create({userName,userPicture:cloudinaryResponse?.secure_url && cloudinaryResponse.secure_url ,email,password,verificationToken,verificationTokenExpire:Date.now() + 24 * 60 * 60 * 1000})
generateTokenAndeSetCookie(res,user._id)
await sendVerficationEmail(user.email,verificationToken)
res.status(201).json({message:'تم إنشاء حسابك بنجاح !',user:{
    ...user._doc,
    password:undefined,
   
}})
} catch (error) {
    res.status(500).json({message:error.message || 'حدث خطأ ما '})
}
}
export const verifyEmail =async (req,res)=>{
   const {code}=req.body
   try {
    const user = await User.findOne({
        verificationToken:code,
        verificationTokenExpire:{$gt:Date.now()}
    })
    if(!user){
        return res.status(400).json({success:false,message:'غير صالخ او الجلسة انتهت'})
    } 
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpire = undefined
    await user.save()
    res.json({user:{...user._doc,password:undefined},message:'تم تفعيل حسابك بنجاح'})
   } catch (error) {    
    res.status(500).json({message:error.message})
   }
  
}
export const logIn =async (req,res)=>{
  try {
    const {email,password}=req.body
    const user = await User.findOne({email})
    if (user && (await user.comparePassword(password))) {
        generateTokenAndeSetCookie(res,user._id)
        user.lastLogin = Date.now()
        await user.save()
        res.status(200).json({success:true,user:{...user._doc,password:undefined},message:'تم تسجيل الدخول بنجاح'})    
        }else{
            res.status(401).json({succes:false,message:'بيانات الإعتماد غير صالحة'})
        }
  } catch (error) {
    console.log(error)
    res.status(500).json({message:error.message|| 'حدث خطاء ما'})
  }

}
export const forgotPassword = async (req, res) => {
const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "المستخدم غير موجود" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 hour
		

		user.resetPasswordToken = resetToken;
		user.resetPasswordTokenxpireAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordForgetEmail(user.email, `${process.env.CLIENT_URL}/reset_password/${resetToken}`);

		res.status(200).json({ success: true, message: "تم ارسال رابط تغيير كلمة المرور" });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};
export const resetPassword = async (req,res)=>{
try {
const {token} = req.params;
const {password} = req.body;
  const user = await User.findOne({
    resetPasswordToken:token,
    resetPasswordTokenxpireAt:{$gt:Date.now()}  
  })
 
  if(!user) return res.status(400).json({success:false,message:'غير صالخ او الجلسة انتهت'})
const hashedPassword = await bcrypt.hash(password,10);
 user.password = hashedPassword;
 user.resetPasswordToken = undefined;
 user.resetPasswordTokenxpireAt = undefined;
  await user.save()
  await sendSuccessEmailMessage(user.email)
  res.status(200).json({success:true,message:'Password reset successfully'})
} catch (error) {
  res.status(500).json({message:error.message})
  
}
}
export const checkAuth =async(req,res)=>{
try {
    const user = await User.findById(req.userId).select('-password')
  
    if(!user) return res.status(400).json({success:false,message:'لا يوجد مستخدم'})

    res.status(200).json({success:true,user})
} catch (error) { 
  res.status(500).json({message:error.message})
}  
  }
export const logOut =async (req,res)=>{
   res.clearCookie('token')
   res.status(200).json({success:true,message:'تم تسجيل الخروج بنجاح'})
}
