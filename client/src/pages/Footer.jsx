import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { footer } from "../assets"
import { activeTab } from "../utils/recoil";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";

const Footer = () => {
  const [active, setActive] = useRecoilState(activeTab);
 
  return (
    <footer className="w-full bg-[#008ECC]   ">
       <div className="max-w-[85rem] mx-auto py-14 
        flex items-center justify-around flex-wrap gap-6 relative ">
           <img src={footer} alt="footer" className="absolute top-0 right-0 w-40 md:w-52 " />
        <div className="text-center z-10 h-20 flex items-center flex-col gap-1 sm:gap-2 ">
          <h1 className="font-bold text-white x:text-base my-1 sm:text-2xl">المساعدة</h1>
          <Link to={'/why-choose-us'} onClick={()=>{
           window.scrollTo({
    top:0,
    behavior:'smooth'
  })
            }} className="text-white text-xs hover:underline cursor-pointer">Why Choose Marveleza ?</Link>
          <Link to={'/policies'} onClick={()=>{
            window.scrollTo({
    top:0,
    behavior:'smooth'
  })
          }} className="text-white text-xs hover:underline cursor-pointer">Rules and Policies</Link>
           <Link to={'/contact'} onClick={()=>{
            window.scrollTo({
    top:0,
    behavior:'smooth'
  })
          }} className="text-white text-xs hover:underline cursor-pointer">Contact Information</Link>

        </div>
        <div className="text-center z-10 h-20 flex items-center flex-col gap-1 sm:gap-2">
          <h1 className="font-bold text-white x:text-base my-1 sm:text-2xl">منتجاتنا</h1>
          <a href="/all-cards"  className="text-white text-xs hover:underline cursor-pointer">البطاقات الرقمية</a>
          <Link to={'/products-and-services'} onClick={()=>{
            window.scrollTo({
    top:0,
    behavior:'smooth'
  })
          }} className="text-white text-xs hover:underline cursor-pointer">Products and Srvices</Link>
        </div>
        <div className="text-center z-10 h-20 flex items-center flex-col gap-1 sm:gap-2">
          <h1 className="font-bold text-white x:text-base my-1 sm:text-2xl">Marveleza</h1>
          <Link to={'/about-us'} onClick={()=>{
            window.scrollTo({
    top:0,
    behavior:'smooth'
  })
          }} className="text-white text-xs hover:underline cursor-pointer">About Marveleza</Link>
        </div>
       
      
      
        </div> 
        <div className="w-full flex flex-col items-center justify-center pt-6">
        <h1 dir="rtl" className="text-white text-sm z-10 relative">  
          جميع الحقوق محفوطة © Marveleza 2024 
        </h1>
        <div className="w-full flex items-center justify-center gap-8 my-6 z-10">
        <Facebook color="white" size={30}/>
        <Instagram color="white" size={30}/>
        <Linkedin color="white" size={30}/>
        <Twitter color="white"  size={30}/>
        </div>
        </div>
    </footer>
  )
}

export default Footer