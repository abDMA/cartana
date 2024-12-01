import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ChargBalance from "../store/useChargeBlanceStore"
import { useState } from "react"
import { ScanBarcode } from "lucide-react"
import { arrow } from "../assets"
const ChargeBalance = () => {
    const [serialNumber, setSerialNumber] = useState('')
   const {chargeBalnce,loading} = ChargBalance()
    const handelAdd = async()=>{
        try {
         await chargeBalnce(serialNumber)
        } catch (error) {
            console.log("err in handleadd",error.message);
        }
    }
  return (
    <Dialog >
    <DialogTrigger asChild dir='rtl'>
    <div dir="rtl" className="flex justify-around items-center mt-4"> 
             <p className="text-xs text-black font-semibold">
    إشحن بطاقتك الآن</p> 
    <img src={arrow} alt="arrow" loading="lazy" className="object-contain sm:w-4 w-3" />
            </div>
   
   </DialogTrigger>
    <DialogContent >
      <DialogHeader>
        <DialogTitle>
            <p className="text-base sm:w-[23rem]">أضف الرقم التسلسلي الذي تحصلت عليه من شرائك للبطاقة تجده مرسل في بريدك الإلكتروني أو في بطاقاتي</p>
        </DialogTitle>
      </DialogHeader>
      <div dir="rtl" className="relative flex justify-center items-center ">
   <input onChange={(e)=>setSerialNumber(e.target.value)} type="text" placeholder="الرقم التسلسلي"  className=" placeholder:text-[#00000085] placeholder:text-[12px] w-[75%] px-10 py-2  my-2 border focus:ring-teal-400 focus:ring-2 outline-none  duration-100 transition-transform inputBg rounded-md text-black text-[12px]" />
   <div className="absolute top-4 right-[3.5rem]">
    <ScanBarcode size={20}/>
   </div>
  </div>
      <DialogFooter>
          <Button disabled={loading || serialNumber.length<=5} onClick={handelAdd}>{loading ? 'جارٍ إضافة الرقم التسلسلي':"إضافة الرقم التسلسلي"}  </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ChargeBalance