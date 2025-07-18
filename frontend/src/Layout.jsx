import React from "react";
import Navbar from "./features/Navbar";
import Footer from "./features/common/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="pt-16 pb-12">
        <Outlet /> {/* This will render page content */}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
