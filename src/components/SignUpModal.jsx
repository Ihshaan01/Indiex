import React, { useState } from "react";
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";

const SignUpModal = ({ visible, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken, setUser, setStore } = useAuthStore();
  const handleSignUp = async () => {
    try {
      const response = await apiClient.post("/users/signup", {
        username,
        email,
        password,
      });
      const { user, token, store } = response.data;
      // Update Zustand store with user and token
      setUser(user);
      setToken(token);
      setStore(store);
      alert("Sign Up Successful!");
      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
      alert("Sign Up Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 ease-in-out ${
        visible ? "opacity-100 z-50" : "opacity-0 pointer-events-none -z-50"
      }`}
    >
      {/* Modal Container */}
      <div className="flex w-11/12 max-w-4xl h-5/6 bg-gray-800  rounded-lg overflow-hidden">
        {/* Promotional Section */}
        <div className="flex-1 bg-red-500 relative">
          {/* <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://via.placeholder.com/300x500.png?text=SALE+PROMO')",
            }}
          /> */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-30">
            <h1 className="text-xl font-bold mb-2">LIMITED TIME OFFER</h1>
            <h2 className="text-4xl font-bold mb-4">45% OFF</h2>
            <h3 className="text-6xl font-bold mb-2">SALE</h3>
            <p className="text-center text-sm">+10% OFF PAY WITH CARD</p>
          </div>
        </div>

        {/* Signup Section */}
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Sign Up to Your Account
          </h2>
          <p className="text-sm text-gray-300 mb-6">
            Have an account?
            <span className="text-blue-400 underline cursor-pointer">
              Sign In here
            </span>
          </p>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-6 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4 text-center">
            By signing up, you agree to our terms and conditions. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-200 hover:text-red-900 transition hover:scale-100 scale-90 hover:rotate-180"
      >
        ✕
      </button>
    </div>
  );
};

export default SignUpModal;
