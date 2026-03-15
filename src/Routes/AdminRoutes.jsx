import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";
import { AuthContext } from "../Providers/AuthProvider";
import Loader from "../Components/Shared/Loader";


const AdminRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation();

    if (loading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to={'/'} state={{ from: location }} replace></Navigate>
    }

    if (isAdminLoading) {
        return <Loader />
    }

    if (isAdmin) {
        return children;
    }

    return <Navigate to={'/'} state={{ from: location }} replace></Navigate>
};

export default AdminRoutes;