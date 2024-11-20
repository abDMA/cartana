import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { Button } from "@/components/ui/button"
import { burgerList } from "../assets"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { ChevronLeft, Menu } from "lucide-react"
import { sectionData } from "../utils/cart.data"
import { Link, useNavigate } from "react-router-dom"
import { sectionNames } from "../utils/recoil"
import { useRecoilState } from "recoil"
const BurgerList = () => {
  const [sectionName, setSectionName] = useRecoilState(sectionNames);
  const navigate = useNavigate()
  return (
    <Drawer>
    <DrawerTrigger>
       <img src={burgerList} alt="burger list" className="md:hidden w-6 object-contain" />
       </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="flex items-center gap-4 mb-4">
            <Button  className=" bg-blue-600 text-white"
            >
            <Link to={'/signup'}>حساب الجديد</Link>

            </Button>
            <Button className="bg-white border border-blue-600 text-blue-600">
              <Link to={'/login'}>
              تسجيل الدخول
              </Link>
            </Button>
            <h1 className="font-bold text-sm">مرحبا</h1>
        </DrawerTitle>
        <DrawerDescription >
           <Dialog>
             <DialogTrigger className="w-full flex justify-between items-center active:bg-slate-200">
                <ChevronLeft size={20} color="black"/>
            <div className="flex items-center gap-2 my-3">
                <h1>الأقســام</h1>
            <Menu size={20} color="black"/>
            </div></DialogTrigger>
             <DialogContent>
               <DialogHeader>
                 <DialogTitle>خدمات موقع كرتانا</DialogTitle>
                 <DialogDescription className="flex items-center flex-wrap justify-center py-2">
                 {sectionData.map((data, i) => (
                    <div
                    onClick={()=>{setSectionName(data.sectionName)
                      navigate(`/all-sections`)
                     }}
                      key={i}
                      className="flex w-full items-center justify-between h-10 gap-2 px-2 my-2 hover:bg-slate-200 cursor-pointer rounded-md"
                    >
                      <h1>{data.sectionName}</h1>
                      <div className="py-1 px-1 bg-slate-100 rounded-r-md ">
                        <img
                          src={data.sectionImg}
                          alt={data.sectionName}
                          className="w-6"
                        />
                      </div>
                    </div>
                  ))}
                 </DialogDescription>
               </DialogHeader>
             </DialogContent>
           </Dialog>
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <DrawerClose>
          <Button variant="outline">إلــغاء</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  
  )
}

export default BurgerList