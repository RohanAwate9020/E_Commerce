import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductList from "./features/product-list/ProductList";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import {createBrowserRouter,RouterProvider,Route,Link} from 'react-router-dom';
import SignupPage from "./pages/SignupPage";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";

function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/login",
      element:<LoginPage/>
    },
    {
      path:"/signup",
      element:<SignupPage/>
    },
    {
      path:"/cart",
      element:<CartPage/>
    },
  ]);

  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
