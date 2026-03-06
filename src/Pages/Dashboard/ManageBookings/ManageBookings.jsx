import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import BookingCard from "./BookingCard";
import { Helmet } from "react-helmet-async";
import Loader from "../../../Components/Shared/Loader";
import NoData from "../../../Components/Shared/NoData";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const ManageBookings = () => {
    const [axiosSecure] = UseAxiosSecure();
    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookingsHistory'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookingsHistory');
            return res.data;
        }
    });

    if (bookings.length === 0) {
        return (
            <div className="w-full max-w-4xl mx-auto px-4 lg:px-8 pb-16">
                <Helmet>
                    <title>MealCage | Manage Bookings</title>
                </Helmet>
                <SectionTitle heading="Manage Bookings" subHeading="Review all reservations"></SectionTitle>
                <NoData heading="No Bookings Found" text="There are currently no table reservations." />
            </div>
        )
    }

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