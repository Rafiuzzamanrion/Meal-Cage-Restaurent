import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/menu/menu.jpg'

import { Parallax } from 'react-parallax';


const Featured = () => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={featuredImg}
            bgImageAlt="the menu"
            strength={-200}
            className="my-20"
        >
            <div className="bg-dark-900/70 pt-8 pb-20 px-4 md:px-0">
                <SectionTitle
                    heading={'Featured item'}
                    subHeading={'Check it out'}
                ></SectionTitle>

                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 mt-8"
                    data-aos="fade-up"
                    data-aos-easing="linear"
                    data-aos-duration="700">
                    <div className="md:w-1/2">
                        <img src={featuredImg} alt="Featured Dish" className="rounded-xl shadow-2xl shadow-black/50 ring-1 ring-white/10" />
                    </div>
                    <div className="md:w-1/2 bg-dark-900/60 backdrop-blur-lg p-8 rounded-xl border border-white/10 shadow-2xl">
                        <p className="text-primary font-serif italic text-lg mb-2">March 20, 2029</p>
                        <h4 className="uppercase text-2xl font-serif text-light tracking-wide mb-4">Where can I get some?</h4>
                        <p className="font-sans text-light/70 leading-relaxed tracking-wide mb-8 text-sm">
                            Experience the epitome of culinary perfection. Our featured dish is a harmonious blend of
                            seasonal ingredients, masterfully crafted to deliver an explosion of flavors in every bite.
                            Don't miss the opportunity to indulge in this limited-time gastronomic delight.
                        </p>
                        <button className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 px-8">
                            ORDER NOW
                        </button>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default Featured;