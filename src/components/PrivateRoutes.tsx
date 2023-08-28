import { Outlet, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
    const {user} = useAuth();
    if (!user) {
        return <Navigate to="/login"/>;
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