import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpFromBracket,
  faBars,
  faBoxArchive,
  faBoxOpen,
  faCartShopping,
  faGear,
  faHome,
  faShoppingCart,
  faUser,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log("Sidebar toggled:", sidebarOpen);
  };
  const Navigate = useNavigate();
  const handleNavigate = (address) => {
    Navigate(`${address}`);
  };
  return (
    <div className="sidebar fixed h-full l-0 transition duration-400">
      {sidebarOpen === true ? (
        <div className="flex h-screen bg-[#f8fafc] transition duration-400 ease-in-out" >
          <div className=" transition duration-400">
            <span>
              <button
                className="text-indigo-500 px-6 py-2 mr-2 ml-2 pt-5 rounded-md cursor-pointer tranform hover:scale-110 transition duration-400"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </span>

            <ul>
              <li
                onClick={() => handleNavigate("superadmin/home")}
                className="text-indigo-500 pr-10 mr-2 ml-2 px-6 py-2 rounded-md cursor-pointer transform hover:scale-105 hover:bg-indigo-500 hover:text-white transition duration-300"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2"/>Home
              </li>

              <li
                onClick={() => handleNavigate("superadmin/users")}
                className=" text-indigo-500 pr-10 mr-2 ml-2 px-6 py-2 rounded-md cursor-pointer pt-2 pb-2 tranform hover:scale-105 hover:bg-indigo-500 hover:text-white     transition duration-400"
              >
                <FontAwesomeIcon icon={faUsers} /> User
              </li>

              <li
                onClick={() => handleNavigate("superadmin/admins")}
                className=" text-indigo-500 pr-10 mr-2 ml-2 px-6 py-2 rounded-md cursor-pointer pt-2 pb-2 tranform hover:scale-105 hover:bg-indigo-500 hover:text-white     transition duration-400"
              >
                <FontAwesomeIcon icon={faUserTie} /> Admins
              </li>

              <li
                onClick={() => handleNavigate("superadmin/sellers")}
                className=" text-indigo-500 pr-10 mr-2 ml-2 px-6 py-2 rounded-md cursor-pointer pt-2 pb-2 tranform hover:scale-105 hover:bg-indigo-500 hover:text-white     transition duration-400"
              >
                <FontAwesomeIcon icon={faCartShopping} /> Sellers
              </li>
              <li
                onClick={() => handleNavigate("superadmin/products")}
                className=" text-indigo-500 pr-10 mr-2 ml-2 px-6 py-2 rounded-md cursor-pointer pt-2 pb-2 tranform hover:scale-105 hover:bg-indigo-500 hover:text-white     transition duration-400"
              >
                <FontAwesomeIcon icon={faBoxOpen} /> Products
              </li>
              <li
                onClick={() => handleNavigate("superadmin/settings")}
                className=" text-indigo-500 pr-10 mr-2 ml-2 px-6 py-2 rounded-md cursor-pointer pt-2 pb-2 tranform hover:scale-105 hover:bg-indigo-500 hover:text-white     transition duration-400"
              >
                <FontAwesomeIcon icon={faGear} /> Settings
              </li>
              <li
                onClick={() => handleNavigate("superadmin/home")}
                className=" text-indigo-500 pr-10 mr-2 ml-2 px-6 py-2 rounded-md cursor-pointer pt-2 pb-2 tranform hover:scale-105 hover:bg-indigo-500 hover:text-white     transition duration-400"
              >
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className="transform rotate-270"
                />{" "}
                Logout
              </li>
            </ul>
          </div>
          {/* <div className='bg-black-900'></div> */}
        </div>
      ) : (
        <div className="flex h-screen bg-[#f8fafc] transition duration-400">
          <span>
            <button
              className="text-indigo-500 px-6 py-2 mr-2 ml-2 pt-5 rounded-md cursor-pointer tranform hover:scale-110 transition duration-400"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <ul>
              <li
                onClick={() => handleNavigate("superadmin/home")}
                className="text-indigo-500 text-lg px-6 py-2 mr-2 ml-2 rounded-md cursor-pointer hover:bg-indigo-500 hover:text-white tranform hover:scale-110 transition duration-400"
              >
                <FontAwesomeIcon icon={faHome} className=" " />
              </li>
              <li
                onClick={() => handleNavigate("superadmin/users")}
                className="text-indigo-500 px-6 py-2 mr-2 ml-2 rounded-md cursor-pointer hover:bg-indigo-500 hover:text-white tranform hover:scale-110 transition duration-400"
              >
                <FontAwesomeIcon icon={faUsers} />
              </li>
              <li
                onClick={() => handleNavigate("superadmin/admins")}
                className="text-indigo-500 px-6 py-2 mr-2 ml-2 rounded-md cursor-pointer hover:bg-indigo-500 hover:text-white tranform hover:scale-110 transition duration-400"
              >
                <FontAwesomeIcon icon={faUserTie} />
              </li>
              <li
                onClick={() => handleNavigate("superadmin/sellers")}
                className="text-indigo-500 px-6 py-2 mr-2 ml-2 rounded-md cursor-pointer hover:bg-indigo-500 hover:text-white tranform hover:scale-110 transition duration-400"
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </li>
              <li
                onClick={() => handleNavigate("superadmin/products")}
                className="text-indigo-500 px-6 py-2 mr-2 ml-2 rounded-md cursor-pointer hover:bg-indigo-500 hover:text-white tranform hover:scale-110 transition duration-400"
              >
                <FontAwesomeIcon icon={faBoxOpen} />
              </li>
              <li
                onClick={() => handleNavigate("superadmin/settings")}
                className="text-indigo-500 px-6 py-2 mr-2 ml-2 rounded-md cursor-pointer hover:bg-indigo-500 hover:text-white tranform hover:scale-110 transition duration-400"
              >
                <FontAwesomeIcon icon={faGear} />
              </li>
              <li
                onClick={() => handleNavigate("superadmin/home")}
                className="text-indigo-500 px-6 py-2 mr-2 ml-2 rounded-md cursor-pointer hover:bg-indigo-500 hover:text-white tranform hover:scale-110 transition duration-400"
              >
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className="transform rotate-270"
                />
              </li>
            </ul>
          </span>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
