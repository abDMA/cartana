
import { DataTableDemo } from "./DataTable.jsx";

const AdminUsersShow = ({ users }) => {
 
 

  return (
    <div className="  flex items-center flex-col   ">
      <DataTableDemo users={users}/>
    </div>
  );
};

export default AdminUsersShow;
