import React from "react";

const SignInModal = ({ visible, onClose }) => {
  return (
    <div
      className={`fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 ease-in-out ${
        visible ? "opacity-100 z-50" : "opacity-0 pointer-events-none -z-50"
      }`}
    >
      {" "}
      {/* Modal Container */}
      <div className="flex w-11/12 max-w-4xl h-5/6 bg-white rounded-lg overflow-hidden">
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
          <h2 className="text-2xl font-bold mb-4 text-black">
            Sign In to Your Account
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Dont have an account?{" "}
            <span className="text-blue-500 underline cursor-pointer">
              Sign Up here
            </span>
          </p>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-6 border text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
            Sign In
          </button>
          <p className="text-xs text-gray-500 mt-4 text-center">
            By signing in, you agree to our terms and conditions. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-200 hover:text-red-900 transition hover:scale-100 scale-90"
      >
        ✕
      </button>
    </div>
  );
};

export default SignInModal;
