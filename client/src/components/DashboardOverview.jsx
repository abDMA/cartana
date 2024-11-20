import { ChartLine, GalleryHorizontalEnd, Users } from 'lucide-react';
import AddNewUser from './AddNewUser';
import AddNewGiftCard from './AddNewGiftCard';


const DashboardOverview = ({balance,totalUsers,totalCards,role,totalVipCards,vipBalance}) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance)
  const formatted2 = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vipBalance)
    const Dashboartabs = [
        { id: "عدد البطاقات", label: "عدد البطاقات", icon: GalleryHorizontalEnd,Cardcount:totalCards ||0 },
     { id: "عدد المستخدمين", label: " عدد المستخدمين", icon: Users,userCount:totalUsers ||0 },
        { id: "الرصيد", label: "الرصيد", icon: ChartLine,revenue:formatted || 0.00 },
      ];
      const VipDashboartabs = [
        { id: "عدد البطاقات", label: "عدد البطاقات", icon: GalleryHorizontalEnd,Cardcount:totalVipCards ||0 },
        { id: "الرصيد", label: "الرصيد", icon: ChartLine,revenue:formatted || 0.00 },
      ];
  return (
    <div dir="rtl" className="w-full flex items-center flex-col">
         <div className="w-full bg-sky-500 flex items-center justify-between py-12 sm:px-10 px-3">
          <h1 className="text-white text-xl  font-bold">لمحة عامة</h1>
          <div className='flex justify-center items-center  sm:flex-row flex-col sm:gap-3'>
          <AddNewGiftCard/>
          {role ==="admin" && <AddNewUser/>}
          </div>
          
          
        </div>
        <div className=" -translate-y-11 flex items-center justify-center gap-3 flex-wrap">
             {role ==="admin" ?
              Dashboartabs.map((tab)=>(
                <div key={tab.id} className="w-52 py-4 px-3 rounded-md bg-white shadow-xl  ">
                <div className="flex items-center justify-between my-3">
                  <h2 className="text-sm text-black ">{tab.label}</h2>
                  <div className={`px-2 py-2 ${tab.id === 'الرصيد' ?'bg-emerald-200': tab.id ==="عدد المستخدمين"?'bg-red-400':'bg-cyan-300'}  rounded-md`}> <tab.icon  color="white" size={20} /></div>
                 
                </div>
                <h1 className={`text-4xl  font-semibold ${tab.id === 'الرصيد' ? 'text-slate-700 ': 'text-sky-300'}  `}>
                 {tab.id === 'الرصيد'? <div className='flex items-center flex-col gap-4 justify-between'>
                  <h6>{tab.revenue}</h6>
                  <h6 className='text-sm'>
                    <span className='text-xs ml-4'>رصيد العملاء :</span>
                    {formatted2}
                    </h6>
                 </div>  : 
                 tab.id === "عدد البطاقات" ? tab.Cardcount:tab.userCount }
                </h1>
    
              </div>
              )):
              VipDashboartabs.map((tab)=>(
                <div key={tab.id} className="w-52 py-4 px-3 rounded-md bg-white shadow-xl  ">
                <div className="flex items-center justify-between my-3">
                  <h2 className="text-sm text-black ">{tab.label}</h2>
                  <div className={`px-2 py-2 ${tab.id === 'الرصيد' ?'bg-emerald-200':(role === 'admin' && tab.id ==="عدد المستخدمين")?'bg-red-400':'bg-cyan-300'}  rounded-md`}> <tab.icon  color="white" size={20} /></div>
                 
                </div>
                <h1 className={`text-4xl font-semibold ${tab.id === 'الرصيد' ? 'text-slate-700 ': 'text-sky-300'}  `}>
                 {tab.id === 'الرصيد'?  `${tab.revenue}` : 
                 tab.id === "عدد البطاقات" ? tab.Cardcount:tab.userCount }
                </h1>
    
              </div>
              ))
            }
        
        </div>
    </div>
  )
}

export default DashboardOverview