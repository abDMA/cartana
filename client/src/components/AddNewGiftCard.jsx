import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CircleCheck, CirclePlus, CircleX, LoaderIcon, Shuffle } from "lucide-react"
import {useEffect, useRef, useState } from "react"
import { defaultGiftCard } from "../assets"
import GiftCardInput from "./GiftCardInput"
import useGiftCards from "../store/useGiftCards"
import toast from "react-hot-toast"


const  AddNewGiftCard = () => { 
const [cardName, setcardName] = useState('')
const [price, setPrice] = useState('')
const [cardImg, setCardImg] = useState('')
const [cardOverView, setCardOverView] = useState('')
const [serialNumber, setSerialNumber] = useState('')
const [allSerials, setAllSerials] = useState([])
const [cardType, setCardType] = useState('')
const [cardGenre, setCardGenre] = useState('')
const [stock, setStock] = useState('')
const [category, setCategory] = useState('')
const [availibilty, setAvailibilty] = useState('')
const [errorCard, setErrorCard] = useState(false)
const {createGiftCard,loading,error,checkSerialNumber,ValidSerial,checking}=useGiftCards()

const generateSerialNumber = (length) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    const SerialNumber = Array.from(array).map((byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, length).toUpperCase()
    return SerialNumber
}
const handleAddSerial = ()=>{
  if(serialNumber.trim() && !allSerials.includes(serialNumber)){
    setAllSerials([...allSerials,serialNumber.trim()])
    setSerialNumber('')
  }
}
const removeSerial=(serial)=>{
  setAllSerials(allSerials.filter((num) => num !== serial));
}

useEffect(() => {
    if (serialNumber?.length >= 10) {
        try {
            checkSerialNumber(serialNumber)
        } catch (error) {
            console.log(error);
            
        }
    }
   
}, [serialNumber])
useEffect(() => {
 if(allSerials.length > stock){
  setErrorCard(true)
 }else{
  setErrorCard(false)
 }
}, [allSerials])

 const handleValue = (value)=>{
setCardType(value)
 }
 const handleValue1 = (value)=>{
  setCardGenre(value)
   }
   const handleValue2 = (value)=>{
    setCategory(value)
     }
     const handleValue3 = (value)=>{
      setAvailibilty(value)
       }
const filePickerRef = useRef(null);
const selectedImgPicker = (e)=>{
   const reader = new FileReader();
   if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
   };
   reader.onload =(readerEvent) =>{
     setCardImg(readerEvent.target.result)
   };

};
 const handleCreateUser = async ()=>{
  try {
    await createGiftCard(cardName,price,cardOverView,cardImg,allSerials,cardType,cardGenre,stock,category,availibilty)
    setcardName('')
    setPrice('')
    setCardImg('')
    setCardOverView
    setCardType('')
    setCardGenre('')
    setStock('')
    setCategory('')
    setAvailibilty('')
    } catch (error) {
  console.log("err in creating user",error);
  toast.error(error.message || 'حدث خطأ ما')
  setcardName('')
  setPrice('')
  setCardImg('')
  setCardOverView
  setCardType('')
  setCardGenre('')
  setStock('')
  setCategory('')
  setAvailibilty('')
}  finally{
  setcardName('')
  setPrice('')
  setCardImg('')
  setCardOverView
  setCardType('')
  setCardGenre('')
  setStock('')
  setCategory('')
  setAvailibilty('')
}  
 }
 
  return (
    <Dialog  >
      <DialogTrigger dir='rtl'>
      <Button className="bg-white text-violet-600 text-[10px] sm:w-auto w-24 sm:text-sm">
          إضافة  بطاقة جدبدة
        </Button>     
     </DialogTrigger>
      <DialogContent className="sm:max-w-3xl overflow-y-scroll h-[90%]">
        <DialogHeader>
          <DialogTitle>إضافة بطاقة جدبدة</DialogTitle>
          <DialogDescription>
          قم بإضافة بطاقة جدبدة هنا. انقر فوق إضافة عند الانتهاء.
          </DialogDescription>
        </DialogHeader>
        <input type="file"  hidden  ref={filePickerRef} onChange={selectedImgPicker} /> 
        <div dir="rtl" className="flex  flex-col  py-4 bg-slate-400 rounded-md">
       <GiftCardInput value={cardName} title={'إسم البطاقة'}  onChange={(e) => setcardName(e.target.value)} placeholder="اسم البطاقة كاملا"  type="text"/>
       <GiftCardInput value={price}  title={'سعر البطاقة'}  onChange={(e) => setPrice(e.target.value)} placeholder="السعر"  type="number"/>
       <GiftCardInput value={stock}  title={'عدد البطاقات '} onChange={(e) => setStock(e.target.value)} placeholder="عدد البطاقات المتوفرة"  type="number"/>
        <div className="relative">
        <div className="mx-12 text-xs flex items-center gap-2">
    <p>رقم البطاقة</p>
<input value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)}  type="text" placeholder="الرقم التسلسلي للبطاقة" className={`uppercase placeholder:text-black placeholder:text-[12px] w-[75%] px-4 py-2  my-2 focus:ring-teal-400 focus:ring-2 outline-none border-none duration-100 transition-transform inputBg rounded-md text-black text-[12px]"`}   />

