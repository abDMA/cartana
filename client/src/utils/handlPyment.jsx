import { loadStripe } from '@stripe/stripe-js';
import axios from '../lib/axios';
 // eslint-disable-next-line no-undef
 const STRIP_PUB_KEY = process.env.STRIPE_PUBL_KEY
 const stripePromise = loadStripe(STRIP_PUB_KEY);
export const handlePayment = async (localCart) => {
    const stripe = await stripePromise;
    const res = await axios.post(`payment/create-checkout-session`,{
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