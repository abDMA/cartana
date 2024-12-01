import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { arrow, circle } from "../assets"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import '../utils/style.css';
import { EffectCards } from 'swiper/modules';
import LazyImage from "../components/LazyImage";
import ChargeBalance from "../components/ChargeBalance";
import ChargBalance from "../store/useChargeBlanceStore";
import { Crown } from "lucide-react";

const VipPanel = ({chosenCard,balance}) => {
    const {newBalance} = ChargBalance()

    const unique = chosenCard?.filter((card,index,self)=>index===self.findIndex((c)=>c.Name === card.Name))
   
    
    const redeemedCard = chosenCard.map(card=>card).filter(card=>card.isRedeemed ===true)
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(newBalance !== 0 ?newBalance :balance)
  return (
    <section className="wavey px-4 flex justify-center items-center min-h-screen  ">
      <div className="wave"/>
     <div className="wave"/>
     <div className="wave"/>

    <Tabs defaultValue="رصيدي" className="w-[400px] z-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="بطاقاتي" ><p className='text-blue-500 font-bold'>بطاقاتي</p></TabsTrigger>
        <TabsTrigger value="رصيدي"><p className='text-blue-500 font-bold'>رصيدي</p></TabsTrigger>
      </TabsList>
      <TabsContent value="بطاقاتي">
      <div className=" px-2 py-2 shadow-xl bg-slate-50 rounded-lg  ">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="swiperCard h-44"
      >
        {unique?.map((card,i)=>(
          <SwiperSlide key={i}><LazyImage objectFit={'fill'} src={card.img} alt={card.Name}/></SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-between sm:mx-12 mx-10 items-center">
        <p className="text-sm font-bold ">الحالة</p>
        <p className="text-sm font-bold">البطاقات </p>
        </div>
        <div className="max-h-52 overflow-y-auto my-2"> 
            {chosenCard?.sort((a,b)=> a.isRedeemed -b.isRedeemed).map((card,i) =>(
 <div key={i} className={`bg-white flex justify-between items-center my-1 sm:mx-10 mx-8 px-5 py-4 rounded-md shadow-lg ${card.isRedeemed && 'line-through  opacity-65' } `}>
           <div className="flex items-center gap-2">
          
           {card.cardType === 'VipCard' ?
           ( <><p className={`text-[9px] ${card.isRedeemed?'text-red-600':'text-green-500'}  font-semibold`}>{card.isRedeemed?'مستخدمة':'متاحة'}</p>
            <Crown size={20} color="#dbc900"/></>
            ): <p className='text-[9px] text-green-500  font-semibold'>بطاقة عادية</p>
           }
           </div>
           <div className="flex items-center gap-2">
            <div className="flex items-end flex-col gap-1">
            <p className="text-start text-xs line-clamp-3 w-18">{card.Name}</p>
            <p className="text-start text-xs w-18">{card.serial}</p>
            
            </div>
            
             <img src={card.img} alt={card.Name} className="w-12 h-8 object-cover
             rounded-md" />
           </div>
        
        </div>
       )) 
      }</div>
        </div>
      </TabsContent>
      <TabsContent value="رصيدي">
      <div className=" px-2 py-2 shadow-xl bg-slate-50 rounded-lg  ">
        <div className="text-white z-50 relative bg-gradient-to-r from-cyan-500 to-teal-500 from-20% to-90%  hover:from-cyan-400 hover:to-teal-400 text-center sm:mx-12 mx-8  py-2 rounded-xl  active:from-cyan-600 active:to-teal-600 h-40 shadow-2xl overflow-hidden">
            <img src={circle} alt="cricle" className="-translate-y-4 translate-x-8" />
            <p className="absolute top-4 left-3 text-white font-black text-lg">Marveleza</p>
            <div className="absolute bottom-4 right-3">
                <p className="text-white font-medium text-xs">رصيدك الحالي</p>
                <p className="text-white font-bold text-xl">
              {formatted ||0}</p>
            </div>

        </div>
        <div className=" relative h-12 bg-teal-200 sm:mx-12 mx-8 -translate-y-4 rounded-xl py-2 hover:bg-teal-300 active:bg-teal-200 cursor-pointer  ">
           <ChargeBalance/>
        </div>
        <div className="flex justify-between sm:mx-12 mx-10 items-center">
        <p className="text-sm font-bold ">الرصيد</p>
        <p className="text-sm font-bold">البطاقات </p>
        </div>
        <div className="max-h-52  overflow-y-auto my-2"> 
            {redeemedCard?.map((card,i) =>(
 <div key={i} className="bg-white flex justify-between items-center my-1 sm:mx-10 mx-8 px-5 py-4 rounded-md shadow-lg  ">
            <p className="text-sm text-green-500 font-semibold">+{card.price} $</p>
           <div className="flex items-center gap-2">
             <p className="text-sm line-clamp-3 w-18">{card.Name}</p>
             <img src={card.img} alt={card.Name} className="w-12 h-8 object-cover
             rounded-md" />
           </div>
        
        </div>
       )) 
      }</div>
      
      
        
        </div>
      </TabsContent>
    </Tabs>
    </section>
  )
}
export default VipPanel