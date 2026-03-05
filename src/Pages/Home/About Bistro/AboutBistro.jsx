import img from "../../../assets/contact/banner.jpg";
const AboutBistro = () => {
  return (
    <section className="container mx-auto px-4 py-24 object-cover"
      style={{ backgroundImage: `url(${img})`, backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundSize: 'cover' }}>
      <div className="flex justify-center items-center h-[500px]">
        <div
          className="bg-dark-900/80 backdrop-blur-md border border-white/10 p-10 md:p-16 text-center max-w-3xl"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          <h3 className="text-3xl md:text-5xl font-serif text-light uppercase mb-6 tracking-widest">Meal <span className="text-primary italic">Cage</span></h3>
          <p className="text-light/80 font-sans text-sm md:text-base tracking-wider leading-relaxed mb-6">
            A culinary masterpiece awaits. At Meal Cage, we are more than just a restaurant; we are a haven for true culinary enthusiasts.
            Our master chefs blend time-honored traditions with cutting-edge innovation, using only the finest,
            sustainably sourced ingredients to create dishes that delight your senses and leave a lasting impression.
          </p>
          <p className="text-light/80 font-sans text-sm md:text-base tracking-wider leading-relaxed">
            Join us for an unforgettable dining experience today, where every meal is a celebration of taste and elegance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutBistro;
