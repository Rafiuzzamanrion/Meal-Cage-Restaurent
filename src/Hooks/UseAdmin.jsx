import {useContext} from "react";
import {AuthContext} from "../Providers/AuthProvider";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";


const UseAdmin = () => {
    const {user,loading} = useContext(AuthContext);
    
    // ========= for jwt ==========
    const token = localStorage.getItem('access-token')
    
    // ======= here data is destructured to a cart =[] array ======== if we want,we can use data directly by using map function

    // ===== here we load specific data by filtering email =========
    const {data: isAdmin,isLoading:isAdminLoading } = useQuery({
        queryKey: ['isAdmin',user?.email],
        enabled:!loading,
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/admin/${user?.email}`,{
                headers:{authorization:`bearer ${token}`}
            })

            return res.data.admin;
      },
});
    return [isAdmin,isAdminLoading]


};

export default UseAdmin;