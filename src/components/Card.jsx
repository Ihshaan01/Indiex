import React from "react";
import StarRating from "./StarRating";

const Card = ({
  image,
  Name,
  storeName,
  totalrating,
  ratingAverage,
  discount,
  price,
  type,
}) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-700 transform hover:scale-105 scale-100 duration-300">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={image} alt={Name} />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2">{Name}</h3>
        <div className="flex items-center">
          <StarRating rating={4.5} />
          <span className="text-gray-400 text-sm">
            {ratingAverage} ({totalrating})
          </span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-gray-400">{storeName}</span>
        </div>
        <div>
          {discount ? (
            <div className="flex justify-between">
              <div className="flex gap-x-2 ">
                <h4 className="text-md font-bold text-white mb-2 line-through ">
                  ${price}
                </h4>
                <h4 className="text-md text-red-500 font-bold  mb-2 ">
                  ${price - price * (discount / 100)}
                </h4>
              </div>
              <span className=" bg-red-500 text-white text-xs font-bold p-2 rounded">
                {discount}% OFF
              </span>
            </div>
          ) : type == "gig" ? (
            <h4 className="text-md font-bold text-white mb-2">From ${price}</h4>
          ) : (
            <h4 className="text-md font-bold text-white mb-2">${price}</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
