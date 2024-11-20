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
import { useReport } from "../store/useReportStore";
  const DeleteTransaction = ({ id }) => {
    const { deleteCard} = useReport();
  const handleDelete = ()=>{
      try {
        deleteCard(id)
      } catch (error) {
        console.log("err in user delete",error);
      }
  }
    return (
      <div dir="rtl">
        <AlertDialog >
          <AlertDialogTrigger>
            حذف المعاملة
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد تماما؟</AlertDialogTitle>
              <AlertDialogDescription>
                لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك نهائيًا
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
  
  export default DeleteTransaction;
  