import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { IconContext } from "react-icons";
import { IoPersonOutline } from "react-icons/io5";
import User from "../assets/user2.png";
import StarRating from "../components/StarRating";
import { DropDown } from "../components/DropDown";
import { FaHistory, FaUserEdit } from "react-icons/fa";
import SliderCarasoul from "../components/SliderCarasoul";
import TabbedDetails from "../components/TabbedDetail";
import Tabs, { TabList, TabTrigger, TabContent } from "../components/Tabs"; // Assuming you have a Tabs component
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";

function DetailPage() {
  const { id } = useParams(); // Get the ID from the URL
  const location = useLocation(); // Get the state (type) from navigation
  const [item, setItem] = useState(null); // State to store item details (asset or gig)
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const { user } = useAuthStore();
  console.log("User", user);
  const type = location.state;
  // Fetch item details based on type
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        if (!type || !id) {
          throw new Error("Missing item type or ID");
        }
        let endpoint;
        if (type === "Asset") {
          endpoint = `/users/get-asset-detail/${id}`;
        } else if (type === "Gig") {
          endpoint = `/users/get-gig-detail/${id}`;
        } else if (type === "game") {
          endpoint = `/users/get-game-detail/${id}`;
        }
        const response = await apiClient.get(endpoint);
        setItem(response.data);
      } catch (error) {
        setError("Failed to fetch item details. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id, type]);
  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const response = await apiClient.post("/users/add-to-cart", {
        userId: user.id, // Assuming user.id exists in auth store
        itemId: id,
        type: type,
        quantity: 1, // Default quantity; adjust if needed
      });
      console.log("Added to cart:", response.data);
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to add item to cart.";
      alert(errorMessage);
    }
  };
  // Hardcoded data for "You Might Also Like" and "More from same store" sections
  const CardData = [
    {
      images: ["https://via.placeholder.com/150"],
      productName: "Camera Assets",
      store: { name: "DesignPro Studio" },
      ratingAverage: 4.5,
      totalrating: 50,
      discount: 20,
      price: 30,
    },
  ];

  // Render loading state
  if (loading) {
    return (
      <div className="text-white text-center">Loading item details...</div>
    );
  }

  // Render error state
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  // Render if item is not found
  if (!item) {
    return <div className="text-white text-center">Item not found.</div>;
  }

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] mt-5">
        {/* Product Details Section */}
        <div className="px-3 md:pl-12">
          <SliderCarasoul
            product={{ images: item.images, video: item.youtubeLink }}
          />
        </div>
        <div className="p-6 text-white bg-gray-900 rounded-lg shadow-lg">
          {/* Product Name and Rating Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <h1 className="text-2xl font-bold text-white">
              {item.productName}
            </h1>
            <div className="flex items-center gap-2">
              <StarRating rating={item.ratingAverage || 0} />
              <span className="text-gray-300 text-sm font-medium">
                {item.ratingAverage || 0} ({item.totalRating || 0} reviews)
              </span>
            </div>
          </div>

          {/* Store Info */}
          <div className="mt-4 flex items-center gap-3">
            <img
              src={User}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-700"
            />
            <p className="text-gray-200 font-medium">
              {item.store?.name || "Unknown Store"}
            </p>
          </div>

          {/* Pricing/Packages Section */}
          <div className="mt-6">
            {type === "Asset" && (
              <div className="flex items-center gap-3">
                {item.discount ? (
                  <>
                    <p className="text-2xl font-bold text-red-500">
                      £
                      {(
                        item.price -
                        (item.price * item.discount) / 100
                      ).toFixed(2)}
                    </p>
                    <p className="text-lg text-gray-500 line-through">
                      £{item.price.toFixed(2)}
                    </p>
                    <span className="bg-red-500/20 text-red-300 text-xs font-semibold px-2 py-1 rounded-full">
                      {item.discount}% OFF
                    </span>
                  </>
                ) : (
                  <p className="text-2xl font-bold text-white">
                    £{item.price.toFixed(2)}
                  </p>
                )}
              </div>
            )}

            {type === "Gig" && item.packages && (
              <div className="space-y-4">
                <select
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  defaultValue={item.packages[0]?.name.toLowerCase()}
                  onChange={(e) => {
                    const selectedPackage = item.packages.find(
                      (pkg) => pkg.name.toLowerCase() === e.target.value
                    );
                  }}
                >
                  {item.packages.map((pkg) => (
                    <option
                      key={pkg.name}
                      value={pkg.name.toLowerCase()}
                      className="bg-gray-800 text-white"
                    >
                      {pkg.name}
                    </option>
                  ))}
                </select>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  {item.packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className="text-white transition-opacity duration-200"
                      style={{
                        display:
                          pkg.name.toLowerCase() ===
                          item.packages[0]?.name.toLowerCase()
                            ? "block"
                            : "none",
                      }}
                    >
                      <p className="text-2xl font-bold">
                        £{pkg.price.toFixed(2)}
                      </p>
                      <p className="mt-2 text-gray-300">{pkg.services}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6">
            {type === "Gig" ? (
              <button className="w-full h-12 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold text-lg rounded-lg hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 shadow-md">
                Contact Freelancer
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md"
              >
                Add to Cart
              </button>
            )}
          </div>

          {/* Asset-specific details */}
          {type === "Asset" && (
            <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">File Size</span>
                  <span className="text-white font-medium">
                    {item.fileSize} MB
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Version</span>
                  <span className="text-white font-medium">
                    {item.latestVersion}
                  </span>
                </div>
                <div className="flex justify-between items-center col-span-2">
                  <span className="text-gray-400">Release Date</span>
                  <span className="text-white font-medium">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabbed Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] mt-5">
        <div>
          <TabbedDetails
            description={item.description}
            keywords={item.keywords}
            store={item.store}
          />
        </div>
        <div></div>
      </div>

      {/* You Might Also Like Section */}
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">
          You Might Also Like
        </h3>
        <div className="grid md:grid-cols-4 gap-4 mx-10">
          {CardData.map((card, index) => (
            <Card key={index} item={card} />
          ))}
        </div>
      </div>

      {/* More from Same Store Section */}
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">
          More from same store
        </h3>
        <div className="grid md:grid-cols-4 gap-4 mx-10">
          {CardData.map((card, index) => (
            <Card key={index} item={card} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DetailPage;
