import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Shared/Loader";


const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <Loader />
    }

    if (user) {
        return children;
    }
    else return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>

};

export default PrivateRoutes;