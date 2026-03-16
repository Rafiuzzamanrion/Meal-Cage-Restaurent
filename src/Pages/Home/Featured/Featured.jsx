import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/menu/menu.jpg'
import { Parallax } from 'react-parallax';
import { Link } from "react-router-dom";

const Featured = () => {
    return (
        <section className="relative group overflow-hidden">
            <Parallax
                blur={{ min: -10, max: 10 }}
                bgImage={featuredImg}
                bgImageAlt="Gourmet featured dish"
                strength={-250}
                className="my-24"
            >
                {/* Content Overlay */}
                <div className="bg-dark-900/80 pt-20 pb-28 px-4 md:px-8 relative z-10">
                    <SectionTitle
                        heading={'Featured Delight'}
                        subHeading={'Don\'t miss our seasonal special'}
                    ></SectionTitle>

                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 mt-16 relative">
                        
                        {/* Image Side */}
                        <div className="w-full lg:w-5/12 relative z-10"
                            data-aos="fade-right"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1000"
                        >
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 border border-primary/40 rounded-3xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700"></div>
                            
                            <img 
                                src={featuredImg} 
                                alt="Featured Dish" 
                                className="w-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] object-cover aspect-square" 
                            />
                            
                            {/* Floating Badge */}
                            <div className="absolute -top-6 -right-6 bg-primary text-dark-900 w-24 h-24 rounded-full flex flex-col items-center justify-center font-serif shadow-xl border-[4px] border-dark-900 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                <span className="text-sm uppercase tracking-widest font-sans font-bold">New</span>
                                <span className="text-xl font-bold">Arrival</span>
                            </div>
                        </div>

                        {/* Content Side - Glassmorphism Card */}
                        <div className="w-full lg:w-7/12 relative"
                            data-aos="fade-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="1000"
                        >
                            <div className="bg-dark-800/60 backdrop-blur-xl p-10 md:p-14 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group/card hover:border-primary/30 transition-colors duration-500">
                                
                                {/* Inner Glow */}
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover/card:bg-primary/30 transition-colors duration-500"></div>

                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <span className="text-primary font-serif italic text-xl">Chef's Recommendation</span>
                                    <div className="h-[1px] bg-primary/30 flex-grow"></div>
                                </div>
                                
                                <h4 className="text-4xl md:text-5xl font-serif text-light leading-tight mb-8 relative z-10">
                                    Gastronomic <span className="text-primary italic font-light">Perfection</span>
                                </h4>
                                
                                <p className="font-sans text-light/70 leading-relaxed tracking-wide mb-10 text-sm md:text-base border-l border-primary/30 pl-6 relative z-10">
                                    Experience the epitome of culinary perfection. Our featured dish is a harmonious blend of
                                    seasonal ingredients, masterfully crafted to deliver an explosion of flavors in every bite.
                                    Don't miss the opportunity to indulge in this limited-time gastronomic delight.
                                </p>
                                
                                <div className="relative z-10">
                                    <Link to='/menu'>
                                        <button className="relative group/btn px-10 py-4 overflow-hidden border border-primary/50 bg-dark-900/80 text-primary font-sans tracking-[0.2em] font-bold uppercase transition-all duration-500 hover:border-primary hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                            <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-dark-900">Order Now</span>
                                            <div className="absolute inset-0 h-full w-0 bg-primary transition-all duration-500 ease-out group-hover/btn:w-full z-0"></div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Parallax>
        </section>
    );
};

export default Featured;