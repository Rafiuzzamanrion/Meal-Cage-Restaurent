import { useContext, useEffect, useMemo } from "react"
import { AuthContext } from "../Providers/AuthProvider"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UseAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const axiosSecure = useMemo(() => axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    }), []);

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `bearer ${token}`;
            }
            return config;
        });

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logOut();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        // Clean up interceptors if the instance ever changes (though it shouldn't with [] deps)
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };

    }, [logOut, navigate, axiosSecure]);

    return [axiosSecure];
};

export default UseAxiosSecure;












