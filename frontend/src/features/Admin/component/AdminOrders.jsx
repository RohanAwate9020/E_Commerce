import { React, useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../orders/orderSlice";
import {
  EyeIcon,
  PencilIcon,
  XMarkIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";

import { Pagination } from "../../common/Pagination";

export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [edittableOrderId, setEdittableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleShow = (order) => {
    console.log("Edit Order", order);
  };
  const handleEdit = (order) => {
    setEdittableOrderId(order.id);
  };

  const handleCancelEdit = () => {
    setEdittableOrderId(-1);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const handleUpdateStatus = (e, order) => {
    const updatedOrder = {
      ...order,
      status: e.target.value,
    };
    dispatch(updateOrderAsync(updatedOrder));
    setEdittableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page); // Update state
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "shipped":
        return "bg-blue-200 text-blue-700";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      case "returned":
        return "bg-yellow-200 text-yellow-900";
    }
  };

  return (
    <div className="w-full overflow-x-auto bg-gray-100 min-h-screen">
      <div className="w-full max-w-screen-2xl mx-auto px-2 py-4">
        <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
            <div className="min-w-[1200px]">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-2 text-left">Order Number</th>
                    <th className="py-3 px-2 text-left">Items - Quantity</th>
                    <th
                      className="py-3 px-0 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total Amount{" "}
                      {sort._sort === "totalAmount" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-2 text-center">Shipping Address</th>
                    <th className="py-3 px-2 text-center">order Status</th>
                    <th className="py-3 px-2 text-center">Payment Method</th>
                    <th className="py-3 px-2 text-center">Payment Status</th>
                       <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: 'createdAt',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Order Time{' '}
                    {sort._sort === 'createdAt' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: 'updatedAt',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Last Updated{' '}
                    {sort._sort === 'updatedAt' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                    <th className="py-3 px-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders?.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-2 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">#{order.id}</span>
                        </div>
                      </td>

                      <td className="py-3 px-2 text-left">
                        {order.products.map((product) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={product?.product?.thumbnail}
                              />
                            </div>
                            <span>
                              {product?.product?.title} - {product?.quantity}
                            </span>
                            <span> </span>
                          </div>
                        ))}
                      </td>

                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center">
                          $ {order.totalAmount}
                        </div>
                      </td>

                      <td className="py-3 px-2 text-center">
                        {order.selectedAddress ? (
                          <div className="">
                            <div>
                              <strong>{order?.selectedAddress?.name}</strong>
                            </div>
                            <div>{order?.selectedAddress?.streetName},</div>
                            <div>{order?.selectedAddress?.City},</div>
                            <div>
                              {order?.selectedAddress?.state},{" "}
                              {order?.selectedAddress?.pinCode}
                            </div>
                            <div>{order?.selectedAddress?.mobile}</div>
                          </div>
                        ) : (
                          <div>
                            <strong>NO ADDRESS SELECTED</strong>
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-2 text-center">
                        {edittableOrderId === order.id ? (
                          <select
                            onChange={(e) => handleUpdateStatus(e, order)}
                            className="ml-2 border border-gray-300 rounded-md p-1 text-sm"
                            select={order.status}
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="returned">Returned</option>
                          </select>
                        ) : (
                          <span
                            className={` ${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs font-semibold`}
                          >
                            {order.status.toUpperCase()}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center">
                          {order.paymentMethod}
                        </div>
                      </td>

                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center">
                          {order.paymentStatus === "Pending" ? (
                            <span
                              className={` bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs font-semibold`}
                            >
                              {order.paymentStatus.toUpperCase()}
                            </span>
                          ) : (
                            <span
                              className={` bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs   font-semibold`}
                            >
                              {order.paymentStatus.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center whitespace-normal break-words max-w-[100px]">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString()
                            : "N/A"}
                        </div>
                      </td>

                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center whitespace-normal break-words max-w-[100px]">
                          {order.updatedAt
                            ? new Date(order.updatedAt).toLocaleString()
                            : "N/A"}
                        </div>
                      </td>

                      <td className="py-3 px-2 text-center">
                        <div className="flex item-center justify-center">
                          <div
                            className="w-4 mr-4 transform hover:text-purple-500 hover:scale-110"
                            onClick={(e) => handleShow(order)}
                          >
                            <EyeIcon className="w-6 h-6 text-gray-500" />
                          </div>

                          {edittableOrderId === order.id ? (
                            <div
                              className="w-4 mr-2 mt-0.5 transform hover:text-purple-500 hover:scale-110"
                              onClick={(e) => handleCancelEdit()}
                            >
                              <XMarkIcon className="w-5 h-5 text-gray-500" />
                            </div>
                          ) : (
                            <div
                              className="w-4 mr-2 mt-0.5 transform hover:text-purple-500 hover:scale-110"
                              onClick={(e) => handleEdit(order)}
                            >
                              <PencilIcon className="w-5 h-5 text-gray-500" />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                page={page}
                setPage={setPage}
                handlePage={handlePage}
                totalItems={totalOrders}
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
