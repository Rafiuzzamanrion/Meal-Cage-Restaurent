import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/UseCart";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";

const ProductDetails = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart();
    const navigate = useNavigate();

    // Fetch food details using the proper single-item endpoint
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/menu/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data && data._id) {
                    setFood(data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = (item) => {
        if (user && user.email) {
            const cartItem = { menuItemId: item._id, name: item.name, image: item.image, price: item.price, email: user.email }
            fetch(`${import.meta.env.VITE_API_BASE_URL}/carts`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch(); // refetch cart to update number of items
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'Food added on the cart.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d4af37',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    if (loading) {
        return <div className="min-h-screen bg-dark-900 flex justify-center items-center"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    if (!food) {
        return <div className="min-h-screen bg-dark-900 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-serif text-light mb-4">Product Not Found</h2>
            <button onClick={() => navigate(-1)} className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-dark-900 rounded-none tracking-widest px-8">Go Back</button>
        </div>;
    }

    return (
        <div className="min-h-screen bg-dark-900 pt-24 pb-16 transition-all">
            <Helmet>
                <title>MealCage | {food.name}</title>
            </Helmet>

            <div className="container mx-auto px-4 lg:px-12">
                <button onClick={() => navigate(-1)} className="text-light/60 hover:text-primary transition-colors flex items-center gap-2 mb-8 font-sans tracking-wide">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Back to Menu
                </button>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Product Image Section */}
                    <div className="w-full lg:w-1/2" data-aos="fade-right" data-aos-duration="1000">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-dark-800 border border-white/5 aspect-square lg:aspect-auto h-full max-h-[600px] group">
                            {/* Decorative blur */}
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <img
                                src={food.image}
                                alt={food.name}
                                className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center" data-aos="fade-left" data-aos-duration="1000">

                        <div className="inline-block mb-4">
                            <span className="bg-dark-800 border border-white/10 text-primary px-4 py-1 rounded-full text-xs font-sans tracking-widest uppercase">
                                {food.category || "Specialty"}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-light mb-4 leading-tight">
                            {food.name}
                        </h1>

                        <p className="text-3xl font-sans font-light text-primary mb-8 tracking-wide">
                            ${food.price}
                        </p>

                        <div className="divider before:bg-white/10 after:bg-white/10 mb-8"></div>

                        <div className="mb-10">
                            <h3 className="text-xl font-serif text-light mb-4">Description</h3>
                            <p className="text-light/70 font-sans tracking-wide leading-relaxed text-lg">
                                {food.recipe || "Experience culinary perfection with this signature dish. Crafted with passion using only the finest, locally sourced ingredients to deliver an unforgettable dining experience."}
                            </p>
                        </div>

                        {/* Interactive Elements */}
                        <div className="bg-dark-800/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl mb-8">
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <button
                                    onClick={() => handleAddToCart(food)}
                                    className="w-full btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 py-3 uppercase text-lg"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        {/* Premium Meta Info */}
                        <div className="grid grid-cols-2 gap-4 text-light/50 font-sans text-sm mt-4">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Prep time: ~20 mins</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <span>Chef's Choice</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
