import {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import axios from "axios";
import {Typography} from "@mui/material";

export default function ProtectedRoutes(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("api/players/me", { withCredentials: true }) // Assuming session cookies
            .then((res) => {
                setIsAuthenticated(res.status === 200);
                setLoading(false);
            })
            .catch(() => {
                setIsAuthenticated(false);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Typography variant={"h3"}>Loading...</Typography>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}