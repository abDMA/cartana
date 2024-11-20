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
import InputValue from "./InputValue"
import { CircleAlert, Eye, EyeOff, KeyRound, Mail, UserRound } from "lucide-react"
import {useRef, useState } from "react"
import { useUsers } from "../store/useUsers"
import { defaulUserProfile } from "../assets"


const  AddNewUser = () => { 
const [userName, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [userType, setUserType] = useState('')
const [userPicture, setuserPicture] = useState(null)
const {createUser,loading,error}=useUsers()
const hsndelValueChange = (value)=>{
  setUserType(value)
}
const filePickerRef = useRef(null);
const selectedImgPicker = (e)=>{
   const reader = new FileReader();
   if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
   };
   reader.onload =(readerEvent) =>{
      setuserPicture(readerEvent.target.result);
   };

};
 const handleEditUser = (e)=>{
  e.preventDefault()
  try {
    createUser(userName,email,password,userPicture,userType)
    } catch (error) {
  console.log("err in handling edit",error);
  
}    
 }
 
  return (
    <Dialog key='add new user' >
      <DialogTrigger asChild dir='rtl'>
      <Button className="bg-emerald-400  text-[10px] sm:w-auto w-24 sm:text-sm sm:my-2 my-1">
          إضافة مستخدم جدبد
          </Button>     
     </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل حساب مستخدم</DialogTitle>
          <DialogDescription>
          قم بإجراء تغييرات على هذا الملف الشخصي هنا. انقر فوق حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>
        <input type="file"  hidden  ref={filePickerRef} onChange={selectedImgPicker} /> 
        <div dir="rtl" className="grid gap-4 py-4 bg-slate-400 rounded-md">
        <InputValue value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" placeholder=' إسم المستخدم ' icon={<UserRound color="black" size={20}/>}/>
        <InputValue value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='البريد الإلكتروني ' icon={<Mail color="black" size={20}/>}/>
        <InputValue value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='كلمة السر ' icon={<KeyRound color="black" size={20}/>} 
        extraIcon={<Eye color="black" size={20}/>}
        extraIcon1={<EyeOff color="black" size={20}/>}/>
           <div className="flex items-center gap-2  mx-12 my-3">
                      <p className="text-xs font-normal text-white">إختر صورة لحسابك الشخصي</p>
                      <div onClick={() => filePickerRef.current.click()} className="w-8 h-8">
                      <img  src={`${userPicture ? userPicture :defaulUserProfile}`} alt="user  pic" loading="lazy" className="object-contain w-full h-full rounded-full" />
                      </div>
                     </div>
                     {error && <p className='text-white text-sm font-light mt-2 mx-5 flex gap-2 items-center w-[19rem]'>{error}
                     <CircleAlert size={20} color="red" className="mt-[2px]"/></p>}
    <Select onValueChange={hsndelValueChange}>
      <SelectTrigger className="w-[160px] mx-2">
        <SelectValue placeholder="إختر نوع الحساب" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel> نوع الحساب </SelectLabel>
          <SelectItem  value="VIP">VIP</SelectItem>
          <SelectItem value="regular">regular</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
    
        <DialogFooter>
          <Button onClick={handleEditUser}>{loading ? 'جارٍ حفظ التغيرات':"حفظ التغيرات"}  </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default AddNewUser