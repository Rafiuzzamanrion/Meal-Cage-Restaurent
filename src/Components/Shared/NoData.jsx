import { FaBoxOpen } from "react-icons/fa";

const NoData = ({ heading = "No Data Found", text = "There are currently no items to display here." }) => {
    return (
        <div className="flex flex-col flex-1 items-center justify-center py-16 px-4 w-full h-full min-h-[300px]" data-aos="fade-up" data-aos-duration="800">
            <div className="bg-dark-800/50 p-6 rounded-full border border-white/5 mb-6 backdrop-blur-sm relative group overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <FaBoxOpen className="text-6xl md:text-7xl text-primary/80 relative z-10 animate-pulse group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-light mb-3 tracking-widest uppercase text-center">{heading}</h3>
            <p className="text-light/50 font-sans tracking-wide text-center max-w-md">{text}</p>
        </div>
    );
};

export default NoData;
