import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import NavBar from './NavBar'
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import {  useNavigate } from 'react-router-dom';
import { handlePaytab } from '../utils/handlePaytab';

const ShopingCart = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
 

  const {isAuthenticated} = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
   localCart
  }, [localStorage])
  
useEffect(() => {
  localCart?.map((card)=>(
setData(card)
  ))
},[])
const [counter, setCounter] = useState(data?.quantity || 1)
const total= localCart?.reduce((sum, item) => sum + item.price * item.quantity, 0)
const handleCheck =async () => {
  if (!isAuthenticated) navigate('/login')
  setLoading(true)
  try {
    await handlePaytab(localCart)
    setLoading(false)
  } catch (error) {
    console.log(error.message);
    
    toast.error('حدث خطأ ما اثناء الدفع');


    
  }finally{
    setLoading(false)
  }
}
let storedCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]
useEffect(() => {
  storedCart
  
}, [])
const saveCart = (cart)=>{
localStorage.setItem("cartItems",JSON.stringify(cart))
}
const deleteItem =async(cartId)=>{
  try {
    const cart =await storedCart?.filter(item=> item._id !== cartId)
  saveCart(cart)
  toast.success('تم حذف بنجاح')
  location.reload()
  } catch (error) {
    console.log("something happened in deleting",error);
    
  }
  
}
const increaseQuntity = (cartId)=>{
  let cart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]
  const stopInc = cart.find(item=> item._id === cartId).serialNumber.filter(item => item.status === 'available')
  
  if (stopInc.length <= data?.quantity) {
    toast.error('لا يمكنك الاضافة لان لا يوجد الكمية المتوفرة') 
  return
  }
  setCounter(++data.quantity)
  const index = cart?.findIndex(item=> item._id === cartId)
  if(index !==-1){
    cart[index].quantity +=1
    saveCart(cart)
  }

}
const decreaseQuntity = (cartId)=>{
  setCounter(--data.quantity)
  let cart = storedCart
  const index = cart?.findIndex(item=> item._id === cartId)
  const stopInc = cart.find(item=> item._id === cartId).serialNumber.filter(item => item.status === 'available')
  

  if(index !==-1 && cart[index].quantity >1){
    cart[index].quantity -=1
    saveCart(cart)
  }else if(index !==-1){
deleteItem(cartId)
  }
}

  return (
   <>
   <NavBar />
  <section dir="rtl" className='sm:mt-20 sm:px-20  cartItemsPad  mt-36 flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-10'>
  <div className='flex-1' >
{	!localCart? <p>لا يوجد منتجات في السلة</p> : 
			localCart.map((data)=>(  <div key={data._id}>
        <p className='py-2'>{data?.cardName}</p>
        <div className='flex items-center gap-5'>
             <img  src={data.cardImg} alt="porduct1" className='w-32 rounded-lg' />
        <div className='flex flex-col'>
            <span>{data?.price}$</span>
            <button onClick={()=>deleteItem(data._id)}  className='text-red-500 cursor-buttonointer hover:text-red-300 active:text-red-500' >حذف</button>
        </div>
        <div className='flex items-center gap-2'>
        <button disabled={data.quantity<=1} className={`${data.quantity ==1 ? 'border-gray-400':'border-orange-400'} w-10 h-10 flex justify-center items-center  border-2 rounded-xl text-gray-500 text-2xl`} onClick={()=>decreaseQuntity(data._id)}>-</button> 
          {data?.quantity}
            <button   onClick={()=>{increaseQuntity(data._id)}} className='w-10 h-10 flex justify-center items-center border-orange-500 border-2 rounded-xl text-black text-2xl'>+</button>
         
          
        </div>
        
        </div>
       
    </div>))
		}
    </div>
     <div className='border payScreen border-[#0004] flex-[0.5] px-3 py-3 rounded-xl sm:w-auto  '>
		<div className='my-6 flex justify-between items-center'>الإجمالي : {data.price &&<p className='text-2xl mb-10 font-bold' >{total } $</p>}
		</div>
		<p className='text-xs flex items-center justify-between'>المبلغ الإجمالي ( منتجات{(localCart?.length || 0)}) :
       {(data?.price) && <span className='text-base ml-3'>
      {total} $</span>}</p>
		<Button disabled={loading || total === 0} onClick={handleCheck}   className={`w-full bg-orange-500 text-white py-2 rounded-lg mt-6 ${data?.quantity ==0 ? 'cursor-not-allowed':'active:bg-orange-300 hover:bg-orange-400' }`}>  {loading ?"جارٍ الدفع":"إدفع الآن"}</Button>
		

     </div>
   </section>
   </>
  )
}

export default ShopingCart