import { useState } from "react"

const InputValue = ({type,placeholder,icon,extraIcon,
  extraIcon1,onChange

}) => {
  const [eyeClicked, setEyeClicked] = useState(false)
  return (
    
   <div dir="rtl" className="relative w-full sm:mx-12 mx-10">
   <input onChange={onChange}   type={eyeClicked?'text':type
   } placeholder={placeholder} className=" placeholder:text-black placeholder:text-[12px] w-[75%] px-10 py-2  my-2 focus:ring-teal-400 focus:ring-2 outline-none border-none duration-100 transition-transform inputBg rounded-md text-black text-[12px]"   />
   <div className="absolute top-4 right-2">
    {icon}
   </div>
   <div onClick={()=>setEyeClicked(!eyeClicked)} className="absolute top-4 md:left-24  sm:left-20   x:left-32 xs:left-24 xss:left-20 left-16 ">{eyeClicked?extraIcon:extraIcon1}</div>
  </div>
   
  )
}

export default InputValue