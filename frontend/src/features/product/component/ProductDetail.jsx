import React from "react";

import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByIDAsync,
  selectProductById,
  selectProductListStatus,
} from "../productSlice";
import { useParams } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/authSlice";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import { v4 as uuidv4 } from "uuid";
import { discountPrice } from "../../../app/constant";
import { set } from "react-hook-form";
import { useAlert } from "react-alert";
import { InfinitySpin } from "react-loader-spinner";

const colors = [
  {
    name: "White",
    class: "bg-white",
    selectedClass: "ring-gray-400",
    id: "white",
  },
  {
    name: "Gray",
    class: "bg-gray-200",
    selectedClass: "ring-gray-400",
    id: "gray",
  },
  {
    name: "Black",
    class: "bg-gray-900",
    selectedClass: "ring-gray-900",
    id: "black",
  },
];
const sizes = [
  { name: "XXS", inStock: false, id: "xxs" },
  { name: "XS", inStock: true, id: "xs" },
  { name: "S", inStock: true, id: "s" },
  { name: "M", inStock: true, id: "m" },
  { name: "L", inStock: true, id: "l" },
  { name: "XL", inStock: true, id: "xl" },
  { name: "2XL", inStock: true, id: "2xl" },
  { name: "3XL", inStock: true, id: "3xl" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const items = useSelector(selectItems);
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);
  const [imgSelectIndex, setimgSelectIndex] = useState(0);

  const handleCart = (e) => {
    e.preventDefault();
    console.log("Adding to cart", items);
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      dispatch(
        addToCartAsync({
          quantity: 1,
          product: product.id,
          color: selectedColor,
          size: selectedSize,
          price: discountPrice(product),
        })
      );
      alert.success("Item added to cart");
    } else {
      alert.error("Item already in cart");
    }
  };

  const handleImageIndex = (index) => {
    setimgSelectIndex(index);
  };

  useEffect(() => {
    dispatch(fetchProductsByIDAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 min-h-full">
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
        product && (
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
                          className={`aspect-3/2 w-20  rounded-lg object-cover  hover:scale-110 transition-transform duration-300 cursor-pointer border-2 ${
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
                              ? "text-gray-900"
                              : "text-gray-200",
                            "size-5 shrink-0"
                          )}
                        />
                      ))}
                    </div>
                    <p className=" text-gray-900">
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
                <div className="">
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Details:
                    </h2>

                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <div className="mt-4">
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-sm"
                      >
                        {product.highlights &&
                          product.highlights.map((highlight) => (
                            <li key={highlight} className="text-gray-400">
                              <span className="text-gray-600">{highlight}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <form className="mt-10">
                  {/* Colors */}
                  {product.colors !== null && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Color
                      </h3>

                      <fieldset aria-label="Choose a color" className="mt-4">
                        <RadioGroup
                          value={selectedColor}
                          onChange={setSelectedColor}
                          className="flex items-center gap-x-3 "
                        >
                          {colors.map((color) => (
                            <Radio
                              key={color.name}
                              value={color}
                              aria-label={color.name}
                              className={classNames(
                                color.selectedClass,
                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1  hover:scale-110 transition-transform duration-300"
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
                  {product.sizes.length !== 0 && (
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
                          
                          {sizes.map((size) => (
                            <Radio
                              key={size.name}
                              value={size}
                              disabled={!size.inStock}
                              className={classNames(
                                product.sizes.some((p) => p.id === size.id)
                                  ? "cursor-pointer bg-white text-gray-900 shadow-xs"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                " hover:scale-105 transition-transform duration-300 group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-100 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6"
                              )}
                            >
                              {console.log(size in product.sizes)}
                              <span>{size.name}</span>
                              {product.sizes.some((p) => p.id === size.id) ? (
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
                                </button> */}

                  <button
                    onClick={handleCart}
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                  >
                    Add to cart
                  </button>
                </form>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ProductDetail;
