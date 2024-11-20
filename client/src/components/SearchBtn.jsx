import {  useState } from 'react';
import { search, searchList } from '../assets'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import useGiftCards from '../store/useGiftCards';
import GiftCard from './GiftCard';
const SearchBtn = () => {
  const [searchData,setSearchData]= useState('')
  const [isOpen, setIsOpen] = useState(false)
  const {searchedCad,getSearchdData,searchLoading} = useGiftCards();


  const handleEnter = (e)=>{
    if (e.key === 'Enter'){
      setIsOpen(true)
     getSearchdData(searchData.length>2 && searchData ,"","")
    }
  }
 
   
  return (
    <>
         <Dialog   className="md:hidden block">
             <DialogTrigger>
             <img onClick={()=>{
               setIsOpen(true)
               getSearchdData(searchData.length>2 && searchData ,"","")
             }} src={search} alt="search" loading="lazy" className="object-contain w-5 md:hidden block cursor-pointer "/>
             </DialogTrigger>
             <DialogContent>
               <DialogHeader>
                 <DialogTitle className="text-center">البحث في موقع كرتانا</DialogTitle>
                 <DialogDescription className={`flex items-center  justify-center flex-col max-h-[30rem] `}>
                 <div className="relative mt-5 " >
              <img onClick={()=>{
               getSearchdData(searchData.length>2 && searchData ,"","")
             }}  src={search} alt="search" loading="lazy" className="w-4 absolute top-3 left-5" />
            <input  onKeyDown={handleEnter} onChange={(e)=>setSearchData(e.target.value)}  dir='rtl'  type="text" placeholder='إبحـــث عن إســـم البـــطاقة ...' className='py-3 mx-2 px-10 text-sm bg-[#F3F8FB] text-black outline-none border-none placeholder:text-xs rounded-md '/>
            </div>
            <p dir='rtl'  className='px-6 mt-3'>نتائج البحث الخاصة بـ <span className='font-bold'>"{searchData}"</span></p>
            <div dir="rtl"  className={`xss:px-2 px-6   gap-4
             grid ${searchedCad?.giftCard?.length <= 3 ? "grid-cols-2" : "grid-cols-3"} flex-wrap items-center  ${searchedCad?.giftCard?.length >= 0 ? "overflow-y-scroll" : "overflow-y-hidden"}  my-4 w-full h-full
            `}>
              
        {
          searchLoading? <p>جارٍ تحميل البطاقات ...</p>: searchedCad?.giftCard?.length <= 0 ? <p>لا يوجد بطاقات متوفرة</p>:
          searchedCad?.giftCard?.map((card)=>(
                <GiftCard id={card._id} key={card._id} title={card.cardName} img={card.cardImg} price={card.price} alt={card.name} available={card.availibilty}/>       
            ))
        } 
       
    </div>
                 </DialogDescription>
               </DialogHeader>
             </DialogContent>
           </Dialog>
           <div className="relative hidden md:block" >
              <img onClick={()=>{
               setIsOpen(true)
               getSearchdData(searchData.length>2 && searchData ,"","")
             }}  src={search} alt="search" loading="lazy" className="w-4 absolute top-3 left-3 cursor-pointer" />
            <input onKeyDown={handleEnter}  onChange={(e)=>setSearchData(e.target.value)}  type="text" placeholder='إبحـــث عن إســـم البـــطاقة ...' className='py-3 mx-2 lg:px-28 px-6 text-sm bg-[#F3F8FB] text-black outline-none border-none placeholder:text-xs  '/>
            <img src={searchList} alt="search list" loading="lazy" className="w-5 absolute top-2 right-3" />
           {  isOpen && <>
             <div onClick={()=>setIsOpen(false)} className='absolute top-16 -right-6 bg-black rounded-full w-5 h-5 z-10 flex items-center justify-center active:bg-red-500 hover:bg-red-300 cursor-pointer'>
              <span className='text-white font-bold text-xs  '>X</span>
              </div>
          <div className={`w-[40rem] h-[30rem] bg-white absolute top-12 -right-12 py-8 px-12 shadow-xl border rounded-md ${searchedCad?.giftCard?.length >= 0 ? "overflow-y-scroll" : "overflow-y-hidden"}`}>
          <p className='px-6 mt-3'>نتائج البحث الخاصة بـ <span className='font-bold'>"{searchData}"</span></p>
            <div dir="rtl" className={`xss:px-2 px-6   gap-4
             grid ${searchedCad?.giftCard?.length <= 3 ? "grid-cols-2" : "grid-cols-3"} flex-wrap items-center    my-4 w-full h-full
            `}>
            
              {
          searchLoading? <p className='mx-4'>جارٍ تحميل البطاقات ...</p>: searchedCad?.giftCard?.length <= 0 ? <p  className='mx-6'>لا يوجد بطاقات متوفرة</p>:
          searchedCad?.giftCard?.slice(0,8).map((_,i)=>(
                <GiftCard key={i} id={_._id} title={_.cardName} img={_.cardImg} price={_.price} alt={_.name} available={_.availibilty}/>       
            ))
        }
            </div>

            </div></>
            }
            </div>
         
          
        

    </>
  )
}

export default SearchBtn