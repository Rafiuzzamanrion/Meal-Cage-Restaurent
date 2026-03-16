import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  EffectFade,
  Parallax
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

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
  return (
    <section className="relative bg-dark-900 group">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay, EffectFade, Parallax]}
        effect="fade"
        speed={1500}
        parallax={true}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-banner',
          prevEl: '.swiper-button-prev-banner',
        }}
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination-banner',
          bulletClass: 'swiper-custom-bullet',
          bulletActiveClass: 'swiper-custom-bullet-active',
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="h-[85vh] md:h-[95vh] w-full relative"
      >
        {[img1, img2, img3, img4, img5, img6].map((img, index) => (
          <SwiperSlide key={index} className="relative overflow-hidden">
            {/* Dark/Gold Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/30 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/80 z-10"></div>
            
            {/* Background Image with Parallax */}
            <div 
              className="absolute inset-0 w-full h-full scale-110"
              data-swiper-parallax="30%"
            >
               <img className="w-full h-full object-cover origin-center" src={img} alt={`Gourmet experience ${index + 1}`} />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 md:px-20 h-full w-full">
              <div data-swiper-parallax="-300" className="flex flex-col items-center">
                {/* Decorative Line */}
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mb-6 opacity-60"></div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-light mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] leading-tight tracking-tight">
                  Taste the <br className="md:hidden" /><span className="text-primary italic font-light drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">Extraordinary</span>
                </h1>
                
                <p data-swiper-parallax="-200" className="font-sans text-light/70 tracking-[0.3em] uppercase text-xs md:text-sm mb-10 max-w-2xl drop-shadow-md">
                  Where culinary passion meets an unforgettable dining ambiance
                </p>
                
                <Link to='/menu' data-swiper-parallax="-100">
                  <button className="relative group/btn px-10 py-4 overflow-hidden border border-primary/50 bg-dark-900/50 backdrop-blur-sm text-primary font-sans tracking-[0.2em] font-bold uppercase transition-all duration-500 hover:border-primary hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-dark-900">Book a Table / Explore</span>
                    <div className="absolute inset-0 h-full w-0 bg-primary transition-all duration-500 ease-out group-hover/btn:w-full z-0"></div>
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation */}
        <div className="swiper-button-prev-banner absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 border border-white/20 rounded-full flex items-center justify-center text-light cursor-pointer backdrop-blur-md bg-dark-900/30 hover:bg-primary hover:border-primary hover:text-dark-900 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 hidden md:flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        
        <div className="swiper-button-next-banner absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 border border-white/20 rounded-full flex items-center justify-center text-light cursor-pointer backdrop-blur-md bg-dark-900/30 hover:bg-primary hover:border-primary hover:text-dark-900 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 hidden md:flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>

        {/* Custom Pagination */}
        <div className="swiper-pagination-banner absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3"></div>

      </Swiper>

      <style jsx global>{`
        .swiper-custom-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: all 0.4s ease;
          display: block;
        }
        .swiper-custom-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #d4af37;
          box-shadow: 0 0 10px rgba(212,175,55,0.6);
        }
      `}</style>
    </section>
  );
};

export default Banner;
