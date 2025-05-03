import React, { useEffect, useState } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { IoChatbubblesOutline, IoMenu, IoPersonOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModel";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import apiClient from "../middleware/apiMiddleware";
import { FaChartColumn } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import { MdOutlineDataThresholding } from "react-icons/md";

const Header = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const { token, user, setUser, clearToken } = useAuthStore();

  const categories = [
    {
      name: "Assets",
      subCategories: [
        { name: "3D Animation", image: "" },
        { name: "3D Models", image: "" },
        { name: "2D Animation", image: "" },
        {
          name: "2D Models",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGrkBWmCzP_xtcRAjMI1fe9QtFb3fjKwIseQ&s",
        },
        { name: "Music", image: "" },
        {
          name: "Sound FX",
          image:
            "https://media.istockphoto.com/id/1127580808/vector/sound-wave-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=zfQKlDp1rup6YGOwPP-cUHVQkjqVilfo2xGKWeA57Fc=",
        },
        { name: "Particles", image: "" },
        { name: "Shaders", image: "" },
      ],
    },
    {
      name: "Gigs",
      subCategories: [
        { name: "Graphics & Design", image: "https://via.placeholder.com/150" },
        {
          name: "Programming & Tech",
          image: "https://via.placeholder.com/150",
        },
        { name: "Digital Marketing", image: "https://via.placeholder.com/150" },
        { name: "Music & Audio", image: "https://via.placeholder.com/150" },
        { name: "Video & Animation", image: "https://via.placeholder.com/150" },
        {
          name: "Writing & Translation",
          image: "https://via.placeholder.com/150",
        },
        { name: "Photography", image: "https://via.placeholder.com/150" },
        { name: "Consulting", image: "https://via.placeholder.com/150" },
      ],
    },
    {
      name: "Games",
      subCategories: [
        { name: "Action", image: "https://via.placeholder.com/150" },
        { name: "Fighting", image: "https://via.placeholder.com/150" },
        { name: "Platformer", image: "https://via.placeholder.com/150" },
        { name: "Puzzle", image: "https://via.placeholder.com/150" },
        {
          name: "Simulation video game",
          image: "https://via.placeholder.com/150",
        },
        { name: "Sports", image: "https://via.placeholder.com/150" },
        { name: "Survival horror", image: "https://via.placeholder.com/150" },
        {
          name: "First-person shooter",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "Role-playing video game",
          image: "https://via.placeholder.com/150",
        },
      ],
    },
  ];

  const handleLogout = () => {
    clearToken();
    setUserModalVisible(false);
  };

  const handleRoleSwitch = async () => {
    try {
      const newRole = user?.role === "seller" ? "buyer" : "seller";
      const response = await apiClient.put(
        "/users/update-role",
        { userId: user.id, newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data.user);
      alert("Role updated successfully!");
    } catch (error) {
      console.error(
        "Error updating role:",
        error.response?.data || error.message
      );
      alert("Failed to update role.");
    }
  };
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 md:px-6 px-2 shadow-lg sticky top-0 z-50"
      onMouseLeave={() => {
        if (window.innerWidth >= 768) {
          setExpandedCategory(null);
          setMobileMenuVisible(false);
        }
      }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight hover:text-gray-300 transition-colors duration-200"
          >
            Indie X
          </Link>
          <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
            <div className="flex items-center md:gap-4">
              <div className="flex items-center">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-full hover:bg-gray-700"
                >
                  <CiSearch />
                </button>
                <form onSubmit={handleSearch} className="flex-1">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`fixed md:absolute top-16 right-4 left-4 md:left-auto md:right-0 w-[calc(100%-2rem)] md:w-64 p-2 bg-gray-800 text-white rounded-md shadow-lg transition-all duration-300 ${
                      searchOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    } z-50`}
                  />
                </form>
              </div>
              {user && <Link
                to="/Cart"
                className="p-2 rounded-full hover:bg-gray-700 transition-all duration-200"
                data-tooltip-id="Cart"
                data-tooltip-content="Cart"
                aria-label="Cart"
              >
                <CiShoppingCart />
              </Link>}
              {user?.role === "seller" && (
                <Link
                  to="/Dashboard"
                  className="p-2 rounded-full hover:bg-gray-700 transition-all duration-200"
                  data-tooltip-id="Dashboard"
                  data-tooltip-content="Dashboard"
                  aria-label="Dashboard"
                >
                  <MdOutlineDataThresholding />
                </Link>
              )}
              {user && <div className="p-2">
                <button
                  onClick={() => navigate("/chats")}
                  className="p-2 rounded-full hover:bg-gray-700 transition-all duration-200"
                >
                  <IoChatbubblesOutline />
                </button>
              </div>}
              <button
                className="p-2 rounded-full hover:bg-gray-700 transition-all duration-200"
                onClick={() => {
                  setExpandedCategory(null);
                  setMobileMenuVisible(false);
                  setUserModalVisible(!userModalVisible);
                }}
                data-tooltip-id="Menu"
                data-tooltip-content="User Menu"
                aria-label="User Menu"
              >
                <IoPersonOutline />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-700 transition-all duration-200 md:hidden"
                onClick={() => {
                  setExpandedCategory(null);
                  setMobileMenuVisible(!mobileMenuVisible);
                  setUserModalVisible(false);
                }}
                aria-label="Mobile Menu"
              >
                <IoMenu />
              </button>
            </div>
          </IconContext.Provider>
        </div>

        {/* User Modal */}
        <div
          className={`absolute right-6 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl transition-all duration-300 ease-in-out ${
            userModalVisible
              ? "opacity-100 translate-y-0 z-10"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {token ? (
            <div className="py-2">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white transition-colors duration-200"
                onClick={() => setUserModalVisible(false)}
              >
                Profile
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 hover:text-white transition-colors duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="py-2">
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 hover:text-white transition-colors duration-200"
                onClick={() => {
                  setSignUpModalVisible(true);
                  setUserModalVisible(false);
                }}
              >
                Sign Up
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 hover:text-white transition-colors duration-200"
                onClick={() => {
                  setSignInModalVisible(true);
                  setUserModalVisible(false);
                }}
              >
                Sign In
              </button>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-between items-center mt-4">
          <div className="flex gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                onMouseEnter={() => {
                  setExpandedCategory(index);
                  setUserModalVisible(false);
                }}
                className="relative"
              >
                <Link
                  to={`/Category/${category.name}`}
                  className="text-md font-semibold px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200"
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </div>
          {token && (
            <button
              onClick={handleRoleSwitch}
              className="text-md font-semibold px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-200"
            >
              {user?.role === "seller"
                ? "Switch to Buying"
                : "Switch to Selling"}
            </button>
          )}
        </nav>

        <nav
          className={`md:hidden mt-4 bg-gray-800 rounded-lg p-4 transition-all duration-300 ${
            mobileMenuVisible
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {categories.map((category, index) => (
            <div key={index}>
              <button
                onClick={() => {
                  setExpandedMobileCategory(
                    expandedMobileCategory === index ? null : index
                  );
                }}
                className="w-full text-left py-2 text-md font-semibold hover:text-gray-300 transition-colors duration-200"
              >
                {category.name}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedMobileCategory === index ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                {category.subCategories.map((subCat, subIndex) => (
                  <Link
                    key={subIndex}
                    to={`/Category/${category.name}/${subCat.name}`}
                    onClick={() => setMobileMenuVisible(false)}
                    className="block py-2 pl-4 text-sm text-gray-300 hover:text-white"
                  >
                    {subCat.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {token && (
            <button
              onClick={handleRoleSwitch}
              className="block w-full mt-2 text-md font-semibold px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-md transition-all duration-200"
            >
              {user?.role === "seller"
                ? "Switch to Buying"
                : "Switch to Selling"}
            </button>
          )}
        </nav>

        {/* Subcategory Dropdown */}
        <div
          className={`absolute left-0 mt-2 w-full bg-gray-900 border-t-2 border-gray-700 shadow-lg transition-all duration-300 ease-in-out ${
            expandedCategory !== null
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="container mx-auto flex py-6">
            <div className="w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {expandedCategory !== null &&
                categories[expandedCategory].subCategories.map(
                  (subCat, subIndex) => (
                    <Link
                      key={subIndex}
                      to={`/Category/${categories[expandedCategory].name}/${subCat.name}`}
                      className="px-4 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white rounded-md transition-all duration-200"
                      onMouseEnter={() => {
                        if (!isMobile) setHoveredSubCategory(subCat.image);
                      }}
                      onMouseLeave={() => {
                        if (!isMobile) setHoveredSubCategory(null);
                      }}
                    >
                      {subCat.name}
                    </Link>
                  )
                )}
            </div>
            <div className="w-1/2 flex justify-center items-center">
              <img
                src={hoveredSubCategory || "https://via.placeholder.com/150"}
                alt="Subcategory"
                className={`h-64 object-cover rounded-lg shadow-md transition-all duration-500 ease-in-out ${
                  hoveredSubCategory
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-50"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <SignUpModal
        visible={signUpModalVisible}
        onClose={() => setSignUpModalVisible(false)}
        switchToSignIn={() => {
          setSignUpModalVisible(false);
          setSignInModalVisible(true);
        }}
      />
      <SignInModal
        visible={signInModalVisible}
        onClose={() => setSignInModalVisible(false)}
        switchToSignUp={() => {
          setSignInModalVisible(false);
          setSignUpModalVisible(true);
        }}
      />
      <Tooltip id="Search" place="bottom" />
      <Tooltip id="Cart" place="bottom" />
      <Tooltip id="Dashboard" place="bottom" />
      <Tooltip id="Menu" place="bottom" />
    </header>
  );
};

export default Header;
