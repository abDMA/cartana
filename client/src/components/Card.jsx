import { ShoppingCart } from "lucide-react"
//import { useCartStore } from "../store/useCartStore";
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useCookie from "../store/useCookie"


const Card = ({product}) => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const storedCart = Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) :[]
    setCartItems(storedCart)
    }, [])
  
const addToCart = (p)=>{
  let updatedCart = [...cartItems]
    const existingItemIndex = updatedCart.find((item)=> item._id === p._id)
    
    if (existingItemIndex) {
      existingItemIndex.quantity +=1
      toast.success("Product already in the cart,  quantity added to cart")
    }else{
      updatedCart.push({...p,quantity:1})
      toast.success("Product added to cart")
    }
    Cookies.set("cartItems",JSON.stringify(updatedCart),{expires:1})
    useCookie.setState({cart:updatedCart})
 }



 
 

  return (
    <div dir="rtl" className=" px-3 py-6 ">
        <div className="border rounded-xl w-52 overflow-hidden ">
        <img src={product.picture} alt="product1" className="w-full"/>
        <div className="px-4 py-4">
        <h6 className="text-sm ">
             {product.title}
        </h6>
        <p className="bg-green-700 w-20 py-1 px-3 mt-2  rounded-xl text-white text-xs font-medium">متوفر حاليا</p>
        </div>
    
        <div className="flex justify-between items-center px-4 py-2">
           <span>{product.price}$</span> 
           <div onClick={()=>addToCart(product)} className="px-2 py-2 cursor-pointer rounded-lg bg-orange-500">   <ShoppingCart color="white"  />
           </div>
        </div>
        </div>
       
    
        
    </div>
  )
}

export default Card