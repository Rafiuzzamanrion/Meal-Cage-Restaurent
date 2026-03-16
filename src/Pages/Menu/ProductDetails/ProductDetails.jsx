import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/UseCart";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useContext } from "react";
import modernSwal from "../../../api/swalConfig";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import axios from 'axios';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import avatarPlaceholder from '../../../assets/avatar2.jpg';

const customStyles = {
  itemShapes: <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />,
  activeFillColor: '#D4AF37',
  inactiveFillColor: 'rgba(255,255,255,0.1)'
};

const ProductDetails = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart();
    const navigate = useNavigate();
    const [axiosSecure] = UseAxiosSecure();

    // Review States
    const [reviews, setReviews] = useState([]);
    const [newRating, setNewRating] = useState(0);
    const [newReviewText, setNewReviewText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch food details and reviews using the proper single-item endpoint
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/menu/${id}`);
                if (res.data && res.data._id) {
                    setFood(res.data);
                }
                
                // Fetch corresponding reviews
                const reviewsRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/review/menu/${id}`);
                setReviews(reviewsRes.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [id]);

    const handleAddToCart = (item) => {
        const cartItem = { menuItemId: item._id, foodId: item._id, name: item.name, image: item.image, price: item.price, email: user?.email, category: item.category };

        if (user && user.email) {
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data._id || res.data.insertedId) {
                        refetch();
                        toast.success('Food added to cart!', { theme: "dark" });
                    }
                })
        } else {
            const guestCart = JSON.parse(localStorage.getItem('guest-cart') || '[]');
            // Add a temporary ID for guest items to support deletion
            const guestItem = { ...cartItem, _id: Date.now().toString() };
            guestCart.push(guestItem);
            localStorage.setItem('guest-cart', JSON.stringify(guestCart));
            refetch();
            toast.success("Added to cart!", { theme: "dark" });
        }
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.warning("Please login to leave a review.", { theme: "dark" });
            return;
        }
        if (newRating === 0) {
            toast.warning("Please select a rating.", { theme: "dark" });
            return;
        }

        setIsSubmitting(true);
        const reviewData = {
            menuItemId: id,
            userId: user.uid,
            name: user.displayName || "Anonymous Connoisseur",
            email: user.email,
            userAvatar: user.photoURL || avatarPlaceholder,
            rating: newRating,
            details: newReviewText
        };

        try {
            const res = await axiosSecure.post('/review', reviewData);
            if (res.data.insertedId) {
                toast.success('Review published! Thank you.', { theme: "dark" });
                setNewRating(0);
                setNewReviewText("");
                // Optimistically update UI
                setReviews([{ ...reviewData, _id: res.data.insertedId, createdAt: new Date() }, ...reviews]);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to post review. Please try again.", { theme: "dark" });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate Rating Stats
    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1) : 0;
    const getStarCount = (stars) => reviews.filter(r => r.rating === stars).length;
    const getStarPercentage = (stars) => totalReviews > 0 ? (getStarCount(stars) / totalReviews) * 100 : 0;

    if (loading) {
        return <div className="min-h-screen bg-dark-900 flex justify-center items-center"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    if (!food) {
        return <div className="min-h-screen bg-dark-900 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-serif text-light mb-4">Product Not Found</h2>
            <button onClick={() => navigate(-1)} className="btn-luxury px-8">Go Back</button>
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
                                    className="btn-luxury w-full py-3 text-lg"
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

                {/* --- EXTRAORDINARY REVIEWS SECTION --- */}
                <div className="mt-24 pt-16 border-t border-white/5" data-aos="fade-up" data-aos-duration="1000">
                    <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-16 uppercase tracking-[0.2em]">Guest Experiences</h2>

                    <div className="flex flex-col xl:flex-row gap-12">
                        
                        {/* Summary & Form Column */}
                        <div className="w-full xl:w-1/3 flex flex-col gap-8">
                            
                            {/* Rating Summary Card */}
                            <div className="bg-dark-800/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                                <div className="text-center mb-8">
                                    <h3 className="text-6xl font-serif text-light font-bold mb-2">{avgRating}</h3>
                                    <div className="flex justify-center mb-2">
                                        <Rating 
                                            style={{ maxWidth: 150 }} 
                                            value={Math.round(avgRating)} 
                                            readOnly 
                                            itemStyles={customStyles}
                                        />
                                    </div>
                                    <p className="text-light/50 font-sans tracking-wide text-sm">Based on {totalReviews} reviews</p>
                                </div>
                                
                                <div className="space-y-4">
                                    {[5, 4, 3, 2, 1].map(star => (
                                        <div key={star} className="flex items-center gap-3">
                                            <span className="w-4 text-light/70 font-sans text-sm font-bold">{star}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                                            <div className="w-full bg-dark-900 rounded-full h-2 overflow-hidden border border-white/5">
                                                <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${getStarPercentage(star)}%` }}></div>
                                            </div>
                                            <span className="w-8 text-right text-light/40 font-sans text-xs">{getStarCount(star)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Write Review Card */}
                            <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-primary/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-all group-hover:bg-primary/20"></div>
                                <h3 className="text-xl font-serif text-light mb-6 flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                                    Share Your Experience
                                </h3>
                                
                                {user ? (
                                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-light/70 font-sans text-sm tracking-wide">Rate the dish</label>
                                            <Rating 
                                                style={{ maxWidth: 180 }} 
                                                value={newRating} 
                                                onChange={(newValue) => setNewRating(newValue)} 
                                                itemStyles={customStyles}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-light/70 font-sans text-sm tracking-wide">Your thoughts</label>
                                            <textarea 
                                                value={newReviewText}
                                                onChange={(e) => setNewReviewText(e.target.value)}
                                                className="textarea w-full bg-dark-900/50 border-white/10 text-light placeholder-light/30 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans rounded-xl resize-none h-28" 
                                                placeholder="Tell us about the flavors, presentation, and your overall experience..."
                                                required
                                            ></textarea>
                                        </div>
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting} 
                                            className="btn-luxury w-full py-3 text-sm flex justify-center items-center"
                                        >
                                            {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : "Publish Review"}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-light/60 font-sans tracking-wide mb-6 text-sm">You must be a registered connoisseur to leave a review.</p>
                                        <Link to="/login" className="btn-luxury inline-block px-8 py-2 text-sm">Login to Review</Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Reviews List Column */}
                        <div className="w-full xl:w-2/3">
                            {reviews.length === 0 ? (
                                <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-dark-800/30 rounded-3xl border border-white/5 border-dashed">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-primary/30 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                                    <p className="text-light/50 font-serif text-xl">Be the first to review this masterpiece.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {reviews.map((rvw, idx) => (
                                        <div key={rvw._id} className="bg-dark-800/40 hover:bg-dark-800/80 transition-all duration-500 p-8 rounded-3xl border border-white/5 hover:border-primary/30 group" data-aos="fade-up" data-aos-delay={idx * 50}>
                                            <div className="flex items-center gap-4 mb-6 relative">
                                                <div className="avatar">
                                                    <div className="w-12 h-12 rounded-full ring-2 ring-primary/30 group-hover:ring-primary transition-all">
                                                        <img src={rvw.userAvatar || avatarPlaceholder} alt="avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-light font-serif font-bold text-lg">{rvw.name || "Anonymous"}</h4>
                                                    <p className="text-light/40 font-sans text-xs tracking-wider">
                                                        {new Date(rvw.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </p>
                                                </div>
                                                <div className="absolute top-0 right-0">
                                                    <Rating 
                                                        style={{ maxWidth: 80 }} 
                                                        value={rvw.rating} 
                                                        readOnly 
                                                        itemStyles={customStyles}
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-light/70 font-sans font-light leading-relaxed text-sm italic relative z-10">
                                                <span className="text-primary/40 text-4xl leading-none absolute -top-4 -left-2 -z-10 font-serif">"</span>
                                                {rvw.details}
                                                <span className="text-primary/40 text-4xl leading-none absolute -bottom-4 right-0 -z-10 font-serif">"</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;
