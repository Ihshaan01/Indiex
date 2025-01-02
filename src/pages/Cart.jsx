import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

function Cart() {
  const CardData = [
    {
      image: "https://via.placeholder.com/150",
      gigName: "Camera Assets",
      storeName: "DesignPro Studio",
      ratingAverage: 4.5,
      totalrating: 50,
      discount: 20,
      price: 30,
    },
    {
      image: "https://via.placeholder.com/150",
      gigName: "Camera Assets",
      storeName: "DesignPro Studio",
      ratingAverage: 4.5,
      totalrating: 50,
      discount: 20,
      price: 30,
    },
    {
      image: "https://via.placeholder.com/150",
      gigName: "Camera Assets",
      storeName: "DesignPro Studio",
      ratingAverage: 4.5,
      totalrating: 50,
      discount: 20,
      price: 30,
    },

    {
      image: "https://via.placeholder.com/150",
      gigName: "Camera Assets",
      storeName: "DesignPro Studio",
      ratingAverage: 4.5,
      totalrating: 50,
      discount: 20,
      price: 30,
    },
  ];
  const [items, setItems] = useState([
    {
      image: "https://via.placeholder.com/150",
      gigName: "Camera Assets",
      storeName: "DesignPro Studio",
      discount: 20,
      price: 30,
      quantity: 1,
    },
    {
      image: "https://via.placeholder.com/150",
      gigName: "Camera Assets",
      storeName: "DesignPro Studio",
      discount: 20,
      price: 30,
      quantity: 1,
    },
    {
      image: "https://via.placeholder.com/150",
      gigName: "Camera Assets",
      storeName: "DesignPro Studio",
      discount: 20,
      price: 30,
      quantity: 1,
    },
  ]);

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = parseInt(newQuantity, 10);
    setItems(updatedItems);
  };
  const subtotal = items.reduce(
    (total, item) =>
      total + (item.price - (item.price * item.discount) / 100) * item.quantity,
    0
  );
  const itemsCount = items.reduce((count, item) => count + item.quantity, 0);
  const savings = items.reduce(
    (total, item) =>
      total + ((item.price * item.discount) / 100) * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Proceeding to checkout!");
  };
  return (
    <div>
      <Header />
      <div className="mb-20" />
      {items.length > 0 ? (
        <div className="grid grid-cols-[70%_30%] mx-10 gap-2  ">
          <div className="flex flex-col justify-center items-center shadow-md p-3 px-5">
            <div className="flex flex-row justify-between w-full ">
              <p className="text-2xl font-semibold">
                {items.length} item in Your Cart
              </p>
              <p className="text-xl font-semibold mr-3"> Total </p>
            </div>
            <div className="my-3 w-full">
              {items.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  onRemove={() => handleRemoveItem(index)}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(index, newQuantity)
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center shadow-md max-h-96 ">
            <CartSummary
              subtotal={subtotal}
              itemsCount={itemsCount}
              savings={savings}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      ) : (
        <div className=" h-96 w-full my-10 flex justify-center items-center">
          <p className="text-xl font-semibold">Your cart is empty!</p>
        </div>
      )}

      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10"> You Might Also Like</h3>
        <div className="grid grid-cols-4 gap-4 mx-10">
          {CardData.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              gigName={card.gigName}
              storeName={card.storeName}
              ratingAverage={card.ratingAverage}
              totalrating={card.totalrating}
              discount={card.discount}
              price={card.price}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
