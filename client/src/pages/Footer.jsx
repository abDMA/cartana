import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { footer } from "../assets"

const Footer = () => {
  return (
    <footer className="w-full bg-[#008ECC]   ">
       <div className="max-w-[85rem] mx-auto py-14 
        flex items-center justify-around flex-wrap gap-6 relative ">
           <img src={footer} alt="footer" className="absolute top-0 right-0 w-40 md:w-52 " />
        <div className="text-center z-10 h-20 flex items-center flex-col gap-1 sm:gap-2 ">
          <h1 className="font-bold text-white x:text-base my-1 sm:text-2xl">المساعدة</h1>
          <p className="text-white text-xs">الأسئلة الشائعة</p>
          <p className="text-white text-xs">سياسة الخصوصية</p>
          <p className="text-white text-xs"> تواصل معنا</p>

        </div>
        <div className="text-center z-10 h-20 flex items-center flex-col gap-1 sm:gap-2">
          <h1 className="font-bold text-white x:text-base my-1 sm:text-2xl">منتجاتنا</h1>
          <p className="text-white text-xs">البطاقات الرقمية</p>
          <p className="text-white text-xs">الشراكة مع كرتـانـا</p>
        </div>
        <div className="text-center z-10 h-20 flex items-center flex-col gap-1 sm:gap-2">
          <h1 className="font-bold text-white x:text-base my-1 sm:text-2xl">كرتـانـا</h1>
          <p className="text-white text-xs">عن كرتانا</p>
          <p className="text-white text-xs">مدونة كرتانا</p>
          <p className="text-white text-xs"> انضم للفريق</p>
        </div>
       
      
      
        </div> 
        <div className="w-full flex flex-col items-center justify-center pt-6">
        <h1 className="text-white text-sm z-10 relative">جميع الحقوق محفوظة © كــرتانـا 2024
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