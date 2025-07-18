import React from "react";

import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByIDAsync,
  selectProductById,
} from "../../product/productSlice";
import { Link, useParams } from "react-router-dom";
import { addToCartAsync } from "../../cart/cartSlice";
import { v4 as uuidv4 } from "uuid";
import { discountPrice } from "../../../app/constant";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const product = useSelector(selectProductById);

  console.log("Product Detail", product);
  const dispatch = useDispatch();
  const params = useParams();
  const [imgSelectIndex, setimgSelectIndex] = useState(0);

  const handleCart = (e) => {
    dispatch(addToCartAsync({ ...product, quantity: 1 }));
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(fetchProductsByIDAsync(params.id));
  }, [dispatch, params.id]);

  const handleImageIndex = (index) => {
    setimgSelectIndex(index);
  };

  return (
    <div className="bg-white mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 min-h-full">
      {product && (
        <div className="px-6 pt-6 grid grid-cols-[4fr_3fr] gap-12">
          <div className="flex flex-col gap-4">
            {/* Image gallery */}
            {(product?.images).length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={product.images[imgSelectIndex]}
                  className="aspect-3/2  h-[50vh] w-[80vh]  "
                  alt="Selected product"
                />
              </div>
            ) : (
              <div className="">
                <nav aria-label="Breadcrumb"></nav>
                <div className="flex gap-4">
                  {/* Thumbnail Preview (Left Side) */}
                  <div className="flex flex-col gap-2">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        className={`aspect-3/2 w-20  rounded-lg object-cover cursor-pointer border-2 ${
                          imgSelectIndex === index
                            ? "border-indigo-600"
                            : "border-transparent"
                        }`}
                        onClick={() => handleImageIndex(index)}
                        alt={`Thumbnail ${index}`}
                      />
                    ))}
                  </div>

                  {/* Selected Image (Right Side) */}
                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src={product.images[imgSelectIndex]}
                      className="aspect-3/2  h-[50vh] w-[80vh]  "
                      alt="Selected product"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4  pb-16 sm:px-6 ">
            {/* Options */}
            <div className="mt-4  lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 pb-5">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                  {product.title}
                </h1>
              </div>
              <span className="flex items-center gap-4 ">
                <p className="text-2xl tracking-tight text-gray-900 font-semibold">
                  ₹{discountPrice(product)}
                </p>
                <p className="text-l line-through tracking-tight text-gray-400">
                  ${product.price}
                </p>
                <p className="text-green-900 font-semibold">
                  {product.discountPercentage}% off
                </p>
              </span>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          product.rating > rating
                            ? "text-indigo-600"
                            : "text-gray-200",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className=" text-gray-900">
                    {" "}
                    {product.rating} out of 5 stars
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Brand:</span>
                  <span>{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Stock:</span>
                  <span>
                    {product.stock > 0
                      ? `${product.stock} available`
                      : "Out of Stock"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Min Order:</span>
                  <span>1 unit</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Warranty:</span>
                  <span>{product.warrantyInformation || "1 year"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Shipping:</span>
                  <span>Free shipping</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Return Policy:</span>
                  <span>7 days return</span>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-indigo-900">
                  Details:
                </h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="mt-10">
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights &&
                      product.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                {(product?.colors).length !== 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <fieldset aria-label="Choose a color" className="mt-4">
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="flex items-center gap-x-3"
                      >
                        {product?.colors.map((color) => (
                          <Radio
                            key={color.name}
                            value={color}
                            aria-label={color.name}
                            className={classNames(
                              color.selectedClass,
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1"
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.class,
                                "size-8 rounded-full border border-black/10"
                              )}
                            />
                          </Radio>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>
                )}

                {/* Sizes */}
                {(product?.sizes).length !== 0 && (
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>

                    <fieldset aria-label="Choose a size" className="mt-4">
                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                      >
                        {product?.sizes.map((size) => (
                          <Radio
                            key={size.name}
                            value={size}
                            disabled={!size.inStock}
                            className={classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-xs"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6"
                            )}
                          >
                            <span>{size.name}</span>
                            {size.inStock ? (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  stroke="currentColor"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  className="absolute inset-0 size-full stroke-2 text-gray-200"
                                >
                                  <line
                                    x1={0}
                                    x2={100}
                                    y1={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </Radio>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>
                )}
                {/* Description and details */}

                {/* <button
              onClick={handleCart}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                Add to cart
              </button> */}
                <Link
                  to="/admin/home"
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                >
                  Go Back to Home Page
                </Link>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
