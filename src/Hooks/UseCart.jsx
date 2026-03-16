import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import UseAxiosSecure from './UseAxiosSecure'; // Import this


const UseCart = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = UseAxiosSecure(); 
    
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading && !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/carts?email=${user.email}`)
                return Array.isArray(res.data) ? res.data : [];
            } else {
                return JSON.parse(localStorage.getItem('guest-cart') || '[]');
            }
        },
    });
    return [cart, refetch]
};
export default UseCart;