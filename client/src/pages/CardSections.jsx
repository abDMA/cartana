import {  sectionData } from "../utils/cart.data"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/free-mode';
import './styles.css';
import { FreeMode,Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { sectionNames } from "../utils/recoil";
import { useNavigate } from "react-router-dom";
const CardSections = () => {
  const [sectionName, setSectionName] = useRecoilState(sectionNames);
  const navigate = useNavigate()
  const [isSmallmobile, setIsSmallmobile] = useState(false)
  const [isLaptop, setisLaptop] = useState(false)
  useEffect(() => { 
    const mediaQuery = window.matchMedia('(min-width: 480px)');  
    const mediaQuery2 = window.matchMedia('(min-width: 1020px)');  
    setisLaptop(mediaQuery2.matches)
    setIsSmallmobile(mediaQuery.matches);  
    const handelerMediaQuery = (event)=>{ setIsSmallmobile(event.matches);}; 
    const handelerMediaQuery2 = (event)=>{ setisLaptop(event.matches);}; 
  mediaQuery.addEventListener('change', handelerMediaQuery) 
  mediaQuery2.addEventListener('change', handelerMediaQuery2) 
  return () => {
     mediaQuery.removeEventListener('change',handelerMediaQuery)
     mediaQuery2.removeEventListener('change',handelerMediaQuery2); }},[])
  return (
    <div  dir="rtl" className="flex items-center overflow-hidden md:max-w-[57rem] xl:max-w-6xl lg:max-w-5xl sm:max-w-7xl mx-auto gap-2  xs:max-w-xl xss:max-w-sm my-8   ">
    <Swiper
         freeMode={true}
         slidesPerView={isLaptop ?7:isSmallmobile?4.5:2.5}
         navigation={isSmallmobile}
         modules={[FreeMode,Navigation]}
         className="xss:w-[90%] lg:w-full"
         >
     
     {
          sectionData.map((card,i)=>(
             <SwiperSlide onClick={()=>{setSectionName(card.sectionName)
              navigate(`/all-sections`)
             }}  key={i} className="flex justify-center flex-col items-center cursor-pointer  px-1 py-3  "> 
             <div className=" xs:w-32 xs:h-32 xss:w-28 xss:h-28  x:w-20 x:h-20 rounded-full w-20 h-20   ">
                <img style={{height:"100%",width:"100%" ,borderRadius:"100%",objectFit:"cover"}} src={card.sectionImg} alt={card.sectionName} className="w-full h-full rounded-full object-cover" />
            </div>
            <p className="  text-xs h-10 font-bold px-3 text-center w-full mt-2">{card.sectionName}</p>
            </SwiperSlide>
          ))
     }
    
     
    </Swiper>
    </div>
  )
}

export default CardSections