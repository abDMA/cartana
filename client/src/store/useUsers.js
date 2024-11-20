import axios from '../lib/axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'
//const 'admin' = "http://localhost:8000/api/admin"
export const useUsers = create((set) => ({
    users:[],
    totalUsers:0,
    loading:false,
    error:null,
    setProducts: (page) => set({ page }),

    getUsers:async ()=>{
        set({isLoading:true,error:null})
        try {
            const response = await axios.get('admin')
            set({users:response.data?.users,totalUsers:response.data?.total,loading:false})
        } catch (error) {
            set({error:error.response.data.message})
            console.log(error);
        }
    },
    editUser:async (userName,
        email,password,userType,id)=>{
        set({loading:true,error:null})
        try {
             await axios.patch('admin',{
                userName,
            email,password,userType,id
            })
            set({loading:false})
            toast.success('تم التحديث بنجاح')
        } catch (error) {
            set({error:error.response.data.message})
            console.log('err in edit user zustand',error);  
        }
    },
    deleteUser:async (id)=>{
        set({error:null})
        try {
           await axios.delete(`admin/${id}`)
            toast.success('تم حذف المستخدم بنجاج')
        } catch (error) {
            set({error:error.response.data.message})
            console.log('err in deleting user',error);  
        }
    },
    createUser:async (userName,
        email,password,userPicture,userType)=>{
        set({loading:true,error:null})
        try {
             await axios.post('admin',{userName,
                email,password,userPicture,userType})
            set({loading:false})
            toast.success('تم اضافة المستخدم بنجاح')
        } catch (error) {
            set({error:error.response.data.message})
            console.log('err in edit user zustand',error);  
        }
    },
    editAdmin:async(userName,email,password,userPicture,id)=>{
        try {
             await axios.patch(`admin/${id}`,{
                userName,email,password,userPicture
            })
            toast.success('تم التحديث بنجاح')
        } catch (error) {
            set({error:error.response.data.message})
            console.log('err in edit user zustand',error);  
        }
    },


}))
