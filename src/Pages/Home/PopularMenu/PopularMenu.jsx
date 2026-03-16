import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseMenu from "../../../Hooks/UseMenu";
import Loader from "../../../Components/Shared/Loader";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {

    const [menu, , loading] = UseMenu();
    const popular = menu.filter(item => item.category === 'popular');

    if (loading) return <Loader />;

    return (
        <section className="bg-dark-900 py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <SectionTitle
                    heading={'Popular Menu'}
                    subHeading={'Discover our signature creations'}
                ></SectionTitle>

                <div className="mt-16 bg-dark-800/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {popular.map((item, index) => (
                            <div 
                                key={item._id} 
                                className="relative group/menuitem"
                                data-aos="fade-up"
                                data-aos-duration="600"
                                data-aos-delay={index * 100}
                            >
                                <MenuItem item={item}></MenuItem>
                                
                                {/* Hover interactive line */}
                                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover/menuitem:scale-x-100 transition-transform duration-700 ease-out origin-left"></div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center mt-16 pb-4" data-aos="fade-up" data-aos-duration="800">
                        <Link to={'/menu'}>
                            <button className="relative group/btn px-10 py-4 overflow-hidden border border-primary/50 bg-dark-900 shadow-[0_5px_15px_rgba(0,0,0,0.5)] text-primary font-sans tracking-[0.2em] font-bold uppercase transition-all duration-500 hover:border-primary hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-dark-900">View Full Menu</span>
                                <div className="absolute inset-0 h-full w-0 bg-primary transition-all duration-500 ease-out group-hover/btn:w-full z-0"></div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularMenu;