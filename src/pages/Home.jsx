import React from "react";
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
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
  const GigsData = [
    {
      image: "https://via.placeholder.com/150",
      gigName: "Professional Logo Designs",
      storeName: "DesignPro Studio",
      ratingAverage: 4.5,
      totalrating: 50,
      isGig: true,
      price: 30,
    },
    {
      image: "https://via.placeholder.com/150",
      gigName: "Professional Logo Designs",
      storeName: "DesignPro Studio",
      ratingAverage: 4.5,
      totalrating: 50,
      isGig: true,
      price: 30,
    },
    {
      image: "https://via.placeholder.com/150",
      gigName: "Professional Logo Designs",
      storeName: "DesignPro Studio",
      ratingAverage: 4.5,
      totalrating: 50,
      isGig: true,
      price: 30,
    },

    {
      image: "https://via.placeholder.com/150",
      gigName: "Professional Logo Designs",
      storeName: "DesignPro Studio",
      ratingAverage: 4.5,
      totalrating: 50,
      isGig: true,
      price: 30,
    },
  ];
  return (
    <div>
      <Header />
      <HeroBanner />

      <div>
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">
          {" "}
          Top FreeLancers
        </h3>
        <div className="grid lg:grid-cols-4 gap-4 mx-10 md:grid-cols-2 grid-cols-1">
          {GigsData.map((card, index) => (
            <Link key={index} to="/DetailPage">
              <Card
                key={index}
                image={card.image}
                gigName={card.gigName}
                storeName={card.storeName}
                ratingAverage={card.ratingAverage}
                totalrating={card.totalrating}
                price={card.price}
                isGig={card.isGig}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">
          {" "}
          Top Assets
        </h3>
        <div className="grid lg:grid-cols-4 gap-4 mx-10 md:grid-cols-2 grid-cols-1">
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
