import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import { store } from "./app/store";
import { Provider } from "react-redux";
import ProductDetail from "./features/product/component/ProductDetail";
import ProductDetailPage from "./pages/ProductDetailsPage";
import Protected from "./features/auth/components/Protected";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protected><Home ></Home></Protected>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/cart",
      element: <Protected><CartPage></CartPage></Protected>,
    },
    {
      path: "/checkout",
      element: <Protected><Checkout ></Checkout ></Protected>,
    },
    {
      path: "/product-detail/:id",
      element: <Protected><ProductDetailPage ></ProductDetailPage></Protected>,
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
