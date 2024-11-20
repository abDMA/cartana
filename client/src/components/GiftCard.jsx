import { ShoppingCart } from "lucide-react"
import toast from "react-hot-toast"
import LazyImage from "./LazyImage"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { count } from "../utils/recoil"

const GiftCard = ({card,title,img,price,alt,available,id}) => {
  const [counter, setCounter] = useRecoilState(count);
   let storedCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]
  

  
    
const addToCart = (p)=>{
const available = p.serialNumber?.filter(item => item.status === 'available')

    const existingItemIndex = storedCart.find((item)=> item._id === p._id)
    
    if (existingItemIndex) {
      if (existingItemIndex.quantity >= available.length) {
    toast.error('لا يمكنك الاضافة,  لا يوجد الكمية المتوفرة') 
    return
      }
      existingItemIndex.quantity +=1
      toast.success("المنتج موجود بالفعل في سلة التسوق، تم اضافة إلى كمية البطاقة")
    }else{
      storedCart.push({...p,quantity:1})
      toast.success("تمت إضافة المنتج إلى سلة التسوق")
    }
    localStorage.setItem("cartItems",JSON.stringify(storedCart),
    {expires:1})
    setCounter(storedCart?.length)

   }
  
   
    
  return (
    <div  dir="rtl" className="border-[#0000000c] border rounded-xl px-1 py-3 shadow-sm flex items-center flex-col gap-3 ">
      <Link to={`/giftcard/${id}`} className="hover:opacity-90 cursor-pointer ">
       <div className=""> <LazyImage radius={'7px'} src={img} alt={alt} className="object-con rounded-md" /> </div>
         <h2 className="md:text-base text-sm w-full px-2 h-8">{title}</h2>
         <div className="w-full flex items-start px-2 py-2 my-1  ">
         <div className={`rounded-lg px-2 mt-4 py-1  ${available ==='متوفر' ? "bg-green-500" : "bg-red-500"}`}><p className="text-white  sm:text-xs text-[10px] font-normal">{available}</p></div>
         </div>
       </Link>
         <div className=" w-full my-2 flex items-center justify-between px-2">
         <p className=" text-xs md:text-base font-bold ">{price} $</p>
         <div className="px-2 py-2 cursor-pointer rounded-lg bg-[#0D94CF] hover:bg-[#0d95cfb9] active:bg-[#0D94CF]">
          <button className="flex justify-center items-center" disabled={available.trim() !=='متوفر'}  onClick={()=>addToCart(card)}>
         <ShoppingCart  color="white" size={20} cursor={"pointer"} /></button>
         </div>
            </div>
    </div>
  )
}

export default GiftCard