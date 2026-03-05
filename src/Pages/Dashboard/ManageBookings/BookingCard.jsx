import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const BookingCard = ({ booking }) => {
    const { _id, email, price, quantity, status } = booking;
    const [currentStatus, setCurrentStatus] = useState(status || 'pending');
    const [delivering, setDelivering] = useState(false);
    const queryClient = useQueryClient();

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
            const token = localStorage.getItem('access-token');
            const res = await axios.patch(
                `${import.meta.env.VITE_API_BASE_URL}/bookingsHistory/${_id}`,
                { status: 'delivered' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data?.status === 'delivered' || res.status === 200) {
                setCurrentStatus('delivered');
                queryClient.invalidateQueries(['bookings']);
                Swal.fire({
                    title: 'Delivered!',
                    icon: 'success',
                    background: '#1a1a1a',
                    color: '#f5f5f5',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({ title: 'Error', text: err.message, icon: 'error', background: '#1a1a1a', color: '#f5f5f5' });
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
                        <span className="text-light font-sans font-bold">{quantity}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="text-light/60 text-xs font-bold uppercase tracking-widest">Status</span>
                        <span className={`font-sans font-bold uppercase text-xs tracking-widest px-3 py-1 rounded-full ${currentStatus === 'delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'}`}>
                            {currentStatus}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-light/60 text-xs font-bold uppercase tracking-widest relative top-1">Price</span>
                        <span className="text-primary font-bold text-2xl tracking-wider">${price}</span>
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