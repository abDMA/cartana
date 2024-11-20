
const GiftCardInput = ({value,title,onChange,placeholder,type,custom}) => {
  return (
    <div className="mx-12 text-xs flex items-center gap-2">
    <p>{title}</p>
<input  value={value} onChange={onChange} type={type} placeholder={placeholder} className={`${custom} placeholder:text-black placeholder:text-[12px] w-[75%] px-4 py-2  my-2 focus:ring-teal-400 focus:ring-2 outline-none border-none duration-100 transition-transform inputBg rounded-md text-black text-[12px]"`}   />

</div>  )
}

export default GiftCardInput