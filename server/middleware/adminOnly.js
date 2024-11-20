export const adminOnly = (req,res,next)=>{
try {
    if (req.user || req.user.role === 'admin') {
     next()
    }else{
        return res.status(401).json({success:false,message:'غير مسموح هذه الصفحة للمدير فقط '})
    }
} catch (error) {
    console.log('err in admin middleware',error);
     res.status(500).json({message:error.message})
}
}