import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import NoData from "../../../Components/Shared/NoData";


const MenuCategory = ({ items, img, title, buttonName }) => {
    return (
        <div className="mt-20 mb-10">
            {title && <Cover img={img} title={title}></Cover>}
            {/* Menu Items Grid */}
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                {!items || items.length === 0 ? (
                    <NoData heading="Category Empty" text="We don't have any items in this category at the moment." />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                        {items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)}
                    </div>
                )}
                <div className="flex items-center justify-center pb-8 rounded-b-xl">
                    <Link to={`/order/${title}`}><button className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 px-8 uppercase">{buttonName}</button></Link>
                </div>
            </div>
        </div>
    );
};

export default MenuCategory;