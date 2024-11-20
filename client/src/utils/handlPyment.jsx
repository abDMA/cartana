import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe('pk_test_51QKf4IB63K71OfV1x710tIAhDKNw1lJVNaeOemyJXvnQMl8SZkp7r9lOyBXu9iIJeH2i6cwt0IZt9l859gcHLMqP00iAf37Z73');
 const URL_API = "http://localhost:8000/api/payment/create-checkout-session"
export const handlePayment = async (localCart) => {
    const stripe = await stripePromise;
    const res = await axios.post(`${URL_API}`,{
       giftCards:localCart
     });
    const session = res.data;
    const result = await stripe.redirectToCheckout({
     sessionId: session.id,
     
    });
    if (result.error) {
      console.error("Error:", result.error);
    }
 

 

 
 };