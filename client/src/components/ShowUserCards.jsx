import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
const ShowUserCards = ({chosenCards}) => {
  console.log(chosenCards)
  return (
    <Dialog >
    <DialogTrigger asChild dir='rtl'>
                <button
                disabled={chosenCards?.length <=0}
                   href="/Vip_Dashboard"
                   className="font-medium text-xs px-3 bg-sky-400 mt-1 text-white py-2 rounded-md hover:bg-sky-300 active:bg-sky-400 w-[10rem] disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed"
                 >
                   عرض البطاقات المشتراة
                 </button>
   
   </DialogTrigger>
    <DialogContent >
      <DialogHeader>
        <DialogTitle>
            <p className="text-base sm:w-[23rem]">البطاقات التي تم استلامها</p>
        </DialogTitle>
      </DialogHeader>
        <div className="flex justify-between sm:mx-12 mx-10 items-center">
        <p className="text-sm font-bold ">السعر</p>
        <p className="text-sm font-bold">البطاقات </p>
        </div>
        <div className="max-h-52 overflow-y-auto my-2"> 
            {chosenCards?.map((card,i) =>(
 <div key={i} className={`bg-white flex justify-between items-center my-1 sm:mx-10 mx-8 px-5 py-4 rounded-md shadow-lg ${card.isRedeemed && 'line-through  opacity-65' } `}>
            <p className={`text-sm text-green-500  font-semibold`}>{card.price}$</p>
           <div className="flex items-center gap-2">
            <div className="flex items-end flex-col gap-1">
            <p className="text-start text-xs line-clamp-3 w-18">{card.Name}</p>
            <p className="text-start text-xs w-18">{card.serial}</p>
            
            </div>
            
             <img src={card.img} alt={card.Name} className="w-12 h-8 object-cover
             rounded-md" />
           </div>
        
        </div>
       )) 
      }</div>
      </DialogContent>
    </Dialog>
  )
}

export default ShowUserCards