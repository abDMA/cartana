import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import InputValue from "../components/InputValue";
import { Eye, EyeOff,Loader,Lock  } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};

	return (
		<section>
	   <div dir="rtl" className="wavey flex justify-center items-center h-screen w-full ">
	   <div className="wave"/>
     <div className="wave"/>
     <div className="wave"/>
		 <motion.form dir="rtl" initial={{opacity:0 ,y:20}} animate={{opacity:1 ,y:0,transition:{duration:0.4,ease:"easeInOut",delay:0.2}}} onSubmit={handleSubmit} className='z-10 card overflow-hidden  bg-[#83c5e1e1] flex  flex-col rounded-xl'>
		 <h1 className='text-2xl font-bold text-white  text-center my-6 mx-26'>مرحبـا مجددا </h1>
		 <InputValue onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='كلمة المرور الجديدة' icon={<Lock  color="black" size={20}/>} 
		   extraIcon={<Eye color="black" size={20}/>}
		   extraIcon1={<EyeOff color="black" size={20}/>}/>
		   <InputValue onChange={(e)=>setConfirmPassword(e.target.value)}  type="password" placeholder='تأكيد كلمة المرور' icon={<Lock  color="black" size={20}/>} 
		   extraIcon={<Eye color="black" size={20}/>}
		   extraIcon1={<EyeOff color="black" size={20}/>}/>
		  {error && <p className='text-white text-sm font-light mt-2 mx-5 flex gap-2 items-center w-[19rem]'>{error}</p>}
		  {message && <p className='text-green-500 text-sm font-light mt-2 mx-5 flex gap-2 items-center w-[19rem]'>{message}</p>}
		   <motion.button
						   whileHover={{ scale: 1.05 }}
						   whileTap={{ scale: 0.95 }}
						   type='submit' disabled={isLoading} className="text-white bg-gradient-to-r from-cyan-600 to-teal-600 from-20% to-90%  hover:from-cyan-400 hover:to-teal-400 text-center mx-12 my-6 py-2 rounded-lg  active:from-cyan-600 active:to-teal-600" >
			{isLoading?<Loader className="animate-spin mx-auto " size={24} color="white"/> :'تأكيد كلمة المرور'}
		   </motion.button>
		</motion.form>
		</div>
	   </section>
	);
};
export default ResetPasswordPage;