// import React from "react";
// import Navbar from "./features/Navbar";
// import Footer from "./features/common/Footer";
// import { Outlet } from "react-router-dom";

// function Layout() {
//   return (
//     <>
//       <Navbar />
//       <div className="pt-16 pb-12">
//         <Sidebar/>
//         <Outlet /> {/* This will render page content */}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Layout;

import React from "react";
import Navbar from "./features/Navbar";
import Footer from "./features/common/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./features/common/Sidebar";

function Layout() {
  const isSuperAdmin = true; // Replace with your role-checking logic

  return (
    <div className="grid min-h-screen grid-cols-[80px_1fr] grid-rows-[64px_1fr_40px] border-4 border-black">

      {/* Header */}
      <div className="col-span-2 ">
        <Navbar />
      </div>

      {/* Sidebar */}
      <div className="">
        {isSuperAdmin ? <Sidebar /> : <div className="w-[1px] " />} {/* keeps the grid cell filled */}
      </div>

      {/* Main Content */}
      <div className="">
        <Outlet />
      </div>

      {/* Footer */}
      <div className="col-span-2 ">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
