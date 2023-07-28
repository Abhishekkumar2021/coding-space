import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";



const PrivateRoutes = () => {
    const {user} = useAuth();
    const {pathname} = useLocation()

    if (!user) {
        return <Navigate to="/login" state={pathname}/>;
    }
    if(!user.emailVerified){
        return <Navigate to="/verify-email" />;
    }
    return (
        <Box>
            <Navbar />
            <Outlet />
        </Box>
    )
}

export default PrivateRoutes;