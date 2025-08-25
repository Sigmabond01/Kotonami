// src/components/RequireAuth.js
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.accessToken
            ? <Outlet /> // If logged in, show the child components
            : <Navigate to="/login" state={{ from: location }} replace /> // Otherwise, redirect to login
    );
};

export default RequireAuth;