import React from "react";
import { IconContext } from "react-icons";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="bg-blue-500 w-full py-10 grid grid-cols-2">
      <div className="w-full grid grid-cols-2 ml-5 ">
        <div className="flex flex-col">
          <h1 className="text-white text-xl font-bold">Sell Assets</h1>
          <button className="text-white text-sm mt-2 text-start">
            Sell Assets
          </button>
          <button className="text-white text-sm text-start">
            Submission Guideline
          </button>{" "}
          <button className="text-white text-sm text-start">
            Publisher FAQ
          </button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-xl font-bold">Discover</h1>
          <button className="text-white text-sm mt-2 text-start">
            Most Popular Assets
          </button>
          <button className="text-white text-sm text-start">
            Top Free Assets
          </button>{" "}
          <button className="text-white text-sm text-start">
            Top Paid Assets
          </button>
        </div>
        <div className="mt-4 flex flex-col">
          <h1 className="text-white text-2xl font-bold">Help</h1>
          <button className="text-white text-sm text-start mt-2">FAQ</button>
          <button className="text-white text-sm text-start">
            Customer Services
          </button>
        </div>
        <div className="mt-4 flex flex-col">
          <h1 className="text-white text-2xl font-bold mb-2">Follow</h1>
          <IconContext.Provider value={{ color: "white", size: "1.3em" }}>
            <div className="flex gap-3">
              <button>
                <FaFacebookF />
              </button>
              <button>
                <FaSquareXTwitter />
              </button>
              <button>
                <IoLogoInstagram />
              </button>
            </div>
          </IconContext.Provider>
        </div>
      </div>
      <div className="justify-center flex items-center">
        <div className="rounded-md bg-white  w-4/6 justify-center flex">
          <input
            className="rounded-md h-9 px-2 w-11/12 mr-2 focus:outline focus:outline-none "
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
