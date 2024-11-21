import NavBar from './NavBar'
import Footer from './Footer'

const AllWebsiteProperty = ({title,Icon,description}) => {
  return (
    <>
    <NavBar/>
    <section
        dir="rtl"
        className="min-w-full flex items-center gap-2 flex-col lg:px-20 px-4 my-10 "
      >
        <div className="flex justify-center items-center flex-col">
            <div className="px-8 py-8 rounded-full bg-[#3fabd970]">
            <Icon size={70} color="black" className=""/>
            </div>
            <h1 className="my-5 text-center sm:text-2xl font-bold">
           {title}
            </h1>
        </div>
        <div
          dir="rtl"
          className="w-full  flex items-center justify-between sm:my-10 my-4 xs:px-2"
        >
             <div>
                <h6 className="font-medium my-3">نسخة 1.0 بتاريخ 21/11/2024</h6>
                <div>
      {description}
    </div>
             </div>
        </div>
       

      </section>
      <Footer/>
      </>
  )
}

export default AllWebsiteProperty