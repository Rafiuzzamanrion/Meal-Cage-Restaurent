import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UseCart from "../../../Hooks/UseCart";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { BiRightArrowAlt } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const [cart] = UseCart();
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => item.price + sum, 0);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // Optionally save shipping info to local storage or state
        // before navigating to payment.
        console.log("Shipping Data:", data);
        navigate("/dashboard/payment");
    };

    if (cart.length === 0) {
        return (
            <div className="w-full text-center mt-24">
                <h2 className="text-3xl font-serif text-light">Your cart is empty</h2>
                <Link to="/order/salad">
                    <button className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-dark-900 mt-6 tracking-widest uppercase rounded-none">
                        Browse Menu
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-4 lg:px-8 pb-16">
            <Helmet>
                <title>MealCage | Checkout</title>
            </Helmet>

            <SectionTitle heading="Checkout" subHeading="Almost there" />

            <div className="flex flex-col lg:flex-row gap-8 mt-12">
                {/* Shipping Form directly here */}
                <div className="flex-1 bg-dark-800 border border-white/10 p-8 rounded-2xl shadow-2xl" data-aos="fade-right" data-aos-duration="600">
                    <h3 className="text-2xl font-serif text-light mb-6 uppercase tracking-wider border-b border-light/10 pb-4">Delivery Details</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-light/80 tracking-wide">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.displayName || ""}
                                    {...register("name", { required: true })}
                                    className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50"
                                />
                                {errors.name && <span className="text-red-500 text-sm mt-1">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-light/80 tracking-wide">Email</span>
                                </label>
                                <input
                                    type="email"
                                    defaultValue={user?.email || ""}
                                    disabled
                                    className="input bg-dark-900/50 border-white/10 text-light/50 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-light/80 tracking-wide">Delivery Address</span>
                            </label>
                            <input
                                type="text"
                                placeholder="123 Main St, Apt 4B"
                                {...register("address", { required: true })}
                                className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50"
                            />
                            {errors.address && <span className="text-red-500 text-sm mt-1">Address is required</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text text-light/80 tracking-wide">City</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="New York"
                                    {...register("city", { required: true })}
                                    className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50"
                                />
                                {errors.city && <span className="text-red-500 text-sm mt-1">City is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-light/80 tracking-wide">Zip Code</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="10001"
                                    {...register("zip", { required: true })}
                                    className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50"
                                />
                                {errors.zip && <span className="text-red-500 text-sm mt-1">Zip Code is required</span>}
                            </div>
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-light/80 tracking-wide">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                {...register("phone", { required: true })}
                                className="input bg-dark-900/50 border-white/10 text-light focus:border-primary/50"
                            />
                            {errors.phone && <span className="text-red-500 text-sm mt-1">Phone is required</span>}
                        </div>

                        <button type="submit" className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest uppercase flex items-center gap-2 mt-auto">
                            Proceed to Payment <BiRightArrowAlt size={22} />
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96" data-aos="fade-left" data-aos-duration="800">
                    <div className="bg-dark-800 border border-white/10 p-8 rounded-2xl shadow-2xl sticky top-8">
                        <h3 className="text-2xl font-serif text-light mb-6 uppercase tracking-wider border-b border-light/10 pb-4">Order Summary</h3>

                        <div className="flex flex-col gap-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item._id} className="flex justify-between items-center bg-dark-900/50 p-3 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                        <div>
                                            <h4 className="text-light text-sm font-serif">{item.name}</h4>
                                            <p className="text-light/50 text-xs">Qty: 1</p>
                                        </div>
                                    </div>
                                    <p className="text-primary font-bold">${item.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-light/10 pt-6">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-light/80 tracking-wide">Subtotal ({cart.length} items)</span>
                                <span className="text-light font-bold">${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-light/80 tracking-wide">Delivery Fee</span>
                                <span className="text-primary tracking-wide">Free</span>
                            </div>
                            <div className="divider before:bg-white/10 after:bg-white/10 my-4"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-light text-xl font-serif tracking-widest uppercase">Total</span>
                                <span className="text-primary text-2xl font-bold">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
