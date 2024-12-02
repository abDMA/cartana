import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../lib/axios";
import Confetti from "react-confetti";
const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const [error, setError] = useState(null);
	console.log("title",document.title)

	if (document.title.includes('Cannot POST')) {
		window.location.href = window.location.href.split('?')[0]
	}
	
	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post('paytabs/checkout-success', {
					sessionId,
				});
				localStorage.removeItem("cartItems");
				localStorage.removeItem("trace");
			} catch (error) {
				console.log(error.message);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = JSON.parse(localStorage.getItem("trace")) || [];
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, []);

	if (isProcessing) return "Processing...";

	if (error) return `Error: ${error}`;

	return (
		<div className='h-screen flex items-center justify-center px-4'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-emerald-400 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2'>
					عملية الشراء ناجحة!
					</h1>

					<p className='text-gray-300 text-center mb-2'>
					شكرا لطلبك. {"نحن"} نقوم بمعالجته الآن.
					</p>
					<p className='text-emerald-400 text-center text-sm mb-6'>
					تحقق من بريدك الإلكتروني للحصول على تفاصيل الطلب والتحديثات.<br/>
					<strong className="text-xs text-red-400 font-semibold ">ملاحظة:اذا لم تتلقى اي رسالة على بريدك الإلكتروني إضغط على الايقونة الخاصة بالبروفايل وستجد كل البطاقات</strong>
					</p>

					<div className='space-y-4'>
						<button
							className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center'
						>
							<HandHeart className='mr-2' size={18} />
							شكرا لثقتك بنا!

						</button>
						<Link
							to={"/"}
							className='w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center'
						>
							مواصلة التسوق
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;
