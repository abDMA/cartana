
import { useState } from 'react';

const CartItem = ({data}) => {
    const [counter, setCounter] = useState(data.quantity)
    
    

  return (
    <div>
        <p className='py-2'>{data?.cardName}</p>
        <div className='flex items-center gap-5'>
             <img  src={data.cardImg} alt="porduct1" className='w-32 rounded-lg' />
        <div>
            <span>{data?.price}$</span>
            <p   className='text-red-500 cursor-pointer hover:text-red-300 active:text-red-500' >حذف</p>
        </div>
        <div className='flex items-center gap-2'>
        <button disabled={data.quantity<=1} className={`${data.quantity ==1 ? 'border-gray-400':'border-orange-400'} w-10 h-10 flex justify-center items-center  border-2 rounded-xl text-gray-500 text-2xl`} onClick={()=>setCounter(--data.quantity)}>-</button> 
          {counter}
            <button  onClick={()=>setCounter(++data.quantity)} className='w-10 h-10 flex justify-center items-center border-orange-500 border-2 rounded-xl text-black text-2xl'>+</button>
         
          
        </div>
        
        </div>
       
    </div>
  )
}

export default CartItem