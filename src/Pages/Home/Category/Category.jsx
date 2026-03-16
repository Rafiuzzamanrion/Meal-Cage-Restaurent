import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import img1 from "../../../assets/menu/salad.jpg";
import img2 from "../../../assets/menu/pizza.jpg";
import img3 from "../../../assets/menu/soup.jpg";
import img4 from "../../../assets/menu/dessert-2.jpg";
import img5 from "../../../assets/menu/salad-2.jpg";

import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";

const Category = () => {
  const categories = [
    { name: "Salads", img: img1, path: "/order/salad", desc: "Fresh & Crisp" },
    { name: "Pizzas", img: img2, path: "/order/pizza", desc: "Wood-Fired" },
    { name: "Soups", img: img3, path: "/order/soup", desc: "Warm & Rich" },
    { name: "Desserts", img: img4, path: "/order/dessert", desc: "Sweet Indulgence" },
    { name: "Drinks", img: img5, path: "/order/drinks", desc: "Signature Mixes" },
  ];

  return (
    <section className="bg-dark-900 py-24 relative">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          heading={"Curated Categories"}
          subHeading={"Order Online from 11:00 am to 10:00 pm"}
        ></SectionTitle>

        <div className="mt-16 relative px-4 md:px-12">
          <Swiper
            slidesPerView={1.2}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 40 },
            }}
            spaceBetween={15}
            navigation={{
              nextEl: '.swiper-button-next-cat',
              prevEl: '.swiper-button-prev-cat',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper !pb-16"
          >
            {categories.map((cat, index) => (
              <SwiperSlide key={index}>
                <Link to={cat.path} className="group block relative overflow-hidden rounded-2xl aspect-[3/4] border border-white/5 bg-dark-800">
                  {/* Image with zoom effect */}
                  <img 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                    src={cat.img} 
                    alt={cat.name} 
                  />
                  
                  {/* Persistent Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
                  
                  {/* Content Container */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    {/* Glassmorphism Info Panel that slides up */}
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col items-center text-center">
                      <div className="w-8 h-[1px] bg-primary mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                      
                      <h3 className="text-3xl md:text-4xl font-serif text-light mb-2 drop-shadow-lg group-hover:text-primary transition-colors duration-300">
                        {cat.name}
                      </h3>
                      
                      <p className="font-sans text-light/70 tracking-widest uppercase text-xs mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                        {cat.desc}
                      </p>
                      
                      {/* Action Button */}
                      <div className="flex items-center gap-2 text-primary font-sans text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-4 group-hover:translate-y-0">
                        <span>Explore</span>
                        <HiArrowLongRight className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="swiper-button-prev-cat absolute left-0 top-[40%] md:top-[45%] -translate-y-1/2 z-30 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-light cursor-pointer backdrop-blur-md bg-dark-900/50 hover:bg-primary hover:border-primary hover:text-dark-900 transition-all duration-300 hidden md:flex shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          
          <div className="swiper-button-next-cat absolute right-0 top-[40%] md:top-[45%] -translate-y-1/2 z-30 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-light cursor-pointer backdrop-blur-md bg-dark-900/50 hover:bg-primary hover:border-primary hover:text-dark-900 transition-all duration-300 hidden md:flex shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
