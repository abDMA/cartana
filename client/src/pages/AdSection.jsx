import LazyImage from "../components/LazyImage"
import { adsSection } from "../utils/cart.data"

const AdSection = () => {
  return (
    <div className="max-w-5xl mx-auto my-20  px-4 flex flex-col items-center gap-6 ">
        {
            adsSection.map((ad,i)=>(
                <LazyImage radius={'13px'} src={ad.ad} alt="ad" key={i} className="w-full  object-contain flex-1 md:rounded-xl shadow-lg" />

            ))
        }
    </div>
  )
}

export default AdSection