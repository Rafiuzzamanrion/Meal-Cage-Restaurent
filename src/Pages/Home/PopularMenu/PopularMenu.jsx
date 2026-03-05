
import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseMenu from "../../../Hooks/UseMenu";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const PopularMenu = () => {
    const [menu] = UseMenu();
    const popular = menu.filter(item => item.category === 'popular')
    return (
        <section className="container mx-auto px-4 py-16">
            <SectionTitle
                heading={'From our menu'}
                subHeading={'Popular items'}
            >

            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8 pt-12">
                {popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)}

            </div>
            <div className="flex items-center justify-center pt-8 pb-12">
                <Link to={'/menu'}> <button className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 px-8">VIEW FULL MENU</button></Link>
            </div>
        </section>
    );
};

export default PopularMenu;