import axios from '../lib/axios'
import { create } from 'zustand'
//const URL_API = "http://localhost:8000/api/auth"
axios.defaults.withCredentials = true
export const useAuthStore = create((set) => ({
    user:null,
    role:null,
    isAuthenticated:false,
    isVerified:false,
    isLoading:false,
    error:null,
    isCheckingAuth:false,
    signup: async (userName,email,password,userPicture)=>{
        set({isLoading:true,error:null})
       try {
        const response = await axios.post(`auth/signup`,{userName,
            email,password,userPicture})
            set({user:response?.data?.user,isAuthenticated:true,isLoading:false})
       } catch (error) {
        set({ error: error.response.data.message || "Sign up failed try again later",isLoading:false})        
        throw error
        
       }finally{
        set({isLoading:false})
       }
    },
    verifyEmail: async (code)=>{
        set({isLoading:true,error:null})
       try {
        const response = await axios.post(`auth/verify_email`,{code})
            set({user:response?.data?.user,isAuthenticated:true,isLoading:false})
         
            
    
       } catch (error) {
        set({ error: error.response.data.message || "Sign up failed try again later",isLoading:false})        
        throw error
        
       }finally{
        set({isLoading:false})
       }
    },
    login: async (email,password)=>{
        set({isLoading:true,error:null})
       try {
        const response = await axios.post(`auth/login`,{email,password})
            set({user:response?.data?.user,isAuthenticated:true,isLoading:false,error:response.data.message})
         
    
       } catch (error) {
        set({ error: error.response.data.message || "Log in failed try again later",isLoading:false})
        throw error
        
       }finally{
        set({isLoading:false})
       }
    },logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`auth/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
    forgotPassword: async (email)=>{
        set({isLoading:true,error:null})
       try {
        const response = await axios.post(`auth/forgot_password`,{email})
            set({ message: response.data.message,isLoading:false})
       } catch (error) {
        set({ error: null})        
        throw error
        
       }finally{
        set({isLoading:false})
       }
    },
    checkAuth: async ()=>{
        set({isCheckingAuth:true,error:null})
       try {
        const response = await axios.get(`auth/check-auth`)
            set({user:response.data.user,role:response?.data?.user?.userType,isAuthenticated:true,isCheckingAuth:false})   
       } catch (error) {
        set({ error: null,isCheckingAuth:false})
        throw error
        
       }finally{
        set({isCheckingAuth:false})
       }
    },
    resetPassword:async(token,password)=>{
      set({isLoading:true,error:null})
      try {
        const response = await axios.post(`auth/reset_password/${token}`,{password})
            set({message: response.data.message, isLoading: false })
       } catch (error) { 
        set({ error: null})        
        throw error
        
       }finally{
        set({isLoading:false})
       }
    }


  }))
