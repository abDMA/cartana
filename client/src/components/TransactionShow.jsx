import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogFooter } from "./ui/dialog";

const TransactionShow = ({
  sellerName,
  sellerEmail,
  giftCards,
  balance,
  transactionPrice,
  id,time,
  title
}) => {
 
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance);
  const formatted2 = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(transactionPrice);

  // Format the amount as a dollar amount

  return (
    <Dialog>
      <DialogTrigger asChild dir="rtl">
        <h1>{title}</h1>
      </DialogTrigger>
      <DialogContent className="sm:w-[40rem]  x:w-[28rem] xss:w-[20rem] sm:h-[27rem]  h-[90%]">
        <DialogHeader>
          <DialogTitle>عرض المزيد من التفاصيل الخاصة بالمعاملة</DialogTitle>
          <DialogDescription>
              <span className="font-bold text-xs">#{id} </span>: رقم معرف
              المعاملة{" "}
          </DialogDescription>
        </DialogHeader>
        <div dir="rtl" className="flex flex-col  ">
          <div className=" flex items-center gap-1 flex-wrap sm:flex-row flex-col ">
            <div className="sm:flex-1 sm:h-full h-40 px-4 py-2 flex  items-start flex-col gap-2 ">
              <div className="flex items-center gap-2 justify-between w-full">
                <h6 className="text-sm font-medium">إسم البائع</h6>
                <h6 className="text-xs font-bold">{sellerName}</h6>
              </div>
              <div className="flex items-center gap-2 justify-between w-full">
                <h6 className="w-full text-sm font-medium">بريد بائع:</h6>
                <h6 className="text-xs font-bold">{sellerEmail}</h6>
              </div>
              <div className="flex items-center gap-2 justify-between w-full">
                <h6 className="w-full font-medium text-xs">
                  إجمالي سعر المعاملة:{" "}
                </h6>
                <h6 className="text-xs font-bold">{formatted2}</h6>
              </div>
              <div className="flex items-center gap-2 justify-between w-full">
                <h6 className="w-full font-medium text-xs">
                  الرصيد الكلي للبائع :{" "}
                </h6>
                <h6 className="text-xs font-bold">{formatted}</h6>
              </div>
              <div className="flex items-center  justify-between w-full">
                <h6 className="w-full font-medium text-xs">
                  تاربخ المعالة:{" "}
                </h6>
                <h6 className="sm:w-[10rem] x:w-36 xss:w-[11rem] text-xs font-bold">{time}</h6>
              </div>
            </div>
            <div className="flex-1 flex items-center flex-col gap-2 px-2 py-2 border overflow-y-auto h-72 ">
              {giftCards?.map((card) => (
                <div
                  key={card._id}
                  className="w-full border px-1 py-2 flex items-center gap-1"
                >
                  
                  <img
                    src={card?.giftCard?.cardImg}
                    alt="product img"
                    className="w-16 h-12 rounded-md object-cover"
                  />
                  <div className="flex items-center gap-2">
                    <div className="h-10 flex flex-col justify-between">
                      <h6 className="text-xs font-bold">البطاقة</h6>
                      <h6 className="line-clamp-1 text-xs">{card?.giftCard?.cardName}</h6>
                    </div>
                    <div className="h-10 flex flex-col justify-between">
                      <h6 className="text-xs font-bold">السعر</h6>
                      <h6 className="text-sm">{card.price}$</h6>
                    </div>
                    <div className="h-10 flex flex-col justify-between">
                    <h6 className="text-xs font-bold">الكمية</h6>
                      <h6 className="text-sm">{card.quantity}</h6>
                    </div>
                    <div className="h-10 flex flex-col justify-between">
                    <h6 className="text-xs font-bold">الإجمالي</h6>
                    <h6 className="text-sm">{card.price *card.quantity}$</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default TransactionShow;
