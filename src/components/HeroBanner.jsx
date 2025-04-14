import React from "react";

import saleBanner from "../assets/saleBanner.jpg";
import banner from "../assets/banner.jpg";
const HeroBanner = ({ type }) => {
  return (
    <section className="my-8 px-8 ">
      <div
        className={`relative bg-gray-100 rounded-lg overflow-hidden shadow-lg ${
          type == "short" ? "md:h-80 h-auto" : "md:h-96 h-auto"
        } `}
      >
        <img
          src={type == "short" ? banner : saleBanner}
          alt="Hero Banner"
          className="w-full h-full object-cover "
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Welcome to Indie X</h1>
        </div> */}
      </div>
    </section>
  );
};

export default HeroBanner;
