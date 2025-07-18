import React from "react";

function Footer() {
  return (
    <>
      <div className="fixed bottom-0 w-full bg-gray-900">
        <div className="whitespace-nowrap text-gray-400 text-center">
          Thank you for visiting my e-commerce web project, QUICKCART! I hope
          you enjoyed the experience and found the interface user-friendly. If
          you have any suggestions or feedback, feel free to share them here 😊.
        </div>

        {/* <div className=" flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            {" "}
            © Beautiful Footer, 2021.{" "}
          </p>
          <div className="order-1 md:order-2">
            <span className="px-2">About us</span>
            <span className="px-2 border-l">Contact us</span>
            <span className="px-2 border-l">Privacy Policy</span>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Footer;
