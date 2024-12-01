import { atom } from "recoil";
const localCart =  JSON.parse(localStorage.getItem("cartItems")) || [];
export const count = atom({
  key: 'count',
  default:localCart ? localCart?.length :0, 
});
export const sectionNames = atom({
  key: 'sectionName',
  default:'', 
});
export const activeTab = atom({
  key: 'activeTab',
  default:'', 
});
