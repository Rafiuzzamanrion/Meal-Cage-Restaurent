
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import axios from 'axios';
// import UseAxiosSecure from './UseAxiosSecure';


const UseCart = () => {
    const { user } = useContext(AuthContext);
    // ========= for jwt ==========
    const token = localStorage.getItem('access-token')


    // ======= here data is destructured to a cart =[] array ======== if we want,we can use data directly by using map function

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            if (user?.email) {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/carts?email=${user.email}`, {
                    headers: { authorization: `bearer ${token}` }
                })
                return Array.isArray(res.data) ? res.data : [];
            } else {
                return JSON.parse(localStorage.getItem('guest-cart') || '[]');
            }
        },
    });
    return [cart, refetch]
};
export default UseCart;