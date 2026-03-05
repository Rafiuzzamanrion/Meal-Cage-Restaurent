import { Helmet } from "react-helmet-async";
import UseCart from "../../../Hooks/UseCart";
import { BiDollarCircle, BiRightArrowAlt } from 'react-icons/bi'
import MyCartItem from "./MyCartItem";
import { Link } from "react-router-dom";


const MyCart = () => {
    const [cart] = UseCart();

    // ===== easy way to addition ==========
    // ======= here 0 is initial value =========
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    return (
        <div className="w-full px-4 lg:px-8 pb-16">
            <Helmet>
                <title>MealCage | My cart</title>
            </Helmet>

            <div className="my-12 flex flex-col md:flex-row justify-between items-center bg-dark-800 border border-white/10 shadow-2xl shadow-black/50 p-8 rounded-2xl"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="800">
                <div className="flex flex-col gap-2 mb-6 md:mb-0">
                    <h3 className="text-2xl font-serif text-light tracking-wide">Total Items: <span className="text-primary font-sans font-bold">{cart.length}</span></h3>
                    <h3 className="text-2xl font-serif text-light tracking-wide">Total Price: <span className="text-primary font-sans font-bold uppercase">${total.toFixed(2)}</span></h3>
                </div>
                <Link to="/dashboard/payment">
                    <button className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 px-8 uppercase flex items-center gap-2">
                        <BiDollarCircle size={22} /> Pay Now <BiRightArrowAlt size={22} />
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {
                    cart.map(item => <MyCartItem key={item._id} item={item}></MyCartItem>)
                }
            </div>


        </div>
    );
};

export default MyCart;