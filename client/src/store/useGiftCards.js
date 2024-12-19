import { create } from "zustand";
import axios from '../lib/axios'
import toast from 'react-hot-toast'
//const URL_API = "http://localhost:8000/api/giftCard"

const useGiftCards = create((set) => ({
    search: "",
    cards: [],
    card:{},
    searchedCad:{},
    relatedCard:[],
    vipCards:[],
    totalVipCards:0,
    ValidSerial:false,
    totalCards:0,
    loading: false,
    searchLoading:false,
    checking:false,
    error:null,
    setProducts: (cards) => set({ cards }),
    getCard : async (id) => {
        set({ loading: true });
        try {
            const response = await axios.get(`giftCard/${id}`);
            set({ card: response?.data?.giftCard.card, loading: false, error: null });
        } catch (error) {
            set({ error: error.message || 'حدث خطأ ما', loading: false });
            console.log(error);
        }finally{
            set({ loading: false });
        }
      
    },
    getCards: async () => {
        set({ loading: true });
        try {
         const response = await axios.get(`giftCard/admin_card`);  
            set({ cards: response?.data?.data.giftCard, loading: false,totalCards:response?.data?.data?.pagination?.totalProduct,error: null });
        } catch (error) {
            console.log("err in zustand search",error);
            toast.error(error.message || "فشل في البحث");
            
            set({ error: error.message || 'حدث خطأ ما', loading: false });
        }
     },
     getAllCards:async()=>{
        set({ loading: true });
        try {
         const response = await axios.get(`/giftCard`);  
            set({ cards: response?.data?.data
                , loading: false,error: null });
        } catch (error) {
            console.log("err in zustand search",error);
            set({ error: error.message || 'حدث خطأ ما', loading: false });
        }
     },
     deleteCard: async (id) => {
        set({ loading: true });
        try {
        await axios.delete(`giftCard/${id}`);  
            set({loading: false,error: null });
            toast.success("تم حذف البطاقة بنجاح");
        } catch (error) {
            console.log("err in zustand deleting",error);
            set({ error: error.message || 'حدث خطأ ما', loading: false });
        }
     },
     getSearchdData: async (query,category,sort) => {
        set({ searchLoading: true });
        try {
         const response = await axios.get(`giftCard/?search=${query}&category=${category}&&sort=${sort}`);  
            set({ searchedCad: response?.data?.data, searchLoading: false,error: null });
        } catch (error) {
            console.log("err in zustand search",error);
            set({ error: error.message || 'حدث خطأ ما', searchLoading: false });
        }
     },
     checkSerialNumber:async (serialNumber)=>{
    set({checking:true,error:null,ValidSerial:false})
    try {
         const response = await axios.post(`giftCard/checkSerial`,{serialNumber})         
        set({checking:false,ValidSerial:response?.data?.exists})
    } catch (error) {
        set({error:error.response.data.message})
        console.log('err in check serial number',error);  
    }finally{
        set({checking:false})
    }
     },
     createGiftCard:async(cardName,price,cardOverView,cardImg,serialNumber,cardType,cardGenre,stock,category,availibilty)=>{
    set({loading:true})
    try {
         const response = await axios.post(`giftCard`,{cardName,price,cardOverView,cardImg,serialNumber,cardType,cardGenre,stock,category,availibilty})
         set((prevState) => ({
            cards: [...prevState.cards, response?.data],
            loading:false
        }));
        toast.success('تم انشاء بطاقتك بنجاح')
    } catch (error) {
        set({error:error.response.data.message})
        console.log('err in check creating card',error);  
    }finally{
        set({loading:false})
    }
     },editGiftCard:async(id,cardName,price,cardOverView,cardImg,serialNumber,cardType,cardGenre,stock,category,availibilty)=>{
        set({loading:true,error:null})
        try {
            await axios.patch(`giftCard/${id}`,{cardName,price,cardOverView,cardImg,serialNumber,cardType,cardGenre,stock,category,availibilty})
            toast.success('تم تعديل بطاقتك بنجاح')
            set({loading:false})
        } catch (error) {
            set({error:error.response.data.message})
            console.log('err in check creating card',error);
        }finally{
            set({loading:false})
        }
      },
      getRelatedCard:async (id)=>{
        try {
            const response = await axios.get(`giftCard/related/${id}`)
            set({relatedCard:response?.data?.relatedProduct})
        } catch (error) {
           console.log('err in related card',error);  
        }
   },
   getVipCards:async ()=>{
    try {
        set({loading:true,error:null})
        const response = await axios.get(`giftCard/vipAllCards`)
        set({vipCards:response?.data,totalVipCards:response?.data?.totalVipCards,loading:false})
    } catch (error) {
        console.log('err in vip cards',error);
        
    }
   }
}))
export default useGiftCards
