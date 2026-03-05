import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import HistoryCard from "./HistoryCard";
import { Helmet } from "react-helmet-async";



const PaymentHistory = () => {
    const { user } = useContext(AuthContext)
    const { data: payment = [] } = useQuery({
        queryKey: ['paymentHistory', user.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/paymentHistory?email=${user.email}`);
            return res.data;
        },
    })

    console.log(payment)





    return (
        <div className="w-full max-w-4xl mx-auto px-4 lg:px-8 pb-16">
            <Helmet>
                <title>MealCage | Payment History</title>
            </Helmet>
            <h1 className="text-3xl font-serif text-light tracking-widest text-center mt-12 mb-8 uppercase"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="800">Payment History</h1>
            <div className="flex flex-col gap-6 w-full">
                {
                    payment.map(paymentData => <HistoryCard key={paymentData._id} paymentData={paymentData}></HistoryCard>)
                }
            </div>
        </div>
    );
};

export default PaymentHistory;