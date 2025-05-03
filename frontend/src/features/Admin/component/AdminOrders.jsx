import { React, useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
} from "../../orders/orderSlice";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination }));
  }, [dispatch, page]);

  const handleShow = (order) => {
    console.log("Show Order", order);
  }
  const handleEdit = (order) => {
    console.log("Edit Order", order);
  };

  return (
    <div className="">
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order Number</th>
                    <th className="py-3 px-6 text-left">Items - Quantity</th>
                    <th className="py-3 px-6 text-center">Total Amout</th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders?.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">#{order.id}</span>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-left">
                        {order.products.map((product) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={product.thumbnail}
                              />
                            </div>
                            <span>
                              {product?.title} - {product?.quantity}
                            </span>
                            <span> </span>
                          </div>
                        ))}
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          $ {order.totalAmount}
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
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

                      <td className="py-3 px-6 text-center">
                        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                          {order.status}
                        </span>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-110" onClick={e=>handleShow(order)}>
                            <EyeIcon className="w-6 h-6 text-gray-500" />
                          </div>

                          <div className="w-4 mr-2 mt-0.5 transform hover:text-purple-500 hover:scale-110" onClick={e=>handleEdit(order)}>
                            <PencilIcon className="w-5 h-5 text-gray-500" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
