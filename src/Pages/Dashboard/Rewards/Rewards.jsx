import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet-async";
import { FaStar, FaMedal, FaTrophy, FaCrown, FaGift, FaHistory, FaArrowRight } from "react-icons/fa";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProvider";
import modernSwal from "../../../api/swalConfig";
import Loader from "../../../Components/Shared/Loader";
import NoData from "../../../Components/Shared/NoData";
import { toast } from "react-toastify";

const tiers = [
    { name: "Bronze", min: 0, icon: <FaMedal className="text-stone-400" />, color: "text-stone-400" },
    { name: "Silver", min: 500, icon: <FaStar className="text-slate-300" />, color: "text-slate-300" },
    { name: "Gold", min: 1000, icon: <FaTrophy className="text-amber-400" />, color: "text-amber-400" },
    { name: "Platinum", min: 1500, icon: <FaCrown className="text-purple-400" />, color: "text-purple-400" },
];

const tierOrder = ["Bronze", "Silver", "Gold", "Platinum"];

const getNextTier = (tier) => {
    const idx = tierOrder.indexOf(tier);
    return idx < tierOrder.length - 1 ? tierOrder[idx + 1] : null;
};

const getPointsToNext = (points, tier) => {
    const nextTier = tiers.find(t => t.name === getNextTier(tier));
    if (!nextTier) return 0;
    return nextTier.min - points;
};

const getProgressPercent = (points, tier) => {
    const curr = tiers.find(t => t.name === tier);
    const next = tiers.find(t => t.name === getNextTier(tier));
    if (!curr || !next) return 100;
    const range = next.min - curr.min;
    const earned = points - curr.min;
    return Math.min(100, Math.round((earned / range) * 100));
};

const getTierIcon = (tier) => {
    switch (tier) {
        case 'Gold': return <FaTrophy className="text-amber-400 text-3xl" />;
        case 'Silver': return <FaStar className="text-slate-300 text-3xl" />;
        case 'Platinum': return <FaCrown className="text-purple-400 text-3xl" />;
        default: return <FaMedal className="text-stone-400 text-3xl" />;
    }
};

const Rewards = () => {
    const { user } = useContext(AuthContext);
    const [redeeming, setRedeeming] = useState(false);
    const [axiosSecure] = UseAxiosSecure();

    const { data: rewardData, isLoading, refetch } = useQuery({
        queryKey: ['loyalty', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/loyalty/my-points');
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleRedeem = async () => {
        const { value: pointsToRedeem } = await modernSwal.fire({
            title: 'Redeem Points',
            input: 'number',
            inputLabel: `Available: ${rewardData?.points || 0} pts. Enter amount to redeem:`,
            inputAttributes: { min: 1, max: rewardData?.points || 0 },
            showCancelButton: true,
            confirmButtonText: 'Redeem Now',
        });
        if (!pointsToRedeem) return;

        setRedeeming(true);
        try {
            await axiosSecure.post('/loyalty/redeem',
                { userEmail: user.email, points: parseInt(pointsToRedeem) }
            );
            refetch();
            toast.success(`${pointsToRedeem} points redeemed successfully!`, { theme: "dark" });
        } catch (err) {
            toast.error(err.response?.data?.message || err.message, { theme: "dark" });
        } finally {
            setRedeeming(false);
        }
    };

    if (isLoading) return <Loader />;

    const points = rewardData?.points || 0;
    const tier = rewardData?.tier || 'Bronze';
    const history = rewardData?.history || [];
    const nextTier = getNextTier(tier);
    const ptsToNext = getPointsToNext(points, tier);
    const progress = getProgressPercent(points, tier);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 pb-16" data-aos="fade-up" data-aos-duration="600">
            <Helmet>
                <title>MealCage | My Rewards</title>
            </Helmet>

            <div className="text-center mb-12">
                <h1 className="text-3xl font-serif text-light tracking-widest mt-8 mb-2 uppercase">My Rewards</h1>
                <p className="text-light/60 font-sans tracking-wide">Earn points with every order and unlock exclusive benefits.</p>
            </div>

            {/* Main Status Card */}
            <div className="relative bg-dark-800 border border-white/5 rounded-2xl p-8 shadow-2xl mb-8 overflow-hidden" data-aos="fade-up">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-light/60 text-xs font-sans uppercase tracking-widest mb-2">Current Tier</p>
                        <div className="flex items-center gap-3 mb-1">
                            {getTierIcon(tier)}
                            <h2 className="text-4xl font-serif text-amber-400 tracking-widest">{tier}</h2>
                        </div>
                        {nextTier && <p className="text-light/60 text-sm font-sans">{ptsToNext} pts to {nextTier}</p>}
                        {!nextTier && <p className="text-primary text-sm font-sans font-bold">Max Tier Reached! 🎉</p>}
                    </div>

                    <div className="text-center">
                        <p className="text-light/60 text-xs font-sans uppercase tracking-widest mb-2">Available Points</p>
                        <p className="text-6xl font-sans font-light text-primary">{points.toLocaleString()}</p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col items-center gap-3">
                        <button
                            onClick={handleRedeem}
                            disabled={redeeming || points < 1}
                            className="btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 w-full md:w-auto px-8 uppercase flex items-center gap-2"
                        >
                            <FaGift /> {redeeming ? 'Redeeming...' : 'Redeem Points'}
                        </button>
                    </div>
                </div>

                {nextTier && (
                    <div className="relative z-10 mt-8">
                        <div className="flex justify-between text-xs text-light/50 font-sans mb-2">
                            <span>{tier}</span>
                            <span>{progress}% to {nextTier}</span>
                            <span>{nextTier}</span>
                        </div>
                        <div className="w-full bg-dark-900 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-amber-500 to-primary h-3 rounded-full transition-all duration-1000"
                                style={{ width: `${progress}% ` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Tier Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {tiers.map((t, i) => (
                    <div key={i} data-aos="fade-up" data-aos-delay={i * 80}
                        className={`bg - dark - 800 border rounded - 2xl p - 5 text - center transition - colors ${tier === t.name ? 'border-primary/50 shadow-[0_0_20px_rgba(212,175,55,0.15)]' : 'border-white/5'} `}>
                        <div className="text-3xl flex justify-center mb-2">{t.icon}</div>
                        <p className={`font - serif tracking - widest text - lg ${t.color} `}>{t.name}</p>
                        <p className="text-light/50 text-xs font-sans mt-1">{t.min.toLocaleString()}+ pts</p>
                    </div>
                ))}
            </div>

            {/* Points History */}
            <div className="bg-dark-800 border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl" data-aos="fade-up">
                <h3 className="text-xl font-serif text-light mb-6 tracking-wide">Points History</h3>
                {history.length === 0 ? (
                    <NoData heading="No reward history" text="When you earn or redeem points, it will show up here." />
                ) : (
                    <div className="flex flex-col gap-4">
                        {history.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                <div>
                                    <p className="text-light font-sans font-medium">{item.action}</p>
                                    <p className="text-light/50 text-xs font-sans mt-0.5">{new Date(item.date).toLocaleDateString()}</p>
                                </div>
                                <span className={`font - bold font - sans text - lg tracking - wide ${item.type === 'earn' ? 'text-green-400' : 'text-red-400'} `}>
                                    {item.type === 'earn' ? '+' : ''}{item.points} pts
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Rewards;
