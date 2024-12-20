import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {  CircleCheck, CirclePlus, CircleX, LoaderIcon, Shuffle } from "lucide-react"
import {useEffect, useRef, useState } from "react"
import GiftCardInput from "./GiftCardInput"
import useGiftCards from "../store/useGiftCards"


const  GiftCardEdit = ({giftCards,id}) => { 
const [giftCard, setGiftCard] = useState([])
useEffect(() => {
  setGiftCard(giftCards?.filter((card) => card._id === id)); 
}, [])
const [allSerials, setAllSerials] = useState([])
const [sendedSerials, setSendedSerials] = useState([])
const [cardName, setcardName] = useState('')
const [price, setPrice] = useState('')
const [cardImg, setCardImg] = useState('')
const [cardOverView, setCardOverView] = useState('')
const [serialNumber, setSerialNumber] = useState('')
const [cardType, setCardType] = useState('')
const [cardGenre, setCardGenre] = useState('')
const [stock, setStock] = useState('')
const [category, setCategory] = useState('')
const [availibilty, setAvailibilty] = useState('')
const [errorCard, setErrorCard] = useState(false)
const [isIncludes, setIsIncludes] = useState(false)
const {editGiftCard,loading,error,checkSerialNumber,ValidSerial,checking}=useGiftCards()
  const serial = giftCard[0]?.serialNumber.map((serial)=>serial) || [""]
  const zian = allSerials?.map((num) => num.serial) || []
useEffect(() => {
  setAllSerials(serial)
}, [giftCard])

const generateSerialNumber = (length) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    const SerialNumber = Array.from(array).map((byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, length).toUpperCase()
    return SerialNumber
}

useEffect(() => {
 try {
    checkSerialNumber(serialNumber)

 } catch (error) {
    console.log(error.message);  
 }
  
}, [serialNumber])
useEffect(() => {
    setIsIncludes(allSerials.map(serial=>serial.serial).includes(serialNumber))
}, [allSerials,serialNumber])

 const handleValue = (value)=>{
setCardType(value?value :giftCard[0].cardType)
 }
 const handleValue1 = (value)=>{
  setCardGenre(value?value:giftCard[0].cardGenre)
   }
   const handleValue2 = (value)=>{
    setCategory(value?value:giftCard[0].category)
     }
     const handleValue3 = (value)=>{
      setAvailibilty(value?value:giftCard[0].availibilty)
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
 const handleCreateUser = async (e)=>{
  e.preventDefault()
  try {
    await editGiftCard(id,cardName,price,cardOverView,cardImg,sendedSerials?sendedSerials:zian,cardType,cardGenre,stock,category,availibilty)
    setcardName('')
    setPrice('')
    setCardImg('')
    setCardOverView
    setAllSerials([])
    setSendedSerials([])
    setCardType('')
    setCardGenre('')
    setStock('')
    setCategory('')
    setAvailibilty('')
    } catch (error) {
  console.log("err in creating user",error);
  
}    
 }
 const handleAddSerial = ()=>{
  if(serialNumber.trim() && !allSerials?.includes(serialNumber)){
    setAllSerials([...allSerials,{serial:serialNumber.trim(),status:'available'}])
    setSendedSerials([...zian,serialNumber])
    setSerialNumber('')
  }
}



const removeSerial=(serial)=>{
  setAllSerials(allSerials?.filter((num) => num.serial !== serial));
}

useEffect(() => {
    
  if(allSerials?.length >  Number(stock ? stock :giftCard[0]?.stock)){
   setErrorCard(true)
  }else{
   setErrorCard(false)
  }
 }, [allSerials?.length])


  return (
    <div dir="rtl"   >
      <div
className="sm:max-w-3xl bg-white  h-[90%] px-6 py-6">
        <div>
          <div>
          قم بتعديل البطاقة  هنا. انقر فوق إضافة عند الانتهاء.
          </div>
        </div>
        <div dir="rtl" className="flex  flex-col  py-4 bg-slate-400 rounded-md">
        <input type="file" hidden ref={filePickerRef} onChange={selectedImgPicker} />
       <GiftCardInput value={cardName} title={'إسم البطاقة'}  onChange={(e) => setcardName(e.target.value)} placeholder={`${giftCard[0]?.cardName ? giftCard[0]?.cardName :"اسم البطاقة كاملا"}`}  type="text"/>
       <GiftCardInput value={price}  title={'سعر البطاقة'}  onChange={(e) => setPrice(e.target.value)} placeholder={`${giftCard[0]?.price ? giftCard[0]?.price :"السعر"}`}  type="number"/>
       <GiftCardInput value={stock}  title={'عدد البطاقات '} onChange={(e) => setStock(e.target.value)} placeholder={`${giftCard[0]?.stock ? giftCard[0]?.stock :"عدد البطاقات" }`}  type="number"/>
        <div className="relative">
        <div className="mx-12 text-xs flex items-center gap-2">
    <p>رقم البطاقة</p>
    
<input value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)}  type="text" placeholder={"الرقم التسلسلي للبطاقة"} className={`placeholder:text-black placeholder:text-[12px] w-[75%] px-4 py-2  my-2 focus:ring-teal-400 focus:ring-2 outline-none border-none duration-100 transition-transform inputBg rounded-md text-black text-[12px]"`}   />

</div>
               <div className="absolute top-4 left-14">
                    {(serialNumber?.length >= 2 && checking)?<LoaderIcon  color="black" size={18} className="animate-spin"/> : (ValidSerial || error ||isIncludes) ? <CircleX color="red" size={18}/> : (serialNumber?.length >= 10 && (ValidSerial === false || ValidSerial === null)) ?(
                      <>
                      <CircleCheck color="green" size={18}/>
                     
                     <div onClick={handleAddSerial} 
                     className="absolute top-0 -left-8 cursor-pointer">
                       <CirclePlus  size={18}/>
                     </div>
                     </>
                    ) :
                     <Shuffle onClick={()=>setSerialNumber(generateSerialNumber(10))}  color="red" size={18}/>
                    }
                    </div>
                </div>
      
        <div className="relative my-4 w-[15rem] py-1 h-20 mx-12 flex items-start gap-1 flex-wrap overflow-y-auto ">
          {errorCard &&  <p className="text-xs text-white">عدد الارقام التسلسلية لا يتوافق مع عدد 
            البطاقات المتوفرة حدث رقم المخزون او الارقام التسلسلية</p>}
            {<p className=" w-full text-xs text-white">عدد الارقام التسلسلية :{allSerials.length}</p>}
            {<br/>}
            {
                  allSerials?.map((serial) =>
                       <div key={serial.serial} onClick={()=>removeSerial(serial.serial)} className=" flex  items-center gap-2 ">
                        <div className="relative text-xs rounded-md bg-white hover:bg-slate-100 shadow-sm shadow-slate-100">
                        <p className="text-[9px] px-1 py-1 ">{serial.serial}</p>
                        <CircleX color={`${serial.status === 'available' ? 'green' : 'red'}`} size={12} className="absolute -top-1 left-0 cursor-pointer opacity-75"/>
                        </div>
                        </div>)}
                        
                      
                      
          </div>
        <textarea value={cardOverView} style={{resize:'none'}} onChange={(e) => setCardOverView(e.target.value)} maxLength={400} className="text-black text-sm focus:ring-teal-400 focus:ring-2 outline-none border-none duration-100 transition-transform font-light mx-12 my-2 p-2 h-[100px] bg-white rounded-md" placeholder={`${giftCard[0]?.cardOverView ? giftCard[0]?.cardOverView :"وصف البطاقة"}`}>
        </textarea>
           <div className="flex items-center gap-2  mx-12 my-3">
                      <p className="text-xs font-normal text-white">إختر صورة للبطاقة </p>
                      <div onClick={() => {filePickerRef.current.click()                      

                      }} className="w-8 h-8">
                      <img  src={`${cardImg ? cardImg  :giftCard[0]?.cardImg}`} alt="gift card" loading="lazy" className="object-contain w-full h-full rounded-md" />
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
    
        <div dir="rtl" className="px-2 py-2">
          <Button disabled={loading || error || (!giftCard[0]?.cardOverView && !cardOverView) || allSerials.length !==Number(stock ? stock :giftCard[0]?.stock)} onClick={handleCreateUser}>{loading ? 'جارٍ تعديل البطاقة ':" تعديل بطاقة جدبدة  "}  </Button> <br />
        </div>
      </div>
    </div>
  )
}
export default GiftCardEdit
