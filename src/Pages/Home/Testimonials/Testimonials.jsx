import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "swiper/css/autoplay";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/review`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <section className="container mx-auto px-4 py-20">
      <SectionTitle
        heading={"Reviews"}
        subHeading={"What our clients say"}
      ></SectionTitle>

      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="mySwiper mt-12"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration="800"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="my-8 mx-4 md:mx-24 flex flex-col items-center bg-dark-800 border border-white/5 shadow-2xl p-8 md:p-12 rounded-2xl relative overflow-hidden group">
              {/* Decorative Quote Mark */}
              <div className="absolute top-4 left-6 md:top-8 md:left-12 text-6xl text-primary/10 font-serif leading-none select-none">"</div>

              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
                className="mb-8 z-10"
              />
              <p className="py-6 text-light/80 font-sans text-center text-sm md:text-base leading-relaxed tracking-wide italic max-w-3xl z-10">
                "{review.details}"
              </p>
              <h3 className="text-2xl md:text-3xl text-primary font-serif tracking-widest uppercase mt-4 z-10">
                {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
