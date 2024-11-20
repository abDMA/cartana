export const vipOnly = (req,res,next)=>{
    try {
        if (!req.user || !req.user.role === 'regular') {
            return res.status(401).json({success:false,message:'غير مسموح الدخول يسمج فقط بالمستخدم للادامنة'})
        }
        next()
    } catch (error) {
        console.log('err in admin middleware',error);
         res.status(500).json({message:error.message})
    }
    }