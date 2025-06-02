import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  deleteitemfromCartAsync,
  selectCartStatus,
  selectItems,
  UpdateCartAsync,
} from "./cartSlice";
import { discountPrice } from "../../app/constant";
import { selectProductListStatus } from "../product/productSlice";
import { Grid, InfinitySpin } from "react-loader-spinner";
import DeleteModal from "../common/DeleteModal";

export default function Cart() {
  const products = useSelector(selectItems);
  let Subtotal = 0;
  let TotalItems = 0;
  const dispatch = useDispatch();
  const status = useSelector(selectCartStatus);
  const [openModal, setopenModal] = useState(null);
  const [openModalId, setOpenModalId] = useState(null);
  // if (!products || !products.length) {
  //   return <Navigate to="/" replace />;
  // }

  const handleQuantity = (e, item) => {
    dispatch(UpdateCartAsync({ id:item.id, quantity: +e.target.value }));
  };

  // const handleDelete = (id) => {
  //   console.log(id);
  //   dispatch(deleteitemfromCartAsync(id));
  // };

  return (
    <>
      {/* { !products.length  && (<Navigate to="/" replace="true" />)} */}

      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        {status === "loading" ? (
          //  <Grid
          //  visible={true}
          //  height="80"
          //  width="80"
          //  color="#4fa94d"
          //  ariaLabel="grid-loading"
          //  radius="12.5"
          //  wrapperStyle={{}}
          //  wrapperClass="grid-wrapper"
          //  />
          <InfinitySpin
            visible={true}
            top="50%"
            left="50%"
            width="200"
            height="400"
            color="#4e46e5"
            ariaLabel="infinity-spin-loading"
          />
        ) : (
          <>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-3xl my-5 font-semibold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((item) => (
                    <li key={item?.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item?.product?.thumbnail}
                          alt={item?.product?.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to="#">{item?.product?.title}</Link>
                            </h3>
                            <p className="ml-4">$ {discountPrice(item?.product)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item?.product?.category}
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
                            {/* <DeleteModal
                              title={`Delete ${item.title} from Cart`}
                              message="Are you sure you want to delete this cart item ?"
                              dangerOption="Delete"
                              cancelOption="Cancel"
                              dangerAction={(e) => handleDelete(e, item.id)}
                              showModal={openModal === item.id}
                            ></DeleteModal> */}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              // onClick={(e) => setopenModal(item.id)}
                              onClick={() => setOpenModalId(item?.id)}
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
                  Subtotal += discountPrice(item?.product) * item?.quantity;
                })}
                <p>$ {Subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total items in Cart</p>
                {products.map((item) => {
                  TotalItems += item?.quantity;
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
          </>
        )}
      </div>

      <DeleteModal
        isOpen={openModalId !== null}
        onClose={() => setOpenModalId(null)}
        title="Delete item from cart"
        message="Are you sure you want to delete this item?"
        dangerOption="Delete"
        cancelOption="Cancel"
        onConfirm={() => {
          dispatch(deleteitemfromCartAsync(openModalId));
          setOpenModalId(null);
        }}
      />
    </>
  );
}
