import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  deleteitemfromCartAsync,
  selectItems,
  UpdateCartAsync,
} from "./cartSlice";
import { discountPrice } from "../../app/constant";

export default function Cart() {
  const products = useSelector(selectItems);
  let Subtotal = 0;
  let TotalItems = 0;
  const dispatch = useDispatch();

  // if (!products || !products.length) {
  //   return <Navigate to="/" replace />;
  // }

  const handleQuantity = (e, item) => {
    dispatch(UpdateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteitemfromCartAsync(id));
  };

  return (
    <>
      {/* { !products.length  && (<Navigate to="/" replace="true" />)} */}

      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-3xl my-5 font-semibold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((item) => (
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
                        <p className="ml-4">$ {discountPrice(item)}</p>
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
                          Qty
                        </label>
                        <select
                          className="p-2"
                          onChange={(e) => handleQuantity(e, item)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            {products.map((item) => {
              Subtotal += discountPrice(item) * item.quantity;
            })}
            <p>$ {Subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total items in Cart</p>
            {products.map((item) => {
              TotalItems += item.quantity;
            })}
            <p>{TotalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/home">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
