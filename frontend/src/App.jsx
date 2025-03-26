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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
      element: <CartPage />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/product-detail/:id",
      element: <ProductDetailPage />,
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
