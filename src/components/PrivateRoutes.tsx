import { Outlet, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
    const {user} = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <Box>
            <Navbar />
            <Outlet />
        </Box>
    )
}

export default PrivateRoutes;