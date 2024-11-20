import { Loader } from "lucide-react"
import { DataTableDemo } from "./AnalyticsTable"
import moment from "moment";


const Adminanalytics = ({raport,loading}) => {  
 const  displayTime = (date)=>  { const now = moment()
   const diff = now.diff(moment(date), 'days');
   if(diff < 1) { 
    return moment(date).fromNow()
   }
   else{
   return moment(date).format('YYYY-MM-DD-HH:mm')
 }
    }

 const data = raport?.map((r)=>(
    {
      id:r.transactionId || '',
      buyerEmail:r.buyer?.email || '',
      buyerName:r.buyer?.userName || '',
      sellerName:r.seller?.userName || '',
      sellerEmail:r.seller?.email || '',
      totalPrice:r.totalPrice || '',
      giftCard:r.giftCards || '',
      balance:r.seller?.balance || '',
      createdAt:displayTime(r.createdAt) || '',
      status:"مكتملة",
    }
  ))
  
  return (
    <div dir="rtl" className="flex items-center flex-col">
      {loading  && <div className="w-full h-full flex items-center justify-center">
        <Loader size={30} className="animate-spin"/>
        </div>
      }
      <DataTableDemo raport={data || []}/> 
    </div> 
 )
}

export default Adminanalytics