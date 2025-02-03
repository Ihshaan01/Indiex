import React from "react";

import saleBanner from "../assets/saleBanner.jpg";
const HeroBanner = ({ type }) => {
  return (
    <section className="my-8 px-8 ">
      <div
        className={`relative bg-gray-100 rounded-lg overflow-hidden shadow-lg ${
          type == "short" ? "h-48" : "h-96"
        } `}
      >
        <img
          src={saleBanner}
          alt="Hero Banner"
          className="w-full h-full object-fill "
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Welcome to Indie X</h1>
        </div> */}
      </div>
    </section>
  );
};

export default HeroBanner;
