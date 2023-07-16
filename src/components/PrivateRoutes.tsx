import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
    const { user } = useAuth();
    if(user) return <Outlet />;
    else return <Navigate to = "/login" />;
}

export default PrivateRoutes;
