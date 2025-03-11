import React from "react";
import StarRating from "./StarRating";

const Card = ({ item }) => {
  console.log(item);
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-700 transform hover:scale-105 scale-100 duration-300">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={item?.images[0]}
          alt={item?.productName}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2">
          {item?.productName}
        </h3>
        <div className="flex items-center">
          <StarRating rating={item.ratingAverage || 0} />
          <span className="text-gray-400 text-sm">
            {item?.ratingAverage || 0} ({item?.totalRating || 0})
          </span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-gray-400">
            {item?.store?.name}
          </span>
        </div>
        <div>
          {item?.discount ? (
            <div className="flex justify-between">
              <div className="flex gap-x-2 ">
                <h4 className="text-md font-bold text-white mb-2 line-through ">
                  £{item?.price}
                </h4>
                <h4 className="text-md text-red-500 font-bold  mb-2 ">
                  £{item?.price - item?.price * (item?.discount / 100)}
                </h4>
              </div>
              <span className=" bg-red-500 text-white text-xs font-bold p-2 rounded">
                {item?.discount}% OFF
              </span>
            </div>
          ) : item?.type == "Gig" ? (
            <h4 className="text-md font-bold text-white mb-2">
              From £{item?.packages[0]?.price}
            </h4>
          ) : (
            <h4 className="text-md font-bold text-white mb-2">
              £{item?.price}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
