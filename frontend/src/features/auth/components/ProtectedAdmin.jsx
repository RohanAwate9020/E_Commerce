import React from 'react'
import { selectLoggedInUser } from '../../auth/authSlice'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function ProtectedAdmin({ children }) {
    const user = localStorage.getItem("user") || useSelector(selectLoggedInUser);

    if (!user) {
        return <Navigate to="/login" replace={true}/>;
    }
    if ( user !== "admin") {
        return <Navigate to="/home" replace={true}/>;
    }
    
    return children;
}


