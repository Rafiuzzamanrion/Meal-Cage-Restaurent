import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookingCard from "./BookingCard";
import { Helmet } from "react-helmet-async";


const ManageBookings = () => {
    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookingsHistory'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/bookingsHistory`);
            return res.data;
        }
    });

    return (
        <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 pb-16"
            data-aos="fade-up"
            data-aos-duration="600">
            <Helmet>
                <title>MealCage | Manage Bookings</title>
            </Helmet>
            <h1 className="text-3xl font-serif text-light tracking-widest text-center mt-12 mb-10 uppercase">
                All Bookings
            </h1>
            <div className="bg-dark-800 border border-white/5 rounded-2xl shadow-2xl p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {
                        bookings.map(booking => <BookingCard key={booking._id} booking={booking} refetch={refetch}></BookingCard>)
                    }
                </div>
            </div>

        </div>
    );
};

export default ManageBookings;