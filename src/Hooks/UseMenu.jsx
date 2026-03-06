import { useQuery } from '@tanstack/react-query'
import axios from "axios";
 
 
 const UseMenu = () =>{


    const {refetch, data: menu =[],isLoading:loading } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/menu`)
            return Array.isArray(res.data) ? res.data : [];
      },
});
    return [menu,refetch,loading]

 };


 export default UseMenu;





