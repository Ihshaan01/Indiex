import React from "react";

const CartSummary = ({ subtotal, itemsCount, savings, onCheckout }) => {
  return (
    <div className=" p-6 rounded-md max-w-sm mx-auto w-full">
      {/* Subtotal Section */}
      <div className="mb-4">
        <h4 className="text-gray-800 font-semibold text-lg">
          Subtotal ({itemsCount} {itemsCount === 1 ? "item" : "items"})
        </h4>
        <p className="text-black text-3xl font-bold">${subtotal}</p>
        <p className="text-gray-600 mt-1">Taxes/VAT calculated at checkout</p>
      </div>

      {/* Savings Section */}
      <div className="mb-4">
        <p className="text-green-600 font-medium text-lg">
          You save: <span className="text-green-500">${savings}</span>
        </p>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition"
      >
        Process to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
