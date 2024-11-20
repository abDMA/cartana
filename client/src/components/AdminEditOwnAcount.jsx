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
import InputValue from "./InputValue"
import { CircleAlert, Eye, EyeOff, KeyRound, Mail, Settings2, UserRound } from "lucide-react"
import {useRef, useState } from "react"
import { useUsers } from "../store/useUsers"
import { defaulUserProfile } from "../assets"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"


const  AdminEditOwnAcount = ({id}) => { 
  const navigate =useNavigate()
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userPicture, setUserPicture] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { logout } = useAuthStore();

  const {editAdmin}=useUsers()


  const filePickerRef = useRef(null);
const selectedImgPicker = (e)=>{
   const reader = new FileReader();
   if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
   };
   reader.onload =(readerEvent) =>{
    setUserPicture(readerEvent.target.result);
   };

};
 const handleEditUser = async()=>{
  setIsLoading(true)
  try {
     await editAdmin(userName,email,password,userPicture,id)
      setIsLoading(false)
      setTimeout(()=>{
        logout()
        navigate("/");
      },5000)
    } catch (error) {
        setError(error.message)
  console.log("err in handling edit",error);
  
} finally{
    setIsLoading(false)
 }   
 } 
 
  return (
    <Dialog >
      <DialogTrigger asChild dir='rtl'>
      <div  className=" flex items-start sm:justify-between justify-center py-2 hover:bg-slate-600 sm:w-32 w-8 px-1 rounded-md cursor-pointer">
            <h5 className=" text-white text-xs sm:block hidden">تعديل الحساب</h5>{" "}
            <Settings2 color="white" size={15} />
          </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle >تعديل حساب مستخدم</DialogTitle>
          <DialogDescription>
          قم بإجراء تغييرات على هذا الملف الشخصي هنا. انقر فوق حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>
        <div dir="rtl" className="grid gap-4 py-4 bg-slate-400 rounded-md">
        <input type="file"  hidden  ref={filePickerRef} onChange={selectedImgPicker} /> 
        <InputValue value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" placeholder=' إسم المستخدم الجديد' icon={<UserRound color="black" size={20}/>}/>
        <InputValue value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='البريد الإلكتروني الجديد' icon={<Mail color="black" size={20}/>}/>
        <InputValue value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='كلمة السر الجديدة' icon={<KeyRound color="black" size={20}/>} 
        extraIcon={<Eye color="black" size={20}/>}
        extraIcon1={<EyeOff color="black" size={20}/>}/>
          <div className="flex items-center gap-2  sm:mx-12 mx-6 my-3">
                      <p className="text-xs font-normal text-white">إختر صورة لحسابك الشخصي</p>
                      <div onClick={() => filePickerRef.current.click()} className="w-8 h-8">
                      <img  src={`${userPicture ? userPicture :defaulUserProfile}`} alt="user  pic" loading="lazy" className="object-contain w-full h-full rounded-full" />
                      </div>
                     </div>
                     {error && <p className='text-white text-sm font-light mt-2 mx-5 flex gap-2 items-center w-[19rem]'>{error}
                     <CircleAlert size={20} color="red" className="mt-[2px]"/></p>}
        </div>
    
        <DialogFooter>
          <Button onClick={handleEditUser}>{isLoading ? 'جارٍ حفظ التغيرات':"حفظ التغيرات"}  </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default AdminEditOwnAcount