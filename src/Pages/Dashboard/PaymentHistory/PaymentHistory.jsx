import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import HistoryCard from "./HistoryCard";
import { Helmet } from "react-helmet-async";
import Loader from "../../../Components/Shared/Loader";
import NoData from "../../../Components/Shared/NoData";



const PaymentHistory = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = UseAxiosSecure();
    const { data: payment = [], isLoading } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentHistory?email=${user.email}`);
            return res.data;
        },
    })

    console.log(payment)

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

            {payment.length === 0 ? (
                <NoData heading="No Orders Found" text="You haven't placed any orders yet. Time to treat yourself!" />
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