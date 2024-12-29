import React from "react";

const HeroBanner = () => {
  return (
    <section className="my-8 px-8 ">
      <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg h-96 -z-20">
        <img
          src="https://lh3.googleusercontent.com/NGPrjka2ai0w7sfhxkxCwtOSh2wVyEZMdtrVxI4vrA22ebA_fcyl9PSvhTaCYXSWh0A68ZhvXhVZ4U-Nnp3v9IfoXg5o5H1tjjK97cs"
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
