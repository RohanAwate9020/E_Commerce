import React from 'react'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Protected({ children }) {
    const user = localStorage.getItem("user") || useSelector(selectLoggedInUser);

    if (!user) {
        return <Navigate to="/login" replace={true}/>;
    }
    
    return children;
}

export default Protected;
