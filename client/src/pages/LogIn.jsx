import InputValue from '../components/InputValue'
import { Mail ,KeyRound ,EyeOff,Eye, CircleAlert, Loader} from 'lucide-react';
import { Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

const LogIn = () => {
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const {isLoading,login,error}= useAuthStore()
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      await login(email,password)
      navigate("/")
    } catch (error) {
      console.log("err from loggin in" ,error);
      
    }
  }
  return (
    <section >
    <div dir='rtl' className="flex justify-center items-center h-screen w-full ">
      <motion.form initial={{opacity:0 ,y:20}} animate={{opacity:1 ,y:0,transition:{duration:0.4,ease:"easeInOut",delay:0.2}}} onSubmit={handleSubmit} className='card overflow-hidden   flex  flex-col rounded-xl bg-[#199ad181] '>
      <h1 className='text-3xl font-semibold text-white  text-center my-6 mx-20'>مرحبا مجددا </h1>
        <InputValue onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='البريد الإلكتروني' icon={<Mail color="black" size={20}/>}/>
        <InputValue onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='كلمة السر' icon={<KeyRound  color="black" size={20}/>} 
        extraIcon={<Eye color="black" size={20}/>}
        extraIcon1={<EyeOff color="black" size={20}/>}/>
        <Link to='/forgot_password' className="text-white  hover:underline text-sm mx-12 my-3 font-semibold" >نسيت كلمة السر؟</Link>
        {error && <p className='text-white text-sm font-light mt-2 mx-5 flex gap-2 items-center w-[19rem]'>{error}
        <CircleAlert size={20} color="red" className="mt-[2px]"/></p>}
        <motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit' disabled={isLoading} className="text-white bg-gradient-to-r from-cyan-600 to-teal-600 from-20% to-90%  hover:from-cyan-400 hover:to-teal-400 text-center mx-12 my-4 py-2 rounded-lg  active:from-cyan-600 active:to-teal-600" >
         {isLoading?<Loader className="animate-spin mx-auto " size={24} color="white"/> :'تسجيل الدخول'}
        </motion.button>
        <div to='/signup' className="text-white   text-xs  mt-4 py-4 text-center bg-teal-800 font-semibold" >ليس لديك حساب ؟  <Link to='/signup' className="hover:underline hover:text-teal-400">سجِّل حساب جديد</Link> </div>
    
     </motion.form>
     </div>
    </section>
  )
}

export default LogIn