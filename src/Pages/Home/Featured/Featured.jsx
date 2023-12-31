import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/menu/menu.jpg'

import { Parallax } from 'react-parallax';


const Featured = () => {
    return (
        <Parallax
        blur={{ min: -50, max: 40 }}
        bgImage={featuredImg}
        bgImageAlt="the menu"
        strength={-300}
        
    >
        <div className="featured-item pt-2 my-20 bg-opacity-60 bg-slate-700">
            <SectionTitle
            heading={'Featured item'}
            subHeading={'Check it out'}
            
            ></SectionTitle>
            <div className="md:flex items-center justify-center px-24 pb-20 pt-8 text-white "
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="700">
               <div>
               <img src={featuredImg} alt="" />
               </div>
               <div className="md:ml-10">
                <p>March 20, 2029 </p>
                <p className="uppercase">Where can i get some?</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut maiores odit accusantium voluptas nesciunt, nulla praesentium excepturi. Asperiores, dolorem labore? Ad consectetur repellendus soluta hic vero quisquam aliquid aperiam, ab minima molestiae libero, cupiditate numquam quasi pariatur aut maxime sint laborum repudiandae quaerat ea debitis. Autem quos voluptate dolor commodi!
                </p>
                <button className="btn btn-outline hover:bg-teal-400 hover:border-none text-teal-500 border-b-8 hover:text-black mt-4">Order now</button>
               </div>
            </div>
        </div>
        </Parallax>
    );
};

export default Featured;