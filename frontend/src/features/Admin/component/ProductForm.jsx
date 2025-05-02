import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { createProductAsync, selectBrands, selectCategories } from "../../product/productSlice";
import { set, useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProductForm() {
  const categories = useSelector(selectCategories);
  const brandsList = useSelector(selectBrands);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // const [thumbnail, setThumbnail] = useState(null);
  // const handleCoverImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     setThumbnail(file); // store actual File object
  //   } else {
  //     setThumbnail(null);
  //   }
  // };
  // const [images, setImages] = useState([]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const newImage = {
  //       file,
  //       preview: URL.createObjectURL(file),
  //     };
  //     setImages((prev) => [...prev, newImage]);
  //   }
  // };

  const handleCancel =()=>{
    reset();
    setInputs([""]); // Reset inputs to one empty field
    setImages([]); // Reset images to an empty array
    navigate("/admin/home"); // Redirect to the products page
  }

  const [inputs, setInputs] = useState([""]); // Start with one input
  const [images, setImages] = useState([]);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleAddImage = (index) => {
    const url = inputs[index].trim();
    if (url !== "") {
      setImages((prev) => [...prev, url]);

      // Add another empty input field
      setInputs((prev) => [...prev, ""]);
    }
  };

  return (
    <div className="mx-auto mt-12 bg-white max-w-7xl p-12 sm:px-6 lg:px-8">
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = {
            ...data,
            images: [...images],
            rating: 0,
            reviews: [],
          };
          product.discountPercentage=+product.discountPercentage,
          product.stock=+product.stock,
          product.price=+product.price,
          product.minimumOrderQuantity=+product.minimumOrderQuantity,

            dispatch(createProductAsync(product));
            reset();
            setInputs([""]); // Reset inputs to one empty field
            setImages([]); // Reset images to an empty array
            console.error("Product created successfully");
            
          // checkUserAsync({ email: data.email, password: data.password })
        })}
      >
        <div className="space-y-12">
          <div className="">
            <h2 className="text-xl font-semibold text-gray-900">Add Product</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex w-full items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="title"
                      {...register("title", {
                        required: "Please enter product name.",
                      })}
                      type="text"
                      className=" w-full  py-1.5 px-3 text-base text-gray-900  focus:outline-none "
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "Please enter product description.",
                    })}
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a details of the product.
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="brand"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <input
                    id="brand"
                    {...register("brand", {
                      required: "Please enter product brand.",
                    })}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    {...register("category", {
                      required: "Please enter product category.",
                    })}
                  >
                    <option value="">-- Choose Category --</option>
                    {categories.map((category) => (
                      <option value={category.value}> {category.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    type="number"
                    {...register("price", {
                      required: "Please enter product price.",
                      min: 1,
                    })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Discount in %
                </label>
                <div className="mt-2">
                  <input
                    id="discountPercentage"
                    {...register("discountPercentage", {
                      required: "Please enter product discount in percentage.",
                      min: 0,
                      max: 100,
                    })}
                    type="number"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Available Stock
                </label>
                <div className="mt-2">
                  <input
                    id="stock"
                    {...register("stock", {
                      required: "Please enter product in stock.",
                      min: 0,
                    })}
                    type="number"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="minimumOrderQuantity"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Minimum Order Quantity
                </label>
                <div className="mt-2">
                  <input
                    id="minimumOrderQuantity"
                    {...register("minimumOrderQuantity", {
                      required: "Please enter product minimum order quantity.",
                      min: 1,
                    })}
                    type="number"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="warrantyInformation"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Warranty Information
                </label>
                <div className="mt-2">
                  <input
                    id="warrantyInformation"
                    {...register("warrantyInformation", {
                      required: "Please enter product warranty Information.",
                    })}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="shippingInformation"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Shipping Information
                </label>
                <div className="mt-2">
                  <input
                    id="shippingInformation"
                    {...register("shippingInformation", {
                      required: "Please enter product shipping Information.",
                    })}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="returnPolicy"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Return Policy
                </label>
                <div className="mt-2">
                  <input
                    id="returnPolicy"
                    {...register("returnPolicy", {
                      required:
                        "Please enter product return Policy Information.",
                    })}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Thumbnail Image
                </label>
                <div className="mt-2">
                  <input
                    id="thumbnail"
                    {...register("thumbnail", {
                      required: "Please enter link of thumbnail image.",
                    })}
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* <div className="sm:col-span-full">
                <label
                  htmlFor="images"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Images
                </label>
                <div className="mt-2">
                  <input
                    id="images"
                    name="images"
                    type="text"
                    
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <button
                  className=""
                  onClick={(e)=>handleImageChange(e.target.value)}>
                    Add Image
                  </button>
                </div>
              </div> */}

              <div className="sm:col-span-full">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Images
                </label>
                <div className="space-y-2">
                  {inputs.map((input, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        className="flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        placeholder={`Image URL ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleAddImage(index)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 
              Dirrect Image Upload Code
              <div className="col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 py-5">
                  <div className="text-center">
                    {thumbnail === null ? (
                      <div>
                        <svg
                          className="mx-auto size-12 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="mt-4 flex text-sm text-gray-600">
                          <label
                            htmlFor="thumbnail"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="thumbnail"
                              required="true"
                              name="thumbnail"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleCoverImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    ) : null}
                    {thumbnail && (
                      <div className="mt-4">
                        <img
                          src={thumbnail}
                          alt="thumbnail"
                          className="mx-auto max-h-48 rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-900"
                >
                  Images
                </label>

                <div className="mt-2 rounded-lg border border-dashed border-gray-900/25 py-5">
                  <div className="text-center">
                    {images.length === 0 && (
                      <div>
                        <svg
                          className="mx-auto size-12 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                          No images uploaded yet.
                        </p>
                      </div>
                    )}

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((img, index) => (
                        <img
                          key={index}

                          src={thumbnail}
                          alt={`Uploaded preview ${index}`}
                          className="mx-auto max-h-48 rounded-md"
                        />
                      ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        <span>Add Image</span>
                        <input
                          id="file-upload"
                          required="true"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>

                    <p className="mt-2 text-xs text-gray-600">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
