import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import img1 from "../../../assets/home/01.jpg";
import img2 from "../../../assets/home/02.jpg";
import img3 from "../../../assets/home/03.png";
import img4 from "../../../assets/home/04.jpg";
import img5 from "../../../assets/home/05.png";
import img6 from "../../../assets/home/06.png";

const Banner = () => {
  const overlay = (
    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-dark-900/80 z-10 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-light mb-4 drop-shadow-2xl translate-y-4 hover:-translate-y-0 transition-transform duration-700">
        Taste the <span className="text-primary italic">Extraordinary</span>
      </h1>
      <p className="font-sans text-light/80 tracking-widest uppercase text-sm md:text-md mb-8 max-w-2xl drop-shadow-md">
        Where culinary passion meets an unforgettable dining ambiance
      </p>
      <button className="px-8 py-3 bg-primary text-dark-900 font-sans tracking-widest font-bold uppercase transition-all duration-300 hover:bg-light hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
        Book a Table
      </button>
    </div>
  );

  return (
    <section>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-[80vh] md:h-[90vh] w-full relative"
      >
        <SwiperSlide className="relative">
          {overlay}
          <img className="w-full h-full object-cover" src={img1} alt="Restaurant interior" />
        </SwiperSlide>
        <SwiperSlide className="relative">
          {overlay}
          <img className="w-full h-full object-cover" src={img2} alt="Gourmet dish" />
        </SwiperSlide>
        <SwiperSlide className="relative">
          {overlay}
          <img className="w-full h-full object-cover" src={img3} alt="Signature drink" />
        </SwiperSlide>
        <SwiperSlide className="relative">
          {overlay}
          <img className="w-full h-full object-cover" src={img4} alt="Dessert spread" />
        </SwiperSlide>
        <SwiperSlide className="relative">
          {overlay}
          <img className="w-full h-full object-cover" src={img5} alt="Chef cooking" />
        </SwiperSlide>
        <SwiperSlide className="relative">
          {overlay}
          <img className="w-full h-full object-cover" src={img6} alt="Restaurant exterior" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
