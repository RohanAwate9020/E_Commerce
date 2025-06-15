import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../authSlice';
import { selectUserInfo, fetchLoggedInUserAsync } from '../../user/userSlice';

function Protected({ children }) {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);  // just token presence
  const userInfo = useSelector(selectUserInfo);  // contains role

  useEffect(() => {
    if (user && !userInfo) {
      dispatch(fetchLoggedInUserAsync()); // fetch role and profile
    }
  }, [dispatch, user, userInfo]);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in, but not a "user" role
  if (user && userInfo?.role !== 'user') {
    return <Navigate to="/admin/home" replace />;
  }

  // All good, allow access
  return children;
}

export default Protected;
