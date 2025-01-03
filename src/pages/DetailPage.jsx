import React from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { IconContext } from "react-icons";
import { IoPersonOutline } from "react-icons/io5";
import User from "../assets/user2.png";
import ReactStars from "react-rating-stars-component";
import StarRating from "../components/StarRating";
import { DropDown } from "../components/DropDown";
import { FaHistory, FaUserEdit } from "react-icons/fa";
import ReactPlayer from "react-player/youtube";
import SliderCarasoul from "../components/SliderCarasoul";
import TabbedDetails from "../components/TabbedDetail";
function DetailPage() {
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
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const discount = 20;
  const price = 55;
  const product = {
    images: [
      "https://via.placeholder.com/800x400.png",
      "https://via.placeholder.com/800x400.png?text=Image+2",
    ],
    video: "https://www.youtube.com/watch?v=LXb3EKWsInQ", // Video link
  };
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] mt-5 ">
        <div className=" px-3 md:pl-12">
          <SliderCarasoul product={product} />
        </div>
        <div className=" p-6 text-white">
          <p className="text-xl font-semibold">Product Name</p>
          <div className="flex flex-row justify-between mt-2">
            <div className="gap-2 flex justify-center items-center">
              <img src={User} alt="profile" className="w-5 object-contain" />
              <p>Store Name</p>
            </div>
            <div className="flex items-center ">
              <StarRating
                rating={4}
                // editable
                // ratingChanged={(val) => console.log(val)}
              />
              <span className="text-gray-400 text-sm">
                {4} ({450})
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {discount && (
              <p className="text-red-500  text-xl font-semibold">
                ${price - (price % discount)}
              </p>
            )}
            <p
              className={` text-black  ${
                discount && "text-gray-400 line-through text-xl font-semibold"
              }`}
            >
              ${price}
            </p>
          </div>
          <div className="mt-4">
            <DropDown
              buttonLabel="1"
              items={[{ val: "1" }, { val: "2" }]}
              onSelect={(val) => {
                console.log(val);
              }}
            />
          </div>
          <p className="text-gray-500 text-xs font-semibold mt-2">
            Update Price and Taxes/VAT calculated at checkout
          </p>
          <div className="mt-4">
            <button className="bg-blue-500 w-full h-11 rounded-md text-white font-semibold text-lg transition duration-300 hover:scale-105 scale-100">
              Add to Cart
            </button>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-y-2">
            <div className="flex justify-between px-2 ">
              <p>File Size</p>
              <p>1 mb</p>
            </div>
            <div className="flex justify-between px-2 ">
              <p>Latest Version</p>
              <p>V 1.1</p>
            </div>
            <div className="flex justify-between px-2 ">
              <p>Release Date</p>
              <p>12/12/2024</p>
            </div>
            <div className="flex justify-between px-2 ">
              <p>Supported Platforms</p>
              <p>Unity 3D</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-[65%_35%] mt-5 ">
        <div>
          <TabbedDetails />
        </div>
        <div></div>
      </div>
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">
          {" "}
          You Might Also Like
        </h3>
        <div className="grid md:grid-cols-4 gap-4 mx-10">
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
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">
          {" "}
          More from same store
        </h3>
        <div className="grid md:grid-cols-4 gap-4 mx-10">
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

export default DetailPage;
