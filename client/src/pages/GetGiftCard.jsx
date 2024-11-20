import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGiftCards from "../store/useGiftCards";
import LazyImage from "../components/LazyImage";
import {NavBar,Footer} from './index'
import GiftCard from "../components/GiftCard";
import { handlePayment } from "../utils/handlPyment";
import { useAuthStore } from "../store/authStore";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";


const GetGiftCard = () => {
    const [counter, setCounter] = useState(1)
    const [isloading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {isAuthenticated} = useAuthStore()

const {getCard,card,loading,error,getRelatedCard,relatedCard} = useGiftCards()
const stopInc = card?.serialNumber?.filter(serial => serial.status === 'available')

const { id } = useParams();
useEffect(() => {
  getCard(id)
  getRelatedCard(id)
}, [getCard,getRelatedCard])

const buyCard =[{
  _id:card._id,
  cardName:card?.cardName,
  price:card?.price,
  cardImg:card?.cardImg,
  quantity:counter
}]
  const handleCheck =async () => {
    if (!isAuthenticated) navigate('/login')
    setIsLoading(true)
    try {
      await handlePayment(buyCard)
      setIsLoading(false)
    } catch (error) {
      console.log('something happen',error);
      
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <>
    <NavBar/>
    <div dir="rtl" className="max-w-5xl min-h-full mx-auto xss:px-2 px-6  my-10 gap-4 mb-16">

    {
      loading?<p className="mx-4 my-24">جارٍ تحميل البطاقات ...</p>:
       card?.giftCard?.length <= 0 ? <p className="mx-6">لا يوجد بطاقات متوفرة</p> : error ? <p className="text-red-600 text-xs ">{error}</p> : 
      (<div className=" flex items-center gap-7 flex-col">
      <div className="w-full flex items-end gap-3 ">
        <div>
        <h1 className="text-xl sm:text-2xl font-bold py-5">{card.cardName}
          </h1>
          <LazyImage radius={'10px'} src={card.cardImg} alt={card.cardName}/>
        </div>
        <div className="flex flex-col items-end gap-2 w-64">
        <div className="w-full flex items-center xs:justify-between xss:flex-col xs:flex-row  ">
          <div className="flex items-center">
          <button onClick={()=>setCounter((counter)=>counter -1)} disabled={counter<=1} className={`${counter ==1 ? 'border-gray-400':'border-orange-400  hover:border-orange-400 active:border-orange-500'} w-10 h-10 flex justify-center items-center  border-2 rounded-xl text-gray-500 text-2xl `} >-</button> 
          <p className="x:mx-3 mx-1">{counter}</p>
            <button  onClick={()=>{
              if (stopInc.length <= counter) {
                toast.error('لا يمكنك الاضافة لان لا يوجد الكمية المتوفرة') 
              return
              }
              setCounter((quantity)=>quantity +1)}}  className='w-10 h-10 flex justify-center items-center border-orange-500 border-2 rounded-xl text-black text-2xl hover:border-orange-400 active:border-orange-500'>+</button>

          </div>
          <p className="text-xl font-semibold">{card.price} $</p>
        </div>
        <Button disabled={isloading} onClick={handleCheck} className="w-full flex items-center justify-center bg-[#0D94CF] text-white py-2 rounded-md
         hover:bg-[#0D94CF]/80 active:bg-[#0D94CF]">
        {
          isloading ? 'جارٍ الدفع ...' : 'اشتري الان'
        }
        </Button>
        </div>
       </div>
       <div className="w-full my-20">
        <h1 className="text-2xl font-bold">لمــحة عن هــذه البــطاقة</h1>
        <p className="text-base my-10">{card.cardOverView}</p>
       </div>
       <div className="w-full my-6">
        <h1 className="text-xl my-2 font-bold">ربما يعجبك إيضا</h1>
        <div dir="rtl" className="max-w-5xl mx-auto xss:px-2 px-6   grid xss:grid-cols-2 sm:grid-cols-4 gap-4 ">
        {
          loading?<p className="mx-4">جارٍ تحميل البطاقات ...</p>:
          error ? <p className="text-red-600 text-xs ">{error}</p>:
            relatedCard?.slice(0,8).map((card)=>(
                <GiftCard key={card._id} id={card._id} title={card.cardName} img={card.cardImg} price={card.price} alt={card.cardName} available={card.availibilty}/>       
            ))
        }
       
    </div>
       </div>
       </div>
       )
    }
   
</div>
<Footer/>
</>
  )
}

export default GetGiftCard