import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";
import axios from '../lib/axios'
// eslint-disable-next-line no-undef
const PAYPAL_CLIENT_KEY = process.env.PAYPAL_CLIENT_ID

const Paypal = () => {
  const localCart =  JSON.parse(localStorage.getItem("cartItem")) || [];
  const localCarts = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log(localCart,localCarts);
  
    const initialOptions = {
        "client-id": PAYPAL_CLIENT_KEY,
        currency: "USD",
        intent: "capture",
      };
      const onCreateOrder = async () => {
        await axios.post('/paypal/test',{giftCards:localCart.length>=1?localCart:localCarts})
        try {
            const response = await axios.post('/paypal/create-purshase',{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    return response.data?.url

        } catch (error) {
            console.log(error.message)
            
        }
    }
    const onError = (error) => {
        console.log("onError",error);
//         localStorage.removeItem("cartItem");
//         localStorage.removeItem("cartItems");
// toast.error('حدث خطأ ما أثناء عملية الدفع')     
// setTimeout(() => {
//   location.reload()
// }, 3000); 
};
      const onCancel = () => {
        window.location.assign('/purchase-cancel')
        localStorage.removeItem("cartItem");
        localStorage.removeItem("cartItems");

      };

      const onApproveOrder = async(data) => {
        window.location.assign('/purchase-success')
        localStorage.removeItem("cartItem");
        localStorage.removeItem("cartItems");
        try {
         await axios.post('paypal/complete-order',{token:data.orderID})
        } catch (error) {
          toast.error(error.message)
        }
      
      }
      
  return (
    <div className='flex justify-center items-center min-h-screen'>
 <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons 
                    disabled={!localCart || !localCarts}
                        style={{ layout: "vertical" }}
                        createOrder={onCreateOrder}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                        onError={onError}
                        onCancel={onCancel}
                    />
                    </PayPalScriptProvider>
    </div>
  )
}

export default Paypal
