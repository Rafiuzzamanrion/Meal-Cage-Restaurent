import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import HistoryCard from "./HistoryCard";
import { Helmet } from "react-helmet-async";
import Loader from "../../../Components/Shared/Loader";
import NoData from "../../../Components/Shared/NoData";
import { HiSearch, HiFilter, HiX } from "react-icons/hi";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = UseAxiosSecure();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const { data: payment = [], isLoading, refetch } = useQuery({
        queryKey: ['paymentHistory', user?.email, search, status],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentHistory?email=${user.email}&search=${search}&status=${status}`);
            return res.data;
        },
    });

    const handleClear = () => {
        setSearch("");
        setStatus("");
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-4 lg:px-8 pb-16">
            <Helmet>
                <title>MealCage | Order History</title>
            </Helmet>
            
            <div className="text-center mt-16 mb-12">
                <h1 className="text-4xl md:text-5xl font-serif text-light tracking-widest uppercase mb-4"
                    data-aos="fade-down"
                    data-aos-duration="1000">
                    Order History
                </h1>
                <div className="w-24 h-1 bg-primary mx-auto mb-6" data-aos="zoom-in" data-aos-delay="200" />
                <p className="text-light/50 font-sans text-sm md:text-base max-w-lg mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
                    Review your past culinary experiences and download invoices for your records.
                </p>
            </div>

            {/* Filter Section */}
            <div className="mb-12 flex flex-col md:flex-row gap-4 items-center bg-dark-800/50 p-4 rounded-2xl border border-white/5 shadow-xl" data-aos="fade-up">
                <div className="relative flex-1 w-full">
                    <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by Transaction ID or Food Name..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-light/90 font-sans focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    {search && (
                        <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-light/30 hover:text-primary transition-colors">
                            <HiX size={18} />
                        </button>
                    )}
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <HiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60" size={18} />
                        <select 
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-light/90 font-sans focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                        >
                            <option value="">All Statuses</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                </div>
            </div>

            {payment.length === 0 ? (
                <div className="py-20" data-aos="zoom-in">
                    <NoData 
                        heading={search || status ? "No results found" : "No Orders Found"} 
                        text={search || status ? "Try adjusting your filters or search terms." : "You haven't placed any orders yet. Time to treat yourself!"} 
                    />
                    {(search || status) && (
                        <div className="text-center mt-6">
                            <button onClick={handleClear} className="text-primary hover:underline font-sans text-sm uppercase tracking-widest">Clear all filters</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-10 w-full mb-12">
                    {
                        payment.map(paymentData => <HistoryCard key={paymentData._id} paymentData={paymentData}></HistoryCard>)
                    }
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;