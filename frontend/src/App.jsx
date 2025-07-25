import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailsPage";
import Protected from "./features/auth/components/Protected";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice"; // assuming this selector exists
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import AdminHome from "./pages/AdminHome";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductDetailPage from "./pages/AdminProductDetailsPage";
import AdminProdcutFormPage from "./pages/AdminProdcutFormPage";
import AdminUpdateProduct from "./pages/adminUpdateProduct";
import AdminOrdersPages from "./pages/AdminOrdersPages";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Navbar from "./features/Navbar";
import Footer from "./features/common/Footer";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

// import { selectLoggedInUser } from "../authSlice";

// const router = createBrowserRouter([
//   {
//     path: "/home",
//     element: (
//       <Protected>
//         <Home />
//       </Protected>
//     ),
//   },
//   {
//     path: "/admin/home",
//     element: (
//       <ProtectedAdmin>
//         <AdminHome />
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/admin/orders",
//     element: (
//       <ProtectedAdmin>
//         <AdminOrdersPages />
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/signup",
//     element: <SignupPage />,
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPasswordPage />,
//   },
//   {
//     path: "/cart",
//     element: (
//       <Protected>
//         <CartPage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/checkout",
//     element: (
//       <Protected>
//         <Checkout />
//       </Protected>
//     ),
//   },
//   {
//     path: "/product-detail/:id",
//     element: (
//       <Protected>
//         <ProductDetailPage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/admin/product-detail/:id",
//     element: (
//       <ProtectedAdmin>
//         <AdminProductDetailPage />
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/admin/product-form",
//     element: (
//       <ProtectedAdmin>
//         <AdminProdcutFormPage />
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/admin/update-product/:id",
//     element: (
//       <ProtectedAdmin>
//         <AdminUpdateProduct />
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "*",
//     element: <PageNotFound />,
//   },
//   {
//     path: "/order-success/:id",
//     element: (
//       <Protected>
//         <OrderSuccessPage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/orders",
//     element: (
//       <Protected>
//         <UserOrdersPage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/profile",
//     element: (
//       <Protected>
//         <UserProfilePage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/reset-password",
//     element: <ResetPasswordPage />,
//   },
// ]);
import Layout from "./Layout";

// Alert options
const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wraps with Navbar + Footer
    children: [
      {
        path: "home",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "cart",
        element: (
          <Protected>
            <CartPage />
          </Protected>
        ),
      },
      {
        path: "checkout",
        element: (
          <Protected>
            <Checkout />
          </Protected>
        ),
      },
      {
        path: "product-detail/:id",
        element: (
          <Protected>
            <ProductDetailPage />
          </Protected>
        ),
      },
      {
        path: "orders",
        element: (
          <Protected>
            <UserOrdersPage />
          </Protected>
        ),
      },
      {
        path: "profile",
        element: (
          <Protected>
            <UserProfilePage />
          </Protected>
        ),
      },
      {
        path: "order-success/:id",
        element: (
          <Protected>
            <OrderSuccessPage />
          </Protected>
        ),
      },
      {
        path: "admin/home",
        element: (
          <ProtectedAdmin>
            <AdminHome />
          </ProtectedAdmin>
        ),
      },
      {
        path: "admin/orders",
        element: (
          <ProtectedAdmin>
            <AdminOrdersPages />
          </ProtectedAdmin>
        ),
      },
      {
        path: "admin/product-detail/:id",
        element: (
          <ProtectedAdmin>
            <AdminProductDetailPage />
          </ProtectedAdmin>
        ),
      },
      {
        path: "admin/product-form",
        element: (
          <ProtectedAdmin>
            <AdminProdcutFormPage />
          </ProtectedAdmin>
        ),
      },
      {
        path: "admin/update-product/:id",
        element: (
          <ProtectedAdmin>
            <AdminUpdateProduct />
          </ProtectedAdmin>
        ),
      },
    ],
  },
  // Routes outside the layout
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <>
   
      <div className="App">
        {userChecked && (
          <Provider template={AlertTemplate} {...options}>
            <RouterProvider router={router} />
          </Provider>
        )}
      </div>
      
    </>
  );
}

export default App;
