import {
  Bolt,
  GalleryVerticalEnd,
  House,
  LogOut,
  UsersRound,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardOverview from "../components/DashboardOverview";
import AdminUsersShow from "../components/AdminUsersShow";
import AdminCardShow from "../components/AdminCardShow";
import { useUsers } from "../store/useUsers";
import useGiftCards from "../store/useGiftCards";
import AdminEditOwnAcount from "../components/AdminEditOwnAcount";
import Adminanalytics from "../components/Adminanalytics";
import { useReport } from "../store/useReportStore";

const AdminPanel = ({userID,balance}) => {
  const { logout, role  } = useAuthStore();
  const [activeTab, setActiveTab] = useState("اللوحة الرئيسية");
  const {getUsers,users,loading,error,totalUsers} = useUsers()
  const {getAllCardReport,loading:rapLoadin,raports,vipBalance,totalVipBalance} = useReport()
  const {getCards,cards,loading:cardLoading,totalCards,getVipCards, vipCards } = useGiftCards()
 
  
  useEffect(() => {
    getAllCardReport()
  }, [getAllCardReport])
  useEffect(() => {
    vipBalance()
  },[vipBalance])

  useEffect(() => {
    role === 'admin' && getUsers()
  }, [role === 'admin' && getUsers])

  useEffect(() => {
    role === 'admin' ?getCards() : getVipCards()
  }, [getCards])
  



 
  
  
  const navigate = useNavigate();
  const handlLogOut = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };
  useEffect(() => {
    if (role === "regular") {
      navigate("/");
    }
  }, [userID,role]);
  const tabs = [
    { id: "اللوحة الرئيسية", label: "اللوحة الرئيسية", icon: House },
    { id: " عرض المستخدمين", label: " عرض المستخدمين", icon: UsersRound },
    { id: "عرض البـطاقات", label: "عرض البـطاقات", icon: GalleryVerticalEnd },
    { id: 'إحصائيات الموقع', label: 'إحصائيات الموقع', icon: Bolt },
  ];
 
  return (
    <section dir="rtl" className=" h-screen relative  flex items-center overflow-hidden">
      <div className="h-screen sm:max-w-lg max-w-12 bg-slate-800 sticky top-0 right-0  py-4 px-6 flex flex-col justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold my-4 sm:block hidden  ">لوحة التحكم</h1>
          <div className="flex items-center flex-col gap-2  ">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex items-center justify-between gap-2 py-2 hover:bg-slate-600 sm:w-32 w-8 px-1 rounded-md cursor-pointer ${
                  activeTab === tab.id ? "bg-slate-600" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon color="white" size={15} />
                <h5 className=" text-white text-xs sm:block hidden">{tab.label}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex  items-center justify-center flex-col">
        <AdminEditOwnAcount  id={userID} />
          <button
            onClick={handlLogOut}
            className=" flex items-center sm:justify-between justify-center py-2 hover:bg-slate-600 sm:w-32 w-6 px-1 rounded-md cursor-pointer"
          >
            <h5 className=" text-white text-xs sm:block hidden">تسجيل الخروج</h5>{" "}
            <LogOut color="white" size={15} />
          </button>
        </div>
      </div>
      <div className="h-screen flex items-center flex-col flex-1 overflow-y-scroll ">
      <DashboardOverview vipBalance={totalVipBalance} totalVipCards={vipCards?.length} role={role} balance={balance} totalUsers={totalUsers} totalCards={totalCards} />
    { role === 'admin' &&
        activeTab === ' عرض المستخدمين' ? <AdminUsersShow users={users} isLoading={loading}  error ={error}/> : null
       }
       {
        activeTab === 'عرض البـطاقات' ? <AdminCardShow giftCards={ role === 'admin' ? cards :vipCards} isLoading={cardLoading} error={error} /> :null
       }
       {
        activeTab === 'إحصائيات الموقع' ? <Adminanalytics loading={rapLoadin} raport={raports}  /> :null
       }
    </div>
    </section>
  );
};

export default AdminPanel;
