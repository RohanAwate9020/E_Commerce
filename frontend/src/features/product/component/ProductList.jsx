import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  fetchAllProductsAsync,
  fetchProductsByFiltersAsync,
  selectTotalItems,
  selectBrands,
  selectCategories,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  selectProductListStatus,
} from "../productSlice";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { discountPrice, ITEMS_PER_PAGE } from "../../../app/constant";
import { fetchBrands, fetchCategories } from "../productAPI";
import { Pagination } from "../../common/Pagination";
import { Grid, InfinitySpin } from "react-loader-spinner";

// Product data

//Category data
const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

//pagination data
const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const status = useSelector(selectProductListStatus);
  const [productName, setproductName] = useState("");

  const filters = [
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },

    {
      id: "category",
      name: "Category",
      options: categories,
    },
  ];

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log(newFilter);
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort); // Update state
  };

  const handlePage = (page) => {
    console.log(page);
    setPage(page); // Update state
  };

  const handleBrand = (brand) => {
    setproductName(brand);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(
      fetchProductsByFiltersAsync({ filter, sort, pagination, productName })
    );
  }, [dispatch, filter, sort, page, productName]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, []);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  return (
    <div>
      {/* Catagory template code below  */}
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            handleFilter={handleFilter}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filters={filters}
          ></MobileFilter>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            onClick={(e) => handleSort(e, option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                            )}
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <DesktopFilter
                  handleFilter={handleFilter}
                  filters={filters}
                ></DesktopFilter>
                {/* Product grid */}
                <div className="lg:col-span-3">
                  <input
                    type="text"
                    id="productName"
                    onChange={(event) => handleBrand(event.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-grey-500"
                    placeholder="Enter product name"
                  />

                  <ProductGrid
                    products={products}
                    status={status}
                  ></ProductGrid>
                </div>
              </div>
            </section>

            {/* pagination code below */}
            <Pagination
              page={page}
              setPage={setPage}
              handlePage={handlePage}
              totalItems={totalItems}
            ></Pagination>
          </main>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <Dialog
      open={mobileFiltersOpen}
      onClose={setMobileFiltersOpen}
      className="relative z-40 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">
            <h3 className="sr-only">Categories</h3>

            {filters.map((section, index) => (
              <Disclosure
                key={index}
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon
                        aria-hidden="true"
                        className="size-5 group-data-open:hidden"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="size-5 group-not-data-open:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex gap-3">
                        <div className="flex h-5 shrink-0 items-center">
                          <div className="group grid size-4 grid-cols-1">
                            <input
                              defaultValue={option.value}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              onChange={(e) => handleFilter(e, section, option)}
                              className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                            />
                            <svg
                              fill="none"
                              viewBox="0 0 14 14"
                              className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            >
                              <path
                                d="M3 8L6 11L11 3.5"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-checked:opacity-100"
                              />
                              <path
                                d="M3 7H11"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-indeterminate:opacity-100"
                              />
                            </svg>
                          </div>
                        </div>
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="min-w-0 flex-1 text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
function DesktopFilter({ handleFilter, filters }) {
  return (
    // Filters
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section) => (
        <Disclosure
          key={section.id}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="size-5 group-data-open:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="size-5 group-not-data-open:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex gap-3">
                  <div className="flex h-5 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultValue={option.value}
                        defaultChecked={option.checked}
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        onChange={(e) => handleFilter(e, section, option)}
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </form>
  );
}

function ProductGrid({ products, status }) {
  return (
    //  from here below is Products list code

    <div className="bg-white">
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
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) =>
              !product.deleted ? (
                <Link key={product.id} to={`/product-detail/${product.id}`}>
                  <div className="group relative p-2 border-solid border-2 border-gray-200 rounded-lg">
                    <img
                      alt={product.title}
                      src={product.thumbnail}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-60 "
                    />
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          <StarIcon className="w-5 h-5 inline"></StarIcon>
                          <span className="align-bottom">
                            {" "}
                            {product.rating}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          $ {discountPrice(product)}
                        </p>
                        <p className="text-sm font-medium text-gray-400 line-through">
                          $ {product.price}
                        </p>
                      </div>
                      {product.stock === 0 ? (
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                          Out of Stock
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}
