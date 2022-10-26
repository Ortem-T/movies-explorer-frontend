import React from 'react';
import { Navigate } from "react-router-dom";
import Preloader from '../../components/Preloader/Preloader';

const ProtectedRoute = ({ loggedIn, children, loading }) => {
    if (loading) return <Preloader />
    return loggedIn ? children : <Navigate to="/" />
}

export default ProtectedRoute;