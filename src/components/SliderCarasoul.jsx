import React from "react";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md z-10 hover:bg-gray-300"
    onClick={onClick}
  >
    <FaChevronLeft size={20} />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md z-10 hover:bg-gray-300"
    onClick={onClick}
  >
    <FaChevronRight size={20} />
  </button>
);

export default function SliderCarasoul({ product }) {
  const sliderSettings = {
    dots: true, // Show navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  // Check if product contains images or video
  const hasMedia = product.images.length > 0 || product.video;

  if (!hasMedia) {
    return null; // Render nothing if no media is available
  }

  if (product.images.length === 1 && !product.video) {
    // Only one image and no video
    return (
      <div className="min-w-0" style={{ flex: 2 }}>
        <div className="w-full">
          <img
            src={product.images[0]}
            alt="Product"
            className="w-full h-96 object-contain rounded-lg shadow-sm"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0 h-full" style={{ flex: 2 }}>
      <Slider {...sliderSettings}>
        {/* Render images */}
        {product.images.map((image, index) => (
          <div key={index} className="w-full">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-96 object-contain rounded-lg shadow-sm"
            />
          </div>
        ))}

        {/* Render video if present */}
        {product.video && (
          <div className="w-full flex">
            <div className="h-96 flex justify-center">
              <ReactPlayer
                url={product.video}
                width="90%"
                height="100%"
                controls // Show video controls
              />
            </div>
          </div>
        )}
      </Slider>
    </div>
  );
}
