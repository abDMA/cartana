import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGiftCards from "../store/useGiftCards";
import Footer from "./Footer";
import NavBar from "./NavBar";
import GiftCard from "../components/GiftCard";
import { ArrowDownUp, Filter } from "lucide-react";


const GetAllCards = () => {
  

  const { searchedCad, getSearchdData, loading, error } = useGiftCards();
  
  const [sort, setSort] = useState("newest");
  const [filterValue, setfilterValue] = useState(" ");
  useEffect(() => {
    getSearchdData(
      "",
     filterValue,
      sort
    );
  }, [getSearchdData,sort,filterValue]);

  return (
    <>
      <NavBar />
      <section
        dir="rtl"
        className="min-w-full flex items-center gap-2 flex-col lg:px-20 px-4 my-10 "
      >
        <div
          dir="rtl"
          className="w-full  flex items-center justify-between sm:my-10 my-4 xs:px-2"
        >
          <div className="sm:py-4 py-1 sm:border-b-4 border-b-2 border-[#0D94CF] ">
            <h1 className="sm:text-2xl  text-[13px] font-bold flex items-center gap-2">
             البطاقات
            </h1>
          </div>
          <div className="flex items-center sm:gap-2 gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center sm:gap-2 gap-1">
                  <p className="sm:font-bold hover:underline cursor-pointer font-semibold sm:text-sm text-xs ">
                    تصفية
                  </p>
                  <Filter size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>تصفية البطاقات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={filterValue}
                  onValueChange={setfilterValue}
                >
                  
                  <DropdownMenuRadioItem value=" ">
                كل بطاقات 
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="بطاقات ألعاب">
                    بطاقات ألعاب
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="بطاقات متاجر التطبيقات">
                    بطاقات متاجر التطبيقات
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="بطاقات الموبايل والإنترنت">
                    بطاقات الموبايل والإنترنت
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="بطاقات أجهزة التحكم في الألعاب">
                    بطاقات أجهزة التحكم في الألعاب
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="بطاقات الأغاني والأفلام">
                    بطاقات الأغاني والأفلام{" "}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="بطاقات المحافظ الإلكترونية">
                    بطاقات المحافظ الإلكترونية
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="بطاقات هدايا المتاجر">
                    بطاقات هدايا المتاجر{" "}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center sm:gap-2 gap-1">
                  <p className="sm:font-bold hover:underline cursor-pointer font-semibold sm:text-sm text-xs ">
                    ترتيب
                  </p>
                  <ArrowDownUp size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>الترتيب</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  <DropdownMenuRadioItem value="price-high">
                    السعر : من أعلى الى اقل
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="newest">
                    الاحدث
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-low">
                    السعر : من اقل الى اعلى
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div
          dir="rtl"
          className="max-w-5xl mx-auto xss:px-2 px-6   grid xss:grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {loading ? (
            <p className="mx-4">جارٍ تحميل البطاقات ...</p>
          ) : searchedCad?.giftCard?.length <= 0 ? (
            <p className="mx-6">لا يوجد بطاقات متوفرة</p>
          ) : error ? (
            <p className="text-red-600 text-xs ">{error}</p>
          ) : (
            searchedCad?.giftCard
              ?.slice(0, 8)
              .map((card) => (
                <GiftCard
                  card={card}
                  key={card._id}
                  id={card._id}
                  title={card.cardName}
                  img={card.cardImg}
                  price={card.price}
                  alt={card.cardName}
                  available={card.availibilty}
                />
              ))
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default GetAllCards;