</div>
                <div className="absolute top-4 left-14">
                    {(serialNumber?.length >= 10 && checking)?<LoaderIcon  color="black" size={18} className="animate-spin"/> : (ValidSerial || error) ? <CircleX color="red" size={18}/> : (serialNumber?.length >= 10 && (ValidSerial === false || ValidSerial === null)) ?(
                      <><CircleCheck color="green" size={18}/>
                     <div onClick={handleAddSerial} className="absolute top-0 -left-8 cursor-pointer">
                       <CirclePlus  size={18}/>
 
                     </div></>
                    ) : <Shuffle onClick={()=>setSerialNumber(generateSerialNumber(10))} color="red" size={18}/>
                    }
                    </div>
                 
        </div>
        <div className="relative my-4 w-[15rem] py-1 h-20 mx-12 flex items-start gap-1 flex-wrap overflow-y-auto ">
          {errorCard &&  <p className="text-xs text-white">عدد الارقام التسلسلية لا يتوافق مع عدد 
            البطاقات المتوفرة حدث رقم المخزون او الارقام التسلسلية</p>}
                    {
                    allSerials.map((serial) =>
                       <div key={serial} onClick={() => removeSerial(serial)} className=" flex  items-center gap-2 ">
                        <div className="relative text-xs rounded-md bg-white hover:bg-slate-100 shadow-sm shadow-slate-100">
                        <p className="text-[9px] px-1 py-1 ">{serial}</p>
                        <CircleX color="red" size={12} className="absolute -top-1 left-0 cursor-pointer opacity-75"/>
                        </div>
                        </div>)}
                      
          </div>
        <textarea value={cardOverView} style={{resize:'none'}} onChange={(e) => setCardOverView(e.target.value)} className="text-black text-sm focus:ring-teal-400 focus:ring-2 outline-none border-none duration-100 transition-transform font-light mx-12 my-2 p-2 h-[100px] bg-white rounded-md" placeholder="وصف البطاقة">
        </textarea>
           <div className="flex items-center gap-2  mx-12 my-3">
                      <p className="text-xs font-normal text-white">إختر صورة للبطاقة </p>
                      <div onClick={() => filePickerRef.current.click()} className="w-8 h-8">
                      <img  src={`${cardImg ? cardImg  :defaultGiftCard}`} alt="gift card" loading="lazy" className="object-contain w-full h-full rounded-md" />
                      </div>
            </div>
     <Select onValueChange={handleValue}> 
      <SelectTrigger className="w-[160px]  mx-2">
        <SelectValue placeholder="إختر نوع البطاقة" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>نوع البطاقة </SelectLabel>
          <SelectItem  value="VipCard"> VIP بطاقة</SelectItem>
          <SelectItem value="reqularCard">بطاقة عادية</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Select onValueChange={handleValue2} > 
      <SelectTrigger className="w-[160px]  mx-2">
        <SelectValue placeholder="  إختر فئة البطاقة " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel> الفئات</SelectLabel>
          <SelectItem  value="بطاقات ألعاب">بطاقات ألعاب</SelectItem>
          <SelectItem value=" بطاقات متاجر التطبيقات "> بطاقات متاجر التطبيقات </SelectItem>
          <SelectItem  value="بطاقات الموبايل والإنترنت ">بطاقات الموبايل والإنترنت </SelectItem>
          <SelectItem value="بطاقات أجهزة التحكم في الألعاب">بطاقات أجهزة التحكم في الألعاب</SelectItem>
          <SelectItem value="بطاقات  الأغاني والأفلام">بطاقات  الأغاني والأفلام</SelectItem>
          <SelectItem value="بطاقات  المحافظ الإلكترونية">بطاقات  المحافظ الإلكترونية</SelectItem>
          <SelectItem value="بطاقات هدايا المتاجر">بطاقات هدايا المتاجر</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Select onValueChange={handleValue1}> 
      <SelectTrigger  className="w-[160px] mx-2">
        <SelectValue placeholder="  إختر شركة البطاقة " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>الشركات</SelectLabel>
          <SelectItem  value="بطاقة جوجل">  بطاقة جوجل</SelectItem>
          <SelectItem value="بطاقة ابل">بطاقة ابل</SelectItem>
          <SelectItem  value="بطاقة امازون"> بطاقة امازون</SelectItem>
          <SelectItem value="بطاقة ببجي">بطاقة ببجي</SelectItem>
          <SelectItem value="بطاقة لودو">بطاقة لودو</SelectItem>
          <SelectItem  value="بطاقة ايتونز"> بطاقة ايتونز</SelectItem>
          <SelectItem value="بطاقة فريفاير">بطاقة فريفاير</SelectItem>
          <SelectItem value="بطاقة نتفلكس">بطاقة نتفلكس</SelectItem>
          <SelectItem  value="stc بطاقة "> stc بطاقة</SelectItem>
          <SelectItem value="بطاقة أخرى">بطاقة أخرى</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Select  onValueChange={handleValue3}> 
      <SelectTrigger className="w-[160px] mx-2">
        <SelectValue placeholder=" البطاقة متوفرة ؟" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem  value="متوفر">متوفر</SelectItem>
          <SelectItem value="غير متوفر">غير متوفر</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
    
        <DialogFooter>
          <Button disabled={loading || error || !allSerials || !price || !cardName  || !cardImg} onClick={handleCreateUser}>{loading ? 'جارٍ إضافة البطاقة ':" إضافة بطاقة جدبدة  "}  </Button> <br />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default AddNewGiftCard
