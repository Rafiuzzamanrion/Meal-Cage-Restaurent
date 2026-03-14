import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import { FaGift } from "react-icons/fa";
import modernSwal from "../../api/swalConfig";

const giftCards = [
    { id: 1, amount: 50, title: "Bronze Tier", color: "from-stone-600 to-stone-800", textColor: "text-stone-300" },
    { id: 2, amount: 100, title: "Silver Tier", color: "from-slate-400 to-slate-600", textColor: "text-slate-200" },
    { id: 3, amount: 250, title: "Gold Tier", color: "from-amber-600 to-amber-800", textColor: "text-amber-100" },
    { id: 5, amount: 500, title: "Platinum Tier", color: "from-slate-800 to-black", textColor: "text-white" },
];

const GiftCards = () => {

    const handlePurchase = (amount) => {
        modernSwal.fire({
            title: 'Purchase Gift Card?',
            text: `Confirm purchase of $${amount} digital Gift Card.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Proceed to Checkout',
        }).then((result) => {
            if (result.isConfirmed) {
                toast.info('Redirecting to secure payment portal...', { theme: "dark" });
            }
        });
    };

    return (
        <div className="bg-dark-900 min-h-screen pb-20">
            <Helmet>
                <title>MealCage | Gift Cards</title>
            </Helmet>

            {/* A premium dark cover image */}
            <Cover img="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop" title="Gift Cards" />

            <div className="container mx-auto px-4 lg:px-12 mt-20">
                <div className="text-center mb-16 max-w-2xl mx-auto" data-aos="fade-up">
                    <h2 className="text-4xl font-serif text-light mb-6">Give the Gift of Exceptional Dining</h2>
                    <p className="text-light/70 font-sans tracking-wide leading-relaxed">
                        Treat someone special to an unforgettable culinary experience at Meal Cage. Our digital gift cards are delivered instantly via email and can be personalized with a custom message.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {giftCards.map((card, index) => (
                        <div
                            key={card.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className={`relative rounded-2xl p-8 shadow-2xl overflow-hidden flex flex-col justify-between h-80 group cursor-pointer hover:scale-105 transition-transform duration-500 bg-gradient-to-br ${card.color}`}
                        >
                            {/* Decorative background pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>

                            <div className="relative z-10">
                                <FaGift className={`text-4xl ${card.textColor} opacity-80 mb-4`} />
                                <h3 className={`text-xl font-serif tracking-widest uppercase ${card.textColor}`}>{card.title}</h3>
                            </div>

                            <div className="relative z-10 mt-auto flex items-end justify-between">
                                <span className={`text-5xl font-sans font-light ${card.textColor}`}>${card.amount}</span>
                                <button
                                    onClick={() => handlePurchase(card.amount)}
                                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-sans tracking-widest uppercase transition-colors"
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info Section */}
                <div className="mt-24 bg-dark-800 border border-white/5 rounded-2xl p-8 lg:p-12 text-center" data-aos="fade-up">
                    <h3 className="text-2xl font-serif text-light mb-4">Corporate Gifting</h3>
                    <p className="text-light/70 font-sans tracking-wide max-w-2xl mx-auto mb-8">
                        Looking to reward your team or impress clients? We offer exclusive corporate gifting packages.
                        Contact our hospitality team to curate the perfect culinary reward.
                    </p>
                    <button className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-dark-900 rounded-none px-8 font-sans tracking-widest uppercase transition-all duration-300">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GiftCards;
