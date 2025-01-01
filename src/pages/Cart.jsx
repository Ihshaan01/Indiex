import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

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
  return (
    <div>
      <Header />
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
