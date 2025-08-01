// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import { selectLoggedInUser } from '../authSlice';
// import { selectUserInfo, fetchLoggedInUserAsync } from '../../user/userSlice';

// function Protected({ children }) {
//   const dispatch = useDispatch();
//   const user = useSelector(selectLoggedInUser);  // just token presence
//   // const userInfo = useSelector(selectUserInfo);  // contains role

//   useEffect(() => {
//     if (user ) {
//       dispatch(fetchLoggedInUserAsync()); // fetch role and profile
//     }
//   }, [dispatch, user]);

//   // Not logged in
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // // Logged in, but not a "user" role
//   // if (user && userInfo?.role !== 'user') {
//   //   return <Navigate to="/admin/home" replace />;
//   // }

//   // All good, allow access
//   return children;
// }

// export default Protected;
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";
import {
  fetchLoggedInUserAsync,
  selectUserInfo,
} from "../../user/userSlice";

function Protected({ children }) {
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

  // ❗ Only allow "user" role here
  if (userInfo?.role === "admin") {
    return <Navigate to="/admin/home" replace />;
  }else if (userInfo?.role === "seller") {
    return <Navigate to="/seller/home" replace />;  
  } else if (userInfo?.role === "superadmin") {
    return <Navigate to="/superadmin/home" replace />; 
  }

  return children;
}

export default Protected;
