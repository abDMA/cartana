import { Link } from "react-router-dom"
import { arrow } from "../assets"

const Breaker = ({title,link}) => {
  return (
    <div dir="rtl" className='sm:max-w-6xl mx-auto flex items-center justify-between sm:my-10 my-4 xs:px-2'>
        <div className="sm:py-4 py-1 sm:border-b-4 border-b-2 border-[#0D94CF] ">
            <h1 className="sm:text-2xl  text-[13px] font-bold flex items-center gap-2">
           <span>{title}</span> 
                <span className='text-[#0D94CF] font-bold ml-6 '>كـــرتـــانــا</span>
                </h1>
        </div>
        <Link to={link} className="flex items-center sm:gap-2 gap-1">
        <p className="sm:font-bold hover:underline cursor-pointer font-semibold sm:text-sm text-xs ">تصفح المزيد</p>
            <img src={arrow} alt="arrow" loading="lazy" className="object-contain sm:w-auto w-3" />
           
        </Link>
        
    </div>
  )
}

export default Breaker