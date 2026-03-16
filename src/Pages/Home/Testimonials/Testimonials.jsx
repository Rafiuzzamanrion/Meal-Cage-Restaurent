import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/review`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className="bg-dark-900 py-24 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          heading={"Reviews"}
          subHeading={"What our clients say"}
        ></SectionTitle>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          className="mySwiper mt-16 !pb-16"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id} style={{ width: '100%', maxWidth: '750px' }}>
              <div className="mx-4 md:mx-auto h-[400px] flex flex-col items-center justify-center bg-dark-800/80 backdrop-blur-xl border border-white/10 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.8)] p-10 md:p-14 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
                
                {/* Decorative Quotes */}
                <FaQuoteLeft className="absolute top-8 left-8 text-5xl text-primary/10 group-hover:text-primary/20 transition-colors duration-500 -rotate-12" />
                <FaQuoteRight className="absolute bottom-10 right-8 text-7xl text-primary/5 group-hover:text-primary/10 transition-colors duration-500 rotate-12" />

                {/* Rating Stars */}
                <div className="bg-dark-900/50 px-6 py-2 rounded-full border border-white/5 mb-8 shadow-inner">
                  <Rating
                    style={{ maxWidth: 160 }}
                    value={review.rating}
                    readOnly
                    className="z-10"
                  />
                </div>
                
                {/* Review Text */}
                <p className="text-light/80 font-serif text-center text-base md:text-xl leading-relaxed tracking-wide italic max-w-2xl z-10 mb-10 line-clamp-4">
                  "{review.details}"
                </p>
                
                {/* Author Name */}
                <div className="flex flex-col items-center z-10 relative">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mb-4"></div>
                  <h3 className="text-2xl md:text-3xl text-primary font-serif tracking-widest uppercase mb-1">
                    {review.name}
                  </h3>
                  <span className="text-xs text-light/40 uppercase tracking-[0.3em] font-sans">Verified Guest</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Custom Styles overrides for Swiper */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #d4af37 !important;
          background: rgba(20,20,20,0.8);
          backdrop-filter: blur(8px);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          border: 1px solid rgba(212,175,55,0.2);
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: rgba(212,175,55,0.1);
          border-color: rgba(212,175,55,0.5);
          transform: scale(1.1);
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 20px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet {
          background: #aaa !important;
          opacity: 0.3 !important;
        }
        .swiper-pagination-bullet-active {
          background: #d4af37 !important;
          opacity: 1 !important;
          box-shadow: 0 0 10px rgba(212,175,55,0.5);
        }
        @media (max-width: 768px) {
          .swiper-button-next, .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
