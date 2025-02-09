import React from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { DropDown } from "./DropDown";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const { image, gigName, storeName, discount, price, quantity } = item;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="flex justify-between items-center border-b pb-4 mb-4 w-full mt-3 ">
      {/* Product Info Section */}
      <div className="flex items-start gap-4">
        <img
          src={image}
          alt={gigName}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div className="flex flex-col  items-start justify-between h-24">
          <div>
            <h5 className="text-gray-400 text-xs">{storeName}</h5>
            <h4 className="text-gray-200 font-semibold text-lg">{gigName}</h4>
          </div>

          <button
            onClick={onRemove}
            className=" text-red-500 text-xs hover:underline mt-2"
          >
            <span className="flex justify-center items-center">
              <span className="mr-2">
                <IoTrashBinOutline />
              </span>{" "}
              Remove
            </span>
          </button>
        </div>
      </div>

      {/* Price and Quantity Section */}
      <div className="flex flex-col items-end gap-4">
        {/* Pricing */}
        <div className="text-right mr-3">
          <p className="text-red-500 font-bold text-lg">£{discountedPrice}</p>
          <p className="text-gray-400 line-through">£{price}</p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="quantity"
            className="text-gray-400 text-sm font-semibold"
          >
            Quantity
          </label>
          <DropDown
            buttonLabel="1"
            items={[{ val: "1" }, { val: "2" }]}
            onSelect={(val) => {
              onQuantityChange(val);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
