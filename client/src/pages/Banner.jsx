import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.css';
import { Navigation,Autoplay,Pagination } from 'swiper/modules';
import { ad, ad2,  } from '../assets';
import LazyImage from '../components/LazyImage';
 const Banner = () => {
   
  return (
    <section className=' my-10 max-w-[73rem] mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          reverseDirection:true
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper shadow-xl sm:rounded-[20px] rounded-md"
      >
        <SwiperSlide><LazyImage src={ad} alt='ad' loading='lazy' /></SwiperSlide>
        <SwiperSlide><LazyImage src={ad2} alt='ad' loading='lazy' /></SwiperSlide>
        <SwiperSlide><LazyImage src={ad} alt='ad' loading='lazy' /></SwiperSlide>
        <SwiperSlide><LazyImage src={ad2} alt='ad' loading='lazy' /></SwiperSlide>
       
      </Swiper>
    </section>
  )
}
export default Banner