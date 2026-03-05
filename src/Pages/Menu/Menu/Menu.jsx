import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from '../../../assets/menu/menu.jpg'
import pizzaImg from '../../../assets/menu/pizza.jpg'
import saladImg from '../../../assets/menu/salad-2.jpg'
import soupImg from '../../../assets/menu/soup.jpg'
import dessertImg from '../../../assets/menu/dessert.jpg'
import drinksImg from '../../../assets/menu/drinks.jpg'
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import { useState, useEffect } from "react";

const dietaryFilters = [
    { label: "All", key: "all", emoji: "🍽️" },
    { label: "Vegan", key: "vegan", emoji: "🌿" },
    { label: "Vegetarian", key: "vegetarian", emoji: "🥗" },
    { label: "Gluten-Free", key: "glutenFree", emoji: "🌾" },
    { label: "Organic", key: "organic", emoji: "🌎" },
    { label: "Best Sellers", key: "popular", emoji: "⭐" },
];



const Menu = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch menu from backend — supports ?dietaryTag= query param for server-side filtering
    useEffect(() => {
        setLoading(true);
        const url = activeFilter === 'all'
            ? `${import.meta.env.VITE_API_BASE_URL}/menu`
            : `${import.meta.env.VITE_API_BASE_URL}/menu?dietaryTag=${activeFilter}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMenu(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [activeFilter]);

    const desserts = menu.filter(item => item.category === 'dessert');
    const soups = menu.filter(item => item.category === 'soup');
    const salads = menu.filter(item => item.category === 'salad');
    const pizzas = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'popular');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (
        <div>
            <Helmet>
                <title>MealCage | Menu</title>
            </Helmet>

            {/* page banner cover */}
            <Cover img={menuImg} title={'Our Menu'}></Cover>

            {/* section title */}
            <SectionTitle
                heading={"Today's Offers"}
                subHeading={"Don't Miss"}>
            </SectionTitle>

            {/* ============ Dietary Filter Bar ============ */}
            <div className="container mx-auto px-4 py-8 -mt-4" data-aos="fade-up">
                <div className="flex flex-wrap justify-center gap-3">
                    {dietaryFilters.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setActiveFilter(filter.key)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full font-sans text-sm tracking-widest uppercase border transition-all duration-300 ${activeFilter === filter.key
                                ? 'bg-primary text-dark-900 border-primary font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                : 'bg-transparent text-light/70 border-white/20 hover:border-primary/50 hover:text-primary'
                                }`}
                        >
                            <span>{filter.emoji}</span>
                            {filter.label}
                        </button>
                    ))}
                </div>
                {activeFilter !== 'all' && (
                    <p className="text-center text-light/50 font-sans text-xs mt-4 tracking-widest">
                        Showing items filtered by: <span className="text-primary capitalize">{activeFilter.replace('GlutenFree', 'Gluten-Free')}</span>
                    </p>
                )}
            </div>

            {/* offered item */}
            {offered.length > 0 && <MenuCategory items={offered} title={'offered'} img={pizzaImg} buttonName={'Order your favorite offered food'}></MenuCategory>}
            {/* dessert item */}
            {desserts.length > 0 && <MenuCategory title={"dessert"} img={dessertImg} items={desserts} buttonName={'Order your favorite dessert'}></MenuCategory>}
            {/* pizza item */}
            {pizzas.length > 0 && <MenuCategory title={'pizza'} img={pizzaImg} items={pizzas} buttonName={'Order your favorite pizza'}></MenuCategory>}
            {/* salad item */}
            {salads.length > 0 && <MenuCategory title={'salad'} img={saladImg} items={salads} buttonName={'Order your favorite salads'}></MenuCategory>}
            {/* soup item */}
            {soups.length > 0 && <MenuCategory title={'soups'} img={soupImg} items={soups} buttonName={'Order your favorite soups'}></MenuCategory>}
            {/* drinks item */}
            {drinks.length > 0 && <MenuCategory title={'drinks'} img={drinksImg} items={drinks} buttonName={'Order your favorite drinks'}></MenuCategory>}

            {/* No results message */}
            {offered.length === 0 && desserts.length === 0 && pizzas.length === 0 && salads.length === 0 && soups.length === 0 && drinks.length === 0 && (
                <div className="text-center py-24">
                    <p className="text-6xl mb-6">🔍</p>
                    <h3 className="text-2xl font-serif text-light mb-3">No Items Found</h3>
                    <p className="text-light/60 font-sans tracking-wide mb-8">No menu items match the selected dietary filter.</p>
                    <button
                        onClick={() => setActiveFilter('all')}
                        className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 px-8 uppercase"
                    >
                        View All Items
                    </button>
                </div>
            )}
        </div>
    );
};

export default Menu;