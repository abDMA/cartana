import { useRef, useState } from "react";
import { Loader, LogOut, MoveLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

import { burgerList, defaulUserProfile, shopingBag, userIcon } from "../assets";
import { sectionData } from "../utils/cart.data";
import BurgerList from "../components/BurgerList";
import SearchBtn from "../components/SearchBtn";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { handlePayment } from "../utils/handlPyment.jsx";
import { useRecoilState } from "recoil";
import { count } from "../utils/recoil.js";

const NavBar = () => {
  const [userPicture, setUserPicture] = useState(null);
  const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useRecoilState(count);
  const navigate = useNavigate()

  const { isLoading, login, error, user, logout, signup, role,isAuthenticated } =
    useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const [selctedValue, setselctedValue] = useState({
    email: "",
    password: "",
    userName: "",
  });
   const localCart =  JSON.parse(localStorage.getItem("cartItems")) || [];

 
  
  

 
  


 const total= localCart?.reduce((sum, item) => sum + item.price * item.quantity, 0)
 const handleCheck =async () => {
  if (!isAuthenticated) navigate('/login')
  setLoading(true)
  try {
    await handlePayment(localCart,isAuthenticated)
    setLoading(false)
  } catch (error) {
    console.log('something happen',error);
    
  }finally{
    setLoading(false)
  }
}
 const deleteItem =async(cartId)=>{
  try {
    const cart =await localCart?.filter(item=> item._id !== cartId)
    localStorage.setItem("cartItems",JSON.stringify(cart))
  toast.success('تم حذف بنجاح')
  location.reload()
  } catch (error) {
    console.log("something happened in deleting",error);}
    
  }
  const filePickerRef = useRef(null);
  const selectedImgPicker = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setUserPicture(readerEvent.target.result);
    };
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(
        selctedValue.userName,
        selctedValue.email,
        selctedValue.password,
        userPicture
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(selctedValue.email, selctedValue.password);
    } catch (error) {
      console.log("err from loggin in", error);
    }
  };

  const handLogout = () => {
    logout();
  };

  return (
    <nav
      dir="rtl"
      className="w-full border-[#00000010] shadow-lg  border-b  backdrop-blur-lg sticky top-0 z-10"
    >
      <div className=" flex items-center justify-between py-4 xl:px-26 lg:px-6 px-3 sticky top-0 left-0 w-full  max-w-[85rem] mx-auto">
        <div className="flex items-center gap-2">
          <BurgerList />
          <Link to={"/"} className="px-2">
            <h1 className="text-3xl text-black font-bold ">كرتـــانــا</h1>
          </Link>
        </div>
        <div
          dir="rtl"
          className="flex-1/2 hidden md:flex justify-between  px-4 rounded-md  bg-[#F3F8FB]  items-center "
        >
          <SearchBtn />
        </div>
        <div className="items-center hidden md:flex ">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex items-center gap-3 ">
                <p className="font-bold hidden lg:block">الأقســام</p>
                <div className="bg-[#F3F8FB] px-2 rounded-md py-3">
                  <img
                    src={burgerList}
                    alt="burger list"
                    loading="lazy"
                    className="w-6 "
                  />
                </div>
              </div>
              <HoverCardContent>
                <div className="flex items-center justify-center flex-col py-2">
                  {sectionData.map((data, i) => (
                    <div
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
                </div>
              </HoverCardContent>
            </HoverCardTrigger>
          </HoverCard>
          <input
            disabled={isLoading}
            type="file"
            hidden
            ref={filePickerRef}
            onChange={selectedImgPicker}
          />
          <HoverCard>
            <HoverCardTrigger>
              <Link
                to={"/cart"}
                className="mx-4 flex items-center border-l border-[#00000060] pl-4"
              >
                <p className="font-bold text-[#000000c0] text-base ">سلّة</p>
                <div className="relative">
                  <img
                    src={shopingBag}
                    alt="shoping bag"
                    loading="lazy"
                    className="inline-block mr-1 hover:text-orange-400  object-contain w-6"
                  />
                  <span
                    className={`absolute -top-1 -left-1  bg-orange-500 text-white rounded-full flex justify-center items-center w-4 h-4 cursor-pointer transition duration-300 ease-in-out text-[10px] ${
                      !localCart?.length  ? "hidden" : ""
                    }`}
                  >
                    {localCart?.length > 0 && localCart?.length}
                  </span>
                </div>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="px-0 w-auto">
              <h2 className="font-bold text-base px-6">
                سلّة المشــتريات <span>({localCart?.length})</span>
              </h2>
              <div className=" my-5 h-40 overflow-y-auto px-6 py-3 border-t border-b border-[#00000018] flex items-center flex-col gap-2 ">
                {localCart?.map((data, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center gap-6 "
                  >
                    <div className="border border-[#00000018] w-24 h-16">
                      <img
                        src={data.cardImg}
                        alt={data.cardName}
                        loading="lazy"
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="w-40">{data.cardName}</p>
                      <p>
                        <span className="text-[#008ECC]">
                          {data.price}${" "}
                        </span>
                        {data.quantity}x
                      </p>
                    </div>
                    <button onClick={()=>deleteItem(data._id)} className="text-base hover:text-red-500 font-bold cursor-pointer text-[#000000b0] ">
                      X
                    </button>
                  </div>
                ))}
              </div>
              <div className=" px-6">
                <h3 className="flex justify-between items-center">
                  <span>إجمالي السعر:</span>{" "}
                  <span className="text-black font-bold ">{total}  USD</span>
                </h3>
              </div>
              <div className="flex items-center flex-col gap-2 mt-4 text-white">
                {/* check out proceed */}
                <button disabled={loading || total === 0} onClick={handleCheck}   className="w-[87%]  py-4 bg-orange-500 hover:bg-orange-400 active:bg-orange-500 flex justify-center items-center  gap-3 ">
                  <span className="text-white text-sm">
                  { loading ? "جارٍ التحقق وإتمام الشراء" : " التحقق و إتمام الشراء"}
                  </span>
                  {loading ? <Loader  size={20}
                    color="white"
                    className="animate-spin"/> :
                  <MoveLeft
                    size={20}
                    color="white"
                    className="animate-bounceHorizantally"
                  />}
                </button>
                {/* view all carts  */}
                <Link to={'/cart'} className="w-[87%]  py-4 border border-orange-500 hover:bg-orange-50 active:bg-orange-500 active:text-white  text-orange-500 text-sm flex justify-center items-center">
                  {" "}
                  عرض جميع مافي السلّة
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>
          {user?.userPicture ? (
            <div
              onClick={() => (!isOpen ? setIsOpen(true) : setIsOpen(false))}
              className="relative cursor-pointer "
            >
              <img
                src={user?.userPicture}
                alt="profile picture"
                className="w-10 h-10 rounded-full"
              />
              {isOpen && (
                <div className=" px-2  shadow-md bg-white absolute top-12 left-0 rounded-md ">
                  <p className="font-bold text-sm px-3 pt-2">{user?.email}</p>
                  <p className="font-medium text-xs px-3 mb-5 ">
                    {user?.userName}@
                  </p>
                  {role !== "regular" && (
                    <a
                      href="/Admin_Dashboard"
                      className="font-medium text-xs px-3 bg-sky-400 mt-3 text-white py-1 rounded-md "
                    >
                      إننقل الى لوحة التحكم
                    </a>
                  )}
                  <div
                    onClick={handLogout}
                    className="flex w-full items-center justify-between  my-3 hover:bg-slate-200 cursor-pointer  py-2 px-4 rounded-md"
                  >
                    <p className="text-xs">تسجيل الخروج</p>
                    <LogOut color="red" size={20} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-sm font-bold text-[#000000c0] ">
              <Link>
                <HoverCard>
                  <HoverCardTrigger>
                    <p className="hover:underline">تسجيل الدخول/</p>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex justify-center items-center flex-col gap-2">
                    <p className="my-2">سجِّل دخولك الى حسابك</p>
                    <form className="flex flex-1 items-center flex-col gap-2">
                      <input
                        disabled={isLoading}
                        onChange={(e) =>
                          setselctedValue({
                            ...selctedValue,
                            email: e.target.value,
                          })
                        }
                        required
                        type="email"
                        placeholder="أضف ايميل حسابك هنا"
                        className="border outline-none px-2 py-1 placeholder:text-xs focus:ring-2 "
                      />
                      <input
                        disabled={isLoading}
                        onChange={(e) =>
                          setselctedValue({
                            ...selctedValue,
                            password: e.target.value,
                          })
                        }
                        required
                        type="password"
                        placeholder="كلمة المرور"
                        className="border outline-none px-2 py-1 placeholder:text-xs focus:ring-2 "
                      />
                      {error && <p className="text-red-600 text-xs">{error}</p>}
                    </form>
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      type="submit"
                      className="flex-1 bg-[#1999D1] px-5 py-2 mt-4 text-white text-xs font-semibold hover:bg-[#199ad1a4] active:bg-[#1999D1]"
                    >
                      {isLoading ? "...جارٍ تسجيل الدخول" : "تسجيل الدخول"}{" "}
                    </Button>
                    <Link
                      to={"/forgot_password"}
                      className="hover:underline text-xs font-semibold mt-4"
                    >
                      هل نسيت كلمة كلمة المرور ؟
                    </Link>
                  </HoverCardContent>
                </HoverCard>
              </Link>
              <Link>
                <HoverCard>
                  <HoverCardTrigger>
                    <p className="hover:underline">حساب جديد</p>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex justify-center items-center flex-col gap-2">
                    <p className="my-2">سجِّل حساب جديد</p>
                    <form className="flex justify-center items-center flex-col gap-2">
                      <input
                        disabled={isLoading}
                        onChange={(e) =>
                          setselctedValue({
                            ...selctedValue,
                            userName: e.target.value,
                          })
                        }
                        required
                        type="text"
                        placeholder="أضف إسم مستخدم الى حسابك هنا"
                        className="border outline-none px-2 py-1 placeholder:text-xs focus:ring-2 "
                      />
                      <input
                        disabled={isLoading}
                        onChange={(e) =>
                          setselctedValue({
                            ...selctedValue,
                            email: e.target.value,
                          })
                        }
                        required
                        type="email"
                        placeholder="أضف يريدك الإلكتروني حسابك هنا"
                        className="border outline-none px-2 py-1 placeholder:text-xs focus:ring-2 "
                      />
                      <input
                        disabled={isLoading}
                        onChange={(e) =>
                          setselctedValue({
                            ...selctedValue,
                            password: e.target.value,
                          })
                        }
                        required
                        type="password"
                        placeholder="كلمة المرور"
                        className="border outline-none px-2 py-1 placeholder:text-xs focus:ring-2 "
                      />
                    </form>
                    <div className="flex items-center gap-2 ml-6">
                      <p className="text-[9px] font-normal">
                        إختر صورة لحسابك الشخصي
                      </p>
                      <button
                        onClick={() => filePickerRef.current.click()}
                        className="w-8 h-8"
                      >
                        <img
                          src={`${
                            userPicture ? userPicture : defaulUserProfile
                          }`}
                          alt="user  pic"
                          loading="lazy"
                          className="object-contain w-full h-full rounded-full"
                        />
                      </button>
                    </div>
                    <button
                      onClick={handleSignUp}
                      className="flex-1 bg-[#1999D1] px-5 py-2 mt-4 text-white text-xs font-semibold hover:bg-[#199ad1a4] active:bg-[#1999D1]"
                    >
                      {isLoading ? "جارٍ تسجيل الحساب" : "تسجيل حساب جديد"}{" "}
                    </button>
                  </HoverCardContent>
                </HoverCard>
              </Link>
              <img
                src={userIcon}
                alt="user icon"
                loading="lazy"
                className="w-6"
              />
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center gap-2">
          <SearchBtn />
          <Link to="/cart" className="relative">
            <img
              src={shopingBag}
              alt="shoping bag"
              loading="lazy"
              className="inline-block mr-1 hover:text-orange-400  object-contain w-6"
            />
            <span
              className={`absolute -top-1 -left-1  bg-orange-500 text-white rounded-full flex justify-center items-center w-4 h-4 cursor-pointer transition duration-300 ease-in-out text-[9.5px] ${
                counter ===0 ? "hidden" : ""
              }`}
            >
              { counter > 0 &&  localCart?.length}
            </span>
          </Link>
          {user?.userPicture ? (
            <div
              onClick={() => (!isOpen ? setIsOpen(true) : setIsOpen(false))}
              className="relative cursor-pointer "
            >
              <img
                src={user?.userPicture}
                alt="profile picture"
                className="w-8 h-8 rounded-full"
              />
              {isOpen && (
                <div className=" px-2  shadow-md bg-white absolute top-12 left-0 rounded-md ">
                  <p className="font-bold text-sm px-3 pt-2">{user?.email}</p>
                  <p className="font-medium text-xs px-3 mb-2 ">{user?.userName}@</p>
                  {role !== "regular" && (
                    <a
                      href="/Admin_Dashboard"
                      className="font-medium text-xs px-3 bg-sky-400 mt-3 text-white py-1 rounded-md "
                    >
                      إننقل الى لوحة التحكم
                    </a>
                  )}
                  <div
                    onClick={handLogout}
                    className="flex w-full items-center justify-between  my-2 hover:bg-slate-200 cursor-pointer  py-2 px-4 rounded-md"
                  >
                    <p className="text-xs">تسجيل الخروج</p>
                    <LogOut color="red" size={20} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <img
              src={userIcon}
              alt="user profile"
              loading="lazy"
              className="object-contain w-6"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
