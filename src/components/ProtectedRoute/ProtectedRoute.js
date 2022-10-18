import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children, loading }) => {
    if (loading) return "Загрузка"
    return loggedIn ? children : <Navigate to="/" />
}

export default ProtectedRoute;