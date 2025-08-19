import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchallUsersAsync,
  fetchLoggedInUserOrdersAsync,
  selectTotalUserCount,
  selectUserOrders,
  selectUsers,
  sendMailSuperAdminTOUserAsync,
} from "../user/userSlice";
import { useEffect } from "react";
import { Pagination } from "../common/Pagination";
import {
  EnvelopeIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { fetchAllOrdersAsync } from "../orders/orderSlice";
import { ITEMS_PER_PAGE } from "../../app/constant";
import { useForm } from "react-hook-form";

function Users() {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [userId, setuserId] = useState(null);
  let userOrders = useSelector(selectUserOrders);
  const totalUsers = useSelector(selectTotalUserCount);

  const handleShowOrders = (user) => {
    setuserId(user);
    dispatch(fetchLoggedInUserOrdersAsync(user));
    console.log("User Orders:", userOrders);
  };
  const handleCloseShowOrders = () => {
    setuserId(null);
    console.log("User Orders:", userOrders);
  };

  const handleMailForm = () => {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailData, setEmailData] = useState({ subject: "", message: "" });
  const [userEmail, setuserEmail] = useState("");
  const [sort, setSort] = useState({});
  const [userName, setuserName] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const handlePage = (page) => {
    setPage(page); // Update state
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchallUsersAsync({ sort, pagination, userName }));
  }, [dispatch, page, sort, userName]);

  const handleShowEmailFrom = (email) => {
    setuserEmail(email);
    setIsModalOpen(true);
  };

  const handleCloseEmailForm = () => {
    setIsModalOpen(false);
    setEmailData({ subject: "", message: "" });
  };


  const handleCustName = (name) => {
    setuserName(name);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white h-full t-0">
      <span>
        <h2 className="bg-gray-300 text-indigo-600 text-lg pt-3 pb-3 pr-5 pl-5">
          Customers List
        </h2>
      </span>
      <div className="pt-5 pb-5 pl-5 pr-5 text-sm">
        <div className="flex justify-between items-center mb-4">
          <span>
            Show
            <select
              type="dropbox"
              className="border border-gray-300  rounded-md m-1 p-1"
            >
              <option value="10" className="hover:bg-indigo-600">
                10
              </option>
              <option value="20">20</option>
            </select>
            entries
          </span>
          <span>
            Search :{" "}
            <input
              type="text"
              id="customerName"
              onChange={(event) => {
                handleCustName(event.target.value);
              }}
              class=" border border-black  text-sm rounded-lg placeholder-black text-black pl-2"
              placeholder="Enter customer name"
            />
          </span>
        </div>
        <table className=" w-full ml- mr-5 table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-2 text-left">SN</th>
              <th className="py-3 px-2 text-center">Name</th>
              <th
                className="py-3 px-0 text-center cursor-pointer"
                // onClick={(e) =>
                //   handleSort({
                //     sort: "totalAmount",
                //     order: sort?._order === "asc" ? "desc" : "asc",
                //   })
                // }
              >
                Email
                {/* {sort._sort === "totalAmount" &&
                            (sort._order === "asc" ? (
                              <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                            ) : (
                              <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                            ))} */}
              </th>
              <th className="py-3 px-2 text-center">Mobile No.</th>

              <th className="py-3 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users?.map((user, index) => (
              <>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-2 text-center whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">{index + 1}</span>
                    </div>
                  </td>

                  <td className="py-3 px-2 text-left">
                    <div className="flex items-center justify-center">
                      {user.name}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-left">
                    <div className="flex items-center justify-center">
                      {user.email}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex items-center justify-center">
                      {user.mobileNumber}
                    </div>
                  </td>

                  <td className="py-3 px-2 text-center text-white">
                    <div className="flex item-center justify-center">
                      <div
                        className="w-4 mr-4 transform hover:text-black hover:scale-110 transition duration-200"
                        onClick={(e) => handleShowOrders(user.id)}
                      >
                        <EyeIcon className="w-6 h-6 bg-blue-600 p-1 border rounded-md" />
                      </div>

                      <div
                        className="w-4 mr-4 transform hover:text-black hover:scale-110 transition duration-200"
                        onClick={(e) => handleShowEmailFrom(user.email)}
                      >
                        <EnvelopeIcon className="w-6 h-6 bg-green-600 p-1 border rounded-md" />
                      </div>

                      {userId === user.id && (
                        <div
                          className="w-4 mr-4 transform hover:text-black hover:scale-110 transition duration-200"
                          onClick={(e) => handleCloseShowOrders()}
                        >
                          <XMarkIcon className="w-6 h-6 bg-red-600 p-1 border rounded-md" />
                        </div>
                      )}

                      {/* {edittableUserId === user.id ? (
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
                  )} */}
                    </div>
                  </td>
                </tr>
                {userId && userId === user.id && userOrders && (
                  <tr>
                    <td colSpan="5" className="p-4">
                      <div className="bg-gray-100 p-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-2 text-indigo-600">
                          Orders from {user.name}
                        </h3>
                        {userOrders ? (
                          userOrders?.map((order, index) => (
                            <div
                              key={order.id}
                              className="mb-2 flex flex-row gap-3"
                            >
                              <span className="font-bold">
                                {index + 1 + "."}
                              </span>
                              <span className="font-bold">Order ID :</span>
                              {order?.id}
                              <p>
                                <span className="font-bold">
                                  Total Items :{" "}
                                </span>
                                {order?.totalItems}
                              </p>
                              <p>
                                <span className="font-bold">
                                  Total Amount :
                                </span>{" "}
                                ${order?.totalAmount}
                              </p>
                              <p>
                                <span className="font-bold">
                                  Order Status :
                                </span>
                                {(order?.status).charAt(0).toUpperCase() +
                                  (order?.status).slice(1)}
                              </p>
                              <p>
                                <span className="font-bold">Orderd On :</span>
                                {new Date(order?.createdAt).toLocaleDateString(
                                  "en-GB"
                                )}
                              </p>
                              {/* Add more order details as needed */}
                            </div>
                          ))
                        ) : (
                          <p>No orders found for this user.</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
                <tr></tr>
              </>
            ))}
          </tbody>
        </table>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalUsers}
        ></Pagination>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-white/30 backdrop-blur-sm z-50">
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
            noValidate
            onSubmit={handleSubmit((emailData) => {
              dispatch(
                sendMailSuperAdminTOUserAsync({
                  userEmail: userEmail,
                  subject: emailData.subject,
                  message: emailData.message,
                })
                
              );
              setIsModalOpen(false);
              reset();

            })}
          >
            <h2 className="text-lg font-bold mb-4">Send Email for Order #{}</h2>

            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={userEmail}
         
              // value={setuserEmail}
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full border p-2 rounded mb-3"
              {...register("subject", {
                            required: "Name is required.",
                          })}
              onChange={(e) =>
                setEmailData({ ...emailData, subject: e.target.value })
              }
            />

            <textarea
              placeholder="Message"
              className="w-full border p-2 rounded mb-4"
              rows={4}
              {...register("message", {
                            required: "Name is required.",
                          })}
              onChange={(e) =>
                setEmailData({ ...emailData, message: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseEmailForm}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Users;
