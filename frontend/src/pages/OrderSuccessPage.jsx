import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder } from "../features/orders/orderSlice";

function OrderSuccessPage() {
    let orderId=useParams().id;
    const user=useSelector(selectLoggedInUser);

const dispatch=useDispatch();
useEffect(()=>{
  dispatch(resetCartAsync(user.id));
  dispatch(resetOrder());
},[dispatch,user])

  return (
    <div>
        {orderId == 0 && <Navigate to="/home" replace={true}/>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-4xl font-semibold text-indigo-600">
            Your order successfully placed.
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 ">
            You can check your order status in your Account/My Orders.
          </p>
          </p>
          <h1 className="mt-4 font-semibold tracking-tight text-balance text-gray-900 ">
            Your Order Number #{orderId}
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/home"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderSuccessPage;
