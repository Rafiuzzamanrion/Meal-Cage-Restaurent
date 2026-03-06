import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const BookingCard = ({ booking }) => {
    const { _id, email, price, quantity, guests, status } = booking;
    const displayQuantity = quantity || guests || 0;
    const displayPrice = price || 0;
    const [currentStatus, setCurrentStatus] = useState(status || 'pending');
    const [delivering, setDelivering] = useState(false);
    const queryClient = useQueryClient();
    const [axiosSecure] = UseAxiosSecure();

    const handleDeliver = async () => {
        if (currentStatus === 'delivered') return;

        const result = await Swal.fire({
            title: 'Mark as Delivered?',
            text: `Confirm delivery for booking by ${email}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d4af37',
            cancelButtonColor: '#555',
            confirmButtonText: 'Confirm Delivery',
            background: '#1a1a1a',
            color: '#f5f5f5',
        });

        if (!result.isConfirmed) return;

        setDelivering(true);
        try {
            const res = await axiosSecure.patch(
                `/bookingsHistory/${_id}`,
                { status: 'delivered' }
            );
            if (res.data?.status === 'delivered' || res.status === 200) {
                setCurrentStatus('delivered');
                queryClient.invalidateQueries(['bookings']);
                toast.success('Successfully delivered!', { theme: "dark" });
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message, { theme: "dark" });
        } finally {
            setDelivering(false);
        }
    };

    return (
        <div data-aos="fade-up" data-aos-duration="600" className="h-full">
            <div className="flex flex-col justify-between h-full bg-dark-900 border border-white/5 p-6 rounded-2xl shadow-xl hover:border-white/10 transition-colors group">
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="text-light/60 text-xs font-bold uppercase tracking-widest">User</span>
                        <span className="text-light font-sans truncate max-w-[200px]" title={email}>{email}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="text-light/60 text-xs font-bold uppercase tracking-widest">Quantity</span>
                        <span className="text-light font-sans font-bold">{displayQuantity}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="text-light/60 text-xs font-bold uppercase tracking-widest">Status</span>
                        <span className={`font-sans font-bold uppercase text-xs tracking-widest px-3 py-1 rounded-full ${currentStatus === 'delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'}`}>
                            {currentStatus}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-light/60 text-xs font-bold uppercase tracking-widest relative top-1">Price</span>
                        <span className="text-primary font-bold text-2xl tracking-wider">${displayPrice}</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={handleDeliver}
                        disabled={currentStatus === 'delivered' || delivering}
                        className={`btn rounded-none w-full uppercase tracking-widest font-sans transition-all duration-300 ${currentStatus === 'delivered'
                            ? 'btn-disabled border-green-500/30 text-green-400 bg-green-500/10 cursor-not-allowed'
                            : 'btn-outline border-primary text-primary hover:bg-primary hover:text-dark-900'
                            }`}
                    >
                        {delivering ? <span className="loading loading-spinner loading-sm" /> : currentStatus === 'delivered' ? '✓ Delivered' : 'Deliver'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;