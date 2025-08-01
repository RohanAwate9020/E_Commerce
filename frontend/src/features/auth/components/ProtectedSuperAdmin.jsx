import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../authSlice';
import { fetchLoggedInUserAsync, selectUserInfo } from '../../user/userSlice';

function ProtectedSuperAdmin({children}) {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (user && !userInfo) {
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user, userInfo]);

  if (!user) return <Navigate to="/login" replace />;
  if (!userInfo) return <div>Loading...</div>;

  if (userInfo?.role !== "superadmin") {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedSuperAdmin