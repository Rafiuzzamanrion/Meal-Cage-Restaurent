import { Link } from "react-router-dom";
import img from "../../../assets/contact/banner.jpg";

const AboutBistro = () => {
  return (
    <section className="bg-dark-900 py-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4"></div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side with Decorative Elements */}
          <div className="w-full lg:w-1/2 relative" data-aos="fade-right" data-aos-duration="1000">
            {/* Outline Box Decoration */}
            <div className="absolute -inset-4 md:-inset-6 border border-primary/30 rounded-2xl md:rounded-3xl translate-x-4 md:translate-x-8 translate-y-4 md:translate-y-8 z-0"></div>
            
            {/* Main Image */}
            <div className="relative z-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
              <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img 
                src={img} 
                alt="Inside Meal Cage Restaurant" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Floating Info Box */}
            <div className="absolute -bottom-8 -left-4 md:-left-8 z-20 bg-dark-800/90 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-xs animate-float">
              <p className="text-4xl text-primary font-serif mb-2">15+</p>
              <p className="font-sans text-light/70 text-xs tracking-[0.2em] uppercase">Years of Culinary Excellence</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0" data-aos="fade-left" data-aos-duration="1200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-primary"></div>
              <span className="font-sans text-primary text-sm tracking-[0.3em] uppercase">Our Story</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-light font-bold leading-tight mb-8">
              A Symphony of <br/>
              <span className="text-primary italic font-light">Taste & Elegance</span>
            </h2>

            <div className="space-y-6 text-light/70 font-sans tracking-wide leading-relaxed text-sm md:text-base border-l border-primary/20 pl-6 md:pl-8 py-2 mb-10">
              <p>
                A culinary masterpiece awaits. At Meal Cage, we are more than just a restaurant; we are a haven for true culinary enthusiasts.
              </p>
              <p>
                Our master chefs blend time-honored traditions with cutting-edge innovation, using only the finest,
                sustainably sourced ingredients to create dishes that delight your senses and leave a lasting impression.
              </p>
            </div>

            <Link to="/about">
              <button className="relative group/btn px-10 py-4 overflow-hidden border border-primary/50 bg-transparent text-primary font-sans tracking-[0.2em] font-bold uppercase transition-all duration-500 hover:border-primary hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-dark-900">Discover More</span>
                <div className="absolute inset-0 h-full w-0 bg-primary transition-all duration-500 ease-out group-hover/btn:w-full z-0"></div>
              </button>
            </Link>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutBistro;
