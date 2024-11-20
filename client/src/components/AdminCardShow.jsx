
import { useEffect, useState } from "react";
import { DataTableDemo } from "./CardDataTable.jsx";

const AdminCardShow = ({ giftCards }) => {
 const [card, setCard] = useState([])
 useEffect(() => {
  giftCards && setCard(giftCards?.map((item)=>item))
 }, [])
 

  return (
    <div className="flex items-center flex-col ">
              <DataTableDemo card={card}  giftCards={giftCards}/>
    </div>
  );
};

export default AdminCardShow;
