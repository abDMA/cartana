import { create } from "zustand";
import axios from '../lib/axios'
import toast from 'react-hot-toast' 

const ChargBalance = create((set) => ({
    loading:false,
    error:null,
    newBalance:0,
    chargeBalnce:async(serialNumber)=>{
        set({ loading: true });
        try {
            const response = await axios.post('admin/getFunds',{serialNumber})
            set({ loading: false, newBalance:response.data.newBalance });
            toast.success(response.data.message || " فشل في إضافة الرقم التسلسلي ")
        } catch (error) {
            console.log("err in zustand chargeBalne",error);
            toast.error(error.response.data.message || " فشل في إضافة الرقم التسلسلي ")
            set({ loading: false });
           
    }finally{
        set({ loading: false });

    }
}
}))
export default ChargBalance