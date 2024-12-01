import InputValue from '../components/InputValue'
import { Mail ,KeyRound ,EyeOff,Eye, Loader, CircleAlert, UserRound} from 'lucide-react';
import { Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { defaulUserProfile } from '../assets';
const SignUp = () => {
  const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const {isLoading,signup,error}= useAuthStore()
  const [userPicture, setuserPicture] = useState(null)

  const navigate = useNavigate()
  const filePickerRef = useRef(null);
  const selectedImgPicker = (e)=>{
     const reader = new FileReader();
     if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
     };
     reader.onload =(readerEvent) =>{
        setuserPicture(readerEvent.target.result);
     };

  };
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if ( userName.length>2 && email.length>2 && password.length>2) {
      try {
    await signup(userName,email,password,userPicture)
    navigate("/email_verification")

   } catch (error) {
    console.log(error);
    
   }
    }
 
  }
 
  
  return (
    <section >

    <div dir='rtl' className="wavey flex justify-center items-center h-screen w-full "><input type="file"  hidden  ref={filePickerRef} onChange={selectedImgPicker} /> 
    <div className="wave"/>
     <div className="wave"/>
     <div className="wave"/>
      <motion.form initial={{opacity:0 ,y:20}} animate={{opacity:1 ,y:0,transition:{duration:0.4,ease:"easeInOut",delay:0.2}}} onSubmit={handleSubmit} className='z-10 card bg-[#83c5e1e1] overflow-hidden   flex  flex-col rounded-xl'>
      <h1 className='text-3xl font-semibold text-white  text-center my-6 mx-20'>إنشاء حساب جديد </h1>
        <InputValue value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" placeholder='إسم المستخدم' icon={<UserRound color="black" size={20}/>}/>
        <InputValue value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='البريد الإلكتروني' icon={<Mail color="black" size={20}/>}/>
        <InputValue value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='كلمة السر' icon={<KeyRound color="black" size={20}/>} 
        extraIcon={<Eye color="black" size={20}/>}
        extraIcon1={<EyeOff color="black" size={20}/>}/>
            <div className="flex items-center gap-2  mx-12 my-3">
                      <p className="text-xs font-normal text-white">إختر صورة لحسابك الشخصي</p>
                      <div onClick={() => filePickerRef.current.click()} className="w-8 h-8">
                      <img  src={`${userPicture ? userPicture :defaulUserProfile}`} alt="user  pic" loading="lazy" className="object-contain w-full h-full rounded-full" />
                      </div>
                     </div>
                     {error && <p className='text-white text-sm font-light mt-2 mx-5 flex gap-2 items-center w-[19rem]'>{error}
                     <CircleAlert size={20} color="red" className="mt-[2px]"/></p>}
        <motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit' disabled={isLoading&& userName.length>2 && email.length>2 && password.length>2} className="text-white bg-gradient-to-r from-cyan-600 to-teal-600 from-20% to-90%  hover:from-cyan-400 hover:to-teal-400 text-center mx-12 my-4 py-2 rounded-lg  active:from-cyan-600 active:to-teal-600" >
         {(isLoading&& userName.length>2 && email.length>2 && password.length>2)?<Loader className="animate-spin mx-auto " size={24} color="white"/> :'تسجيل حساب جديد'}
        </motion.button>
        <div to='/signup' className="text-white   text-xs  mt-4 py-4 text-center bg-teal-800 font-semibold" >هل لديك حساب من قبل ؟  <Link to='/login' className="hover:underline hover:text-teal-400 ">تسجيل الدخول</Link> </div>
    
     </motion.form>
     </div>
    </section>
  )
}

export default SignUp