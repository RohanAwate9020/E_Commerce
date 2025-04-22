import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { Link } from "react-router-dom";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch]);
  return (
    <div>
        <h1>My Orders</h1>
      {orders.map((order) => (
        <div>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-3xl my-5 font-semibold tracking-tight text-gray-900">
                Order #{order.id}
              </h1>
              <h3 className="text-xl my-5 font-semibold tracking-tight text-red-900">
                Order status : {order.status}
              </h3>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.products.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.images[0]}
                          alt={item.thumnails}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to="#">{item.title}</Link>
                            </h3>
                            <p className="ml-4">$ {item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.category}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty {item.quantity}
                            </label>
                          </div>
                          <div className="flex"></div>
                        </div>
                      </div>
                    </li>
                  ))}
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal </p>
                      <p>{order.totalAmount}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total items in Cart</p>

                      <p>{order.TotalItemsincart}</p>
                    </div>
                    
                    <div
                        
                        className="flex justify-between gap-x-6 py-5 px-3"
                      >
                        <p>Shipping Address</p>
                        <div className="flex min-w-0 gap-x-4">
                          
                          <div className="min-w-0 flex-auto" htmlFor="address">
                            <p className="text-sm/6 font-semibold text-gray-900">
                              {order?.selectedAddress?.name}
                            </p>
                            <p className="mt-1 truncate text-xs/5 text-gray-500">
                              {order?.selectedAddress?.streetName}
                            </p>
                            <p className="mt-1 truncate text-xs/5 text-gray-500">
                              {order?.selectedAddress?.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm/6 text-gray-900">
                            Phone: {order?.selectedAddress?.mobile}
                          </p>
                          <p className="text-sm/6 text-gray-500">
                            {order?.selectedAddress?.City}
                          </p>
                        </div>
                      </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
