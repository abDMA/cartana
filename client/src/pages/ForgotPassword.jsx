import InputValue from '../components/InputValue'
import { Mail,ArrowLeft, CircleAlert, Loader } from 'lucide-react';
import { Link} from 'react-router-dom'
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isSubmited, setIsSubmited] = useState(false)
 
  const {forgotPassword,error,isLoading} = useAuthStore()
  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      await forgotPassword(email)
      setIsSubmited(true)
    } catch (error) {
      console.log("forgot password error ",error.message);
    }
  }
  return (
    <section >
    <div dir='rtl' className="wavey flex justify-center items-center h-screen w-full ">
    <div className="wave"/>
     <div className="wave"/>
     <div className="wave"/>
      <motion.form initial={{opacity:0 ,y:20}} animate={{opacity:1 ,y:0,transition:{duration:0.4,ease:"easeInOut",delay:0.2}}} onSubmit={handleSubmit} className='z-10 bg-[#83c5e1e1] card overflow-hidden   flex  flex-col rounded-xl'>
      <h1 className='text-3xl font-bold text-white  text-center my-6 mx-20'>نسيت كلمة المرور </h1>
    { !isSubmited ? (
     <> <span className='  text-sm font-semibold  text-white  text-center my-4 '>أدخل بريدك الإلكتروني وسنرسل لك الرابط 
     <br /> لإعادة تعيين كلمة المرور الخاصة بك
</span>
        <InputValue onChange={(e)=>setEmail(e.target.value)} type="email" placeholder=' أدخــل بريدك الإلكتروني المرتبط بالحساب' icon={<Mail color="black" size={20}/>}/>
        {error && <p className='text-red-300 text-sm font-light mt-2 mx-5 flex gap-2 items-center w-[19rem]'>{error}
        <CircleAlert size={20} color="red" className="mt-[2px]"/></p>}
        <motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit' disabled={isLoading || email.length<=6} className="text-white bg-gradient-to-r from-cyan-600 to-teal-600 from-20% to-90%  hover:from-cyan-400 hover:to-teal-400 text-center mx-12 my-4 py-2 rounded-lg  active:from-cyan-600 active:to-teal-600" >
         {isLoading?<Loader className="animate-spin mx-auto " size={24} color="white"/> :'إرسال رمز إعادة التعيين'}
        </motion.button></>):(
					<div className='text-center'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
							className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
						>
							<Mail className='h-8 w-8 text-white' />
						</motion.div>
						<p className='text-gray-300 mb-6'>
            إذا كان هناك حساب لـ {email}،<br /> فسوف تتلقى رابطًا لإعادة تعيين كلمة المرور قريبًا.

						</p>
					</div>
				)}

       
    <Link to='/login' className="text-white  text-xs  mt-4 py-4 text-center bg-teal-800 font-semibold flex  justify-center  gap-2 items-center">
      <ArrowLeft className="animate-bounceHorizantally" color="white" size={15}/> إرجع الى صفحة تسجيل الدخول
    </Link>
     </motion.form>
     </div>
    </section>
  )
}

export default ForgotPassword