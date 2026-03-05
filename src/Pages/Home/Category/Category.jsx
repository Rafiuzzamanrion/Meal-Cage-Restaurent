import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import img1 from "../../../assets/menu/salad.jpg";
import img2 from "../../../assets/menu/pizza.jpg";
import img3 from "../../../assets/menu/soup.jpg";
import img4 from "../../../assets/menu/dessert-2.jpg";
import img5 from "../../../assets/menu/salad-2.jpg";

import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <SectionTitle
        heading={"Order Online"}
        subHeading={"From 11:00 am to 10:00 pm"}
      ></SectionTitle>
      <Swiper
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        spaceBetween={20}
        navigation
        modules={[Navigation]}
        className="mySwiper mt-12 mb-12"
      >
        <SwiperSlide>
          <Link to={"/order/salad"} className="group block relative overflow-hidden rounded-xl aspect-[3/4]">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={img1} alt="Salads" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl md:text-3xl font-serif text-light group-hover:text-primary transition-colors duration-300">Salads</h3>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={"/order/pizza"} className="group block relative overflow-hidden rounded-xl aspect-[3/4]">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={img2} alt="Pizzas" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl md:text-3xl font-serif text-light group-hover:text-primary transition-colors duration-300">Pizzas</h3>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={"/order/soups"} className="group block relative overflow-hidden rounded-xl aspect-[3/4]">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={img3} alt="Soups" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl md:text-3xl font-serif text-light group-hover:text-primary transition-colors duration-300">Soups</h3>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={"/order/dessert"} className="group block relative overflow-hidden rounded-xl aspect-[3/4]">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={img4} alt="Desserts" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl md:text-3xl font-serif text-light group-hover:text-primary transition-colors duration-300">Desserts</h3>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to={"/order/drinks"} className="group block relative overflow-hidden rounded-xl aspect-[3/4]">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={img5} alt="Drinks" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl md:text-3xl font-serif text-light group-hover:text-primary transition-colors duration-300">Drinks</h3>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;
