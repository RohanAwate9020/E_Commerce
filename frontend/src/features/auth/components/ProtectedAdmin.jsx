import React, { useEffect } from 'react'
import { selectLoggedInUser } from '../../auth/authSlice'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUserAsync, selectUserInfo } from '../../user/userSlice';

export default function ProtectedAdmin({ children }) {
   const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

 useEffect(() => {
  if (!userInfo) {
    dispatch(fetchLoggedInUserAsync());
  }
}, [dispatch, userInfo]);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!userInfo) {
    return <div>Loading...</div>; // handle loading
  }

  if (userInfo.role !== "admin") {
    return <Navigate to="/home" replace={true} />;
  }

  return children;
}


