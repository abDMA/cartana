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
import { CircleAlert, Eye, EyeOff, KeyRound, Mail, UserPen, UserRound } from "lucide-react"
import {useState } from "react"
import { useUsers } from "../store/useUsers"


const  UserEdit = ({id}) => { 
  const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const [userType, setUserType] = useState('')
  const {editUser,loading,error}=useUsers()

const hsndelValueChange = (value)=>{
  setUserType(value)
}
  
 const handleEditUser = (e)=>{
  e.preventDefault()
  try {
      editUser(userName,email,password,userType,id)
    } catch (error) {
  console.log("err in handling edit",error);
  
}    
 }
 
  return (
    <Dialog >
      <DialogTrigger asChild dir='rtl'>
        <h1>
         تعديل الحساب
         </h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل حساب مستخدم</DialogTitle>
          <DialogDescription>
          قم بإجراء تغييرات على هذا الملف الشخصي هنا. انقر فوق حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>
        <div dir="rtl" className="grid gap-4 py-4 bg-slate-400 rounded-md">
        <InputValue value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" placeholder=' إسم المستخدم الجديد' icon={<UserRound color="black" size={20}/>}/>
        <InputValue value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='البريد الإلكتروني الجديد' icon={<Mail color="black" size={20}/>}/>
        <InputValue value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='كلمة السر الجديدة' icon={<KeyRound color="black" size={20}/>} 
        extraIcon={<Eye color="black" size={20}/>}
        extraIcon1={<EyeOff color="black" size={20}/>}/>
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
export default UserEdit