import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { resetPasswordAsync, selectPasswordReset } from "../authSlice";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../../assets/cmpLogoRed.png"; // Adjust the path as necessary

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");

  console.log("infoDetails", { token, email });
  const passwordReset = useSelector(selectPasswordReset);
  const dispatch = useDispatch();

  return (
    <>
     {(token && email)?<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-15 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Enter new password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(resetPasswordAsync({token:token,email:email,password:data.password}));
            })}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Please enter correct password",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message:
                        "Password must have at least 8 characters, one uppercase, one lowercase, and one number.",
                    },
                  })}
                  type="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.password && (
                  <p className="text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required.",
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "Passwords not matching.",
                  })}
                  type="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {passwordReset ? (
                  <p style={{ color: "green" }}>
                    Password changed successfully!
                  </p>
                ) : (
                  <p style={{ color: "red" }}>
                    Invalid Link
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Send me back to{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      :<p style={{ color: "red" }}>Incorrect Link</p>}
    </>
  );
}
