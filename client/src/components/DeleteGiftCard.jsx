import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CircleX } from "lucide-react";
import useGiftCards from "../store/useGiftCards";

const DeleteGiftCard = ({ id }) => {
  const { deleteCard} = useGiftCards();
const handleDelete =async ()=>{
    try {
     await deleteCard(id)
    } catch (error) {
      console.log("err in user delete",error);
    }
}
  return (
    <div dir="rtl">
      <AlertDialog >
        <AlertDialogTrigger>
        حذف البطاقة
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد تماما؟</AlertDialogTitle>
            <AlertDialogDescription>
              لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف البطاقة نهائيًا
              وإزالة بياناتك من خوادمنا.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>متابعة</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteGiftCard;
