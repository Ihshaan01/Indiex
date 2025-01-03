import React from "react";
import { IconContext } from "react-icons";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 w-full py-10 grid grid-cols-2">
      <div className="w-full grid grid-cols-2 ml-5 ">
        <div className="flex flex-col">
          <h1 className="text-white text-xl font-bold">Sell Assets</h1>
          <button className="text-white text-sm mt-2 text-start">
            Sell Assets
          </button>
          <button className="text-white text-sm text-start">
            Submission Guideline
          </button>{" "}
          <button
            className="text-white text-sm text-start"
            onClick={() => navigate("/faq/publisher")}
          >
            Publisher FAQ
          </button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-xl font-bold">Discover</h1>
          <button
            className="text-white text-sm mt-2 text-start"
            onClick={() => navigate("/Category/Assets")}
          >
            Most Popular Assets
          </button>
          <button
            className="text-white text-sm text-start"
            onClick={() => navigate("/Category/Assets")}
          >
            Top Free Assets
          </button>{" "}
          <button
            className="text-white text-sm text-start"
            onClick={() => navigate("/Category/Assets")}
          >
            Top Paid Assets
          </button>
        </div>
        <div className="mt-4 flex flex-col">
          <h1 className="text-white text-2xl font-bold">Help</h1>
          <button
            className="text-white text-sm text-start mt-2"
            onClick={() => navigate("/faq/user")}
          >
            FAQ
          </button>
          <button className="text-white text-sm text-start">
            Customer Services
          </button>
        </div>
        <div className="mt-4 flex flex-col">
          <h1 className="text-white text-2xl font-bold mb-2">Follow</h1>
          <IconContext.Provider value={{ color: "white", size: "1.3em" }}>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  window.open("https://www.facebook.com", "_blank")
                }
              >
                <FaFacebookF />
              </button>
              <button
                onClick={() => window.open("https://twitter.com/", "_blank")}
              >
                <FaSquareXTwitter />
              </button>
              <button
                onClick={() =>
                  window.open("https://www.instagram.com/", "_blank")
                }
              >
                <IoLogoInstagram />
              </button>
            </div>
          </IconContext.Provider>
        </div>
      </div>
      <div className="justify-center flex items-center">
        <div className="rounded-md bg-gray-300  w-4/6 justify-center flex">
          <input
            className="rounded-md h-9 px-2 w-11/12 bg-gray-300 mr-2 focus:outline focus:outline-none "
            placeholder="Search"
          />
          <button>
            <IconContext.Provider
              value={{ color: "blue", size: "1.1em", font: "bold" }}
            >
              <CiSearch />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </div>
  );
}
