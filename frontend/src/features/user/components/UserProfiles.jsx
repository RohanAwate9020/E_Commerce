import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUserInfo, updateUserAsync } from "../userSlice";
import { set, useForm } from "react-hook-form";

export default function UserProfiles() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddressForm, setshowAddressForm] = useState(false);

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("mobile", address.mobile);
    setValue("streetName", address.streetName);
    setValue("City", address.City);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };

  const handleAdd = (address) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses,address] };
    dispatch(updateUserAsync(newUser));
    setshowAddressForm(false);
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-3xl my-5 font-semibold tracking-tight text-gray-900">
              Name : {userInfo.name ? userInfo.name : "New User"}
            </h1>
            <h3 className="text-xl my-5 font-semibold tracking-tight text-red-900">
              Email : {userInfo?.email}
            </h3>
            
            {userInfo.role==="admin" &&
            <h3 className="text-xl my-5 font-semibold tracking-tight text-red-900">
               Role : {userInfo?.role}
            </h3>
            }

            <div className="border-t border-gray-200 px-4  sm:px-6">
              <button
                type="button"
                onClick={(e) => {
                  setshowAddressForm(true);
                  setSelectedEditIndex(-1);
                }}
                className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >Add New Address</button>
              {showAddressForm === true ? (
                    <form
                      noValidate
                      onSubmit={handleSubmit((data, index) => {
                        console.log(data);
                        handleAdd(data);
                        reset();
                      })}
                    >
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-3xl font-semibold text-gray-900">
                            Personal Information
                          </h2>
                          <p className="mt-1 text-base text-gray-600">
                            Use a permanent address where you can receive mail.
                          </p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="full-name"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  id="full-name"
                                  {...register("name", {
                                    required: "Name is required.",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", {
                                    required: "Email id is required.",
                                  })}
                                  type="email"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="mobile"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Mobile Number
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  id="mobile"
                                  maxLength={10}
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  {...register("mobile", {
                                    required: "Mobile Number is required.",
                                    pattern: {
                                      value: /^[0-9]{10}$/,
                                      message:
                                        "Mobile number must be exactly 10 digits.",
                                    },
                                  })}
                                  onInput={(e) => {
                                    e.target.value = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                  }}
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="streetName"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="streetName"
                                  {...register("streetName", {
                                    required: "Street Name is required.",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  id="city"
                                  {...register("City", {
                                    required: "City name is required.",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="state"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  id="state"
                                  {...register("state", {
                                    required: "State name is required.",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="pinCode"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  id="pinCode"
                                  maxLength={6}
                                  inputMode="numeric"
                                  {...register("pinCode", {
                                    required: "pinCode is required.",
                                  })}
                                  onInput={(e) => {
                                    e.target.value = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                  }}
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            type="button"
                            onClick={(e) => {
                              setshowAddressForm(false);
                              reset();
                            }}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                          
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Add Address
                          </button>
                        </div>
                        
                      </div>
                    </form>
                  ) : null}
              <p>Your Address</p>
              {userInfo?.addresses?.map((address, index) => (
                <div>
                  {selectedEditIndex === index ? (
                    <form
                      noValidate
                      onSubmit={handleSubmit((data, index) => {
                        console.log(data);
                        handleEdit(data,index);
                        reset();
                      })}
                    >
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-3xl font-semibold text-gray-900">
                            Personal Information
                          </h2>
                          <p className="mt-1 text-base text-gray-600">
                            Use a permanent address where you can receive mail.
                          </p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="full-name"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  id="full-name"
                                  {...register("name", {
                                    required: "Name is required.",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", {
                                    required: "Email id is required.",
                                  })}
                                  type="email"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="mobile"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Mobile Number
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  id="mobile"
                                  maxLength={10}
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  {...register("mobile", {
                                    required: "Mobile Number is required.",
                                    pattern: {
                                      value: /^[0-9]{10}$/,
                                      message:
                                        "Mobile number must be exactly 10 digits.",
                                    },
                                  })}
                                  onInput={(e) => {
                                    e.target.value = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                  }}
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="streetName"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="streetName"
                                  {...register("streetName", {
                                    required: "Street Name is required.",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  id="city"
                                  {...register("City", {
                                    required: "City name is required.",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="state"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  id="state"
                                  {...register("state", {
                                    required: "State name is required.",
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="pinCode"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  id="pinCode"
                                  maxLength={6}
                                  inputMode="numeric"
                                  {...register("pinCode", {
                                    required: "pinCode is required.",
                                  })}
                                  onInput={(e) => {
                                    e.target.value = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                  }}
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            type="button"
                            onClick={(e) => {
                              setSelectedEditIndex(-1);
                            }}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>
                       
                      </div>
                    </form>
                  ) : null}
                  <div className="flex justify-between gap-x-6 py-5 px-3">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto" htmlFor="address">
                        <p className="text-sm/6 font-semibold text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          {address.streetName}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          {address.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm/6 text-gray-900">
                        Phone: {address.mobile}
                      </p>
                      <p className="text-sm/6 text-gray-500">{address.City}</p>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col   sm:items-end">
                      <button
                        type="button"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                          handleEditForm(index);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="rounded-md  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={(e) => {
                          handleRemove(e, index);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
