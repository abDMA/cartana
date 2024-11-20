import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/free-mode';

import './styles.css';
import { FreeMode } from 'swiper/modules';
import { useEffect, useState } from "react";
import LazyImage from "../components/LazyImage";
import { useNavigate } from "react-router-dom";

const PopularCard = ({cards,loading,error}) => {
  const navigate = useNavigate()
  const [isSmallmobile, setIsSmallmobile] = useState(false)
  useEffect(() => { const mediaQuery = window.matchMedia('(min-width: 463px)');  setIsSmallmobile(mediaQuery.matches);  
    const handelerMediaQuery = (event)=>{ setIsSmallmobile(event.matches);
}; 
  mediaQuery.addEventListener('change', handelerMediaQuery) 
  return () => { mediaQuery.removeEventListener('change',handelerMediaQuery); }},[])
  return (
    <div  dir="rtl" className="flex items-center overflow-hidden md:max-w-[55rem] xl:max-w-6xl lg:max-w-5xl sm:max-w-7xl mx-auto gap-2  xs:max-w-xl xss:max-w-sm my-8   ">
      {  loading?<p className="mx-4">جارٍ تحميل البطاقات ...</p>:
        cards?.giftCard?.length <= 0 ? <p className="mx-6">لا يوجد بطاقات متوفرة</p> : error ? <p className="text-red-600 text-xs ">{error}</p>:
  (<> <Swiper
        freeMode={true}
        slidesPerView={isSmallmobile ?3:1.5}
        spaceBetween={7}
        modules={[FreeMode]}
        className="xss:w-[90%] md:hidden block"
  
        >
    
    {
        cards?.giftCard?.slice(0,6)?.map((card)=>(
            <SwiperSlide onClick={()=>navigate(`/giftcard/${card._id}`)}   key={card._id} className="flex flex-col border-2 border-[#0000000e] rounded-xl px-1 py-3 cursor-pointer    "> 
            <div className="w-[90%] h-[40%] ">
               <LazyImage radius={'7px'} src={card.cardImg} alt={card.cardName} className="w-full h-full object-contain " />
           </div>
           <p className="  text-xs h-10 font-semibold px-3 text-start w-full mt-2">{card.cardName}</p>
           <p className="text-sm font-bold px-3  text-start w-full">{card.price} $</p>
           </SwiperSlide>
         ))
    }
   
    
   </Swiper>
   <div className="flex-1 overflow-hidden   md:grid hidden sm:grid-cols-4 lg:grid-cols-5  gap-2 items-center  px-1">
    
       {
       cards?.giftCard?.slice(0,6)?.map((card,i)=>(
           <div key={i} onClick={()=>navigate(`/giftcard/${card._id}`)}  className="xl:w-56 lg:w-48 md:w-[11.5rem] h-48 lg:h-52 flex cursor-pointer items-center flex-col border-2 
           border-[#0000000e] rounded-xl  py-3 "> 
           <div className="x:w-[95%] w-32  h-48 mb-3  ">
              <LazyImage radius={'7px'} src={card.cardImg} alt={card.cardName} className="w-full h-full object-contain rounded-xl" />
          </div>
          
          <p className="  text-xs h-14 font-semibold px-3 text-start w-full">{card.cardName}</p>
          <p className="text-sm font-bold px-3 my-1  text-start w-full">{card.price} $</p>
          </div>
        ))
   }
    
    
   </div></>)
   
   }
   </div>
  )
}

export default PopularCard