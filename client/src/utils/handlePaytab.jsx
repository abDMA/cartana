import toast from "react-hot-toast";
import axios from "../lib/axios";
export const handlePaytab = async (cards) => { 
  
    try { 
        const { data } = await axios.post("paytabs/create-checkout-session", { giftCards:cards });
        localStorage.setItem("trace",JSON.stringify(data.trace))
        window.open(data.redirect_url,"_blank","width=800,height=600","resizable=yes,scrollbars=yes");
}
    catch (error) {
        toast.error(error.message || 'حدث خطأ ما');
         console.error("Error during checkout:", error);
  
     } };