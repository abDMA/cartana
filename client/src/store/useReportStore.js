import axios from "../lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
//const URL_API = 'http://localhost:8000/api/admin/admin-report'
export const useReport = create((set) => ({
    loading:false,
    error:null,
    reports:[],
    vipTransactions:[],
    totalVipBalance:0,

    getAllCardReport:async ()=>{
        set({loading:true})
        try {
            const response = await axios.get(`admin/admin-report`)
            set({raports:response?.data,loading:false})
        } catch (error) {
            console.log("err in getting raports",error.message);
            set({error:error.response.data.message})
            
        }finally{
            set({loading:false})
        }
    },
    deleteCard :async(id)=>{
        set({loading:true})
        try {
            await axios.delete(`admin/delete-report/${id}`)
            set({loading:false})
            toast.success('تم حذف المعاملة بنجاح')
            setTimeout(()=>{
                location.reload()
            },3000)
        } catch (error) {
            console.log("err in delete report",error); 
        }finally{
            set({loading:false})
        }

    },
    vipBalance:async()=>{
        try {
            const response = await axios.get(`admin/vip-balance`)
            set({totalVipBalance:response?.data?.vipBalance})
        } catch (error) {
            console.log("err in vip balnce",error.message);
        }

    },
    getVipTransactions:async(id)=>{
        try {
            const response = await axios.get(`admin/vip-transactions/${id}`)
            set({vipTransactions:response?.data})
        } catch (error) {
            console.error("Error getting VIP transactions", error.message);
        }
    }
    
}))