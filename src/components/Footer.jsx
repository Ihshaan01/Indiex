import React, { useState } from "react";
import { IconContext } from "react-icons";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear input after search
    }
  };

  return (
    <div className="bg-gray-900 w-full py-10 grid grid-cols-2">
      <div className="w-full grid grid-cols-2 ml-5">
        <div className="flex flex-col">
          <h1 className="text-white text-xl font-bold">Sell Assets</h1>
          <button className="text-white text-sm mt-2 text-start">
            Sell Assets
          </button>
          <button className="text-white text-sm text-start">
            Submission Guideline
          </button>
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
          </button>
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
        <form
          onSubmit={handleSearch}
          className="rounded-md bg-gray-800 w-4/6 flex items-center justify-between border border-gray-700"
        >
          <input
            className="h-9 px-2 w-11/12 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-l-md"
            placeholder="Search for assets, gigs, or games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 text-purple-500 hover:text-purple-400 transition-colors duration-200"
          >
            <IconContext.Provider value={{ size: "1.5em" }}>
              <CiSearch />
            </IconContext.Provider>
          </button>
        </form>
      </div>
    </div>
  );
}
