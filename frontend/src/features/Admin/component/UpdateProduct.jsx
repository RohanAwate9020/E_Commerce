import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchProductsByIDAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const categories = useSelector(selectCategories);
  const brandsList = useSelector(selectBrands);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useParams().id;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchProductsByIDAsync(id));
  }, [dispatch, id]);

  const product = useSelector(selectProductById);


  useEffect(() => {
    if (product) {
      setValue("id", product.id);
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("brand", product.brand);
      setValue("category", product.category);
      setValue("price", product.price);
      setValue("discountPercentage", product.discountPercentage);
      setValue("stock", product.stock);
      setValue("minimumOrderQuantity", product.minimumOrderQuantity);
      setValue("warrantyInformation", product.warrantyInformation);
      setValue("shippingInformation", product.shippingInformation);
      setValue("returnPolicy", product.returnPolicy);
      setValue("thumbnail", product.thumbnail);
      setValue("images", product.images || []);
      setValue("rating", product.rating || 0);
      setValue("reviews", product.reviews || []);
    }
  }, [selectProductById, setValue]);

  const handleCancel = () => {
    reset();

    navigate("/admin/home"); // Redirect to the products page
  };

  const [inputs, setInputs] = useState([""]); // Start with one input
  const [images, setImages] = useState([]);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <div className="mx-auto mt-12 bg-white max-w-7xl p-12 sm:px-6 lg:px-8">
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = {
            ...data,
          };
          console.log("Product data:", product);
          dispatch(updateProductAsync(product));
          reset();
          // setInputs([""]); // Reset inputs to one empty field
          // setImages([]); // Reset images to an empty array
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

              <div className="sm:col-span-full">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Images
                </label>
                <div className="space-y-2">
                  {product?.images?.map((img, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        defaultValue={img}
                        {...register(`images.${index}`, {
                          required: "Please enter link of image.",
                        })}
                        className="flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        placeholder={`Image URL ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
