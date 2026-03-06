import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet-async";
import Loader from "../../../Components/Shared/Loader";
import NoData from "../../../Components/Shared/NoData";

const ReservationHistory = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = UseAxiosSecure();
    const { data: reservations = [], isLoading } = useQuery({
        queryKey: ['reservationHistory', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reservationHistory?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 lg:px-8 pb-16">
            <Helmet>
                <title>MealCage | Reservation History</title>
            </Helmet>
            <h1 className="text-3xl font-serif text-light tracking-widest text-center mt-12 mb-8 uppercase"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="800">Reservation History</h1>

            {reservations.length === 0 ? (
                <NoData heading="No Reservations Found" text="You haven't booked any tables yet." />
            ) : (
                <div className="flex flex-col gap-6 w-full">
                    {reservations.map(res => (
                        <div key={res._id} data-aos="fade-up" data-aos-duration="600">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-dark-800 border border-white/5 p-6 rounded-2xl shadow-xl hover:border-white/10 transition-colors gap-4">
                                <div className="flex-1">
                                    <p className="text-light/80 font-sans tracking-wide">
                                        <span className="font-bold text-light uppercase text-sm mr-2">Date:</span>
                                        {res.date}
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-light/80 font-sans tracking-wide">
                                        <span className="font-bold text-light uppercase text-sm mr-2">Time:</span>
                                        <span className="text-primary">{res.time}</span>
                                    </p>
                                </div>
                                <div className="flex-2 md:text-center text-left">
                                    <p className="text-light/80 font-sans tracking-wide">
                                        <span className="font-bold text-light uppercase text-sm mr-2">Status:</span>
                                        <span className={`font-bold ${res.status === 'confirmed' ? 'text-green-500' : res.status === 'cancelled' ? 'text-red-500' : 'text-yellow-500'}`}>
                                            {res.status || 'Pending'}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex-1 text-left md:text-right">
                                    <p className="text-light/80 font-sans tracking-wide">
                                        <span className="font-bold text-light uppercase text-sm mr-2">Name:</span>
                                        {res.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReservationHistory;
