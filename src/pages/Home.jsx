import React from "react";
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  cameraAssets,
  CharacterPack,
  CustomWebsiteDesign,
  ExtremeRacing,
  FantasyAdventure,
  FPSBattleRoyale,
  MindBenderPuzzle,
  MobileAppDevelopment,
  ProfessionalLogoDesigns,
  SoundEffectBundle,
  UIIconPack,
  VoiceoverServices,
} from "../assets";

export default function Home() {
  const CardData = [
    {
      image: cameraAssets,
      name: "Camera Assets",
      storeName: "DesignPro Studio",
      ratingAverage: 4.5,
      totalRating: 50,
      discount: 20,
      price: 30,
      type: "asset",
    },
    {
      image: CharacterPack,
      name: "3D Character Pack",
      storeName: "GameDev Hub",
      ratingAverage: 4.8,
      totalRating: 75,
      discount: 15,
      price: 50,
      type: "asset",
    },
    {
      image: UIIconPack,
      name: "UI Icon Pack",
      storeName: "CreativePixels",
      ratingAverage: 4.7,
      totalRating: 90,
      discount: 10,
      price: 20,
      type: "asset",
    },
    {
      image: SoundEffectBundle,
      name: "Sound Effects Bundle",
      storeName: "AudioMasters",
      ratingAverage: 4.6,
      totalRating: 65,
      discount: 5,
      price: 15,
      type: "asset",
    },
  ];

  const GigsData = [
    {
      image: ProfessionalLogoDesigns,
      name: "Professional Logo Designs",
      storeName: "DesignPro Studio",
      ratingAverage: 4.5,
      totalRating: 50,
      type: "gig",
      price: 30,
    },
    {
      image: MobileAppDevelopment,
      name: "Mobile App Development",
      storeName: "Tech Innovators",
      ratingAverage: 4.8,
      totalRating: 80,
      type: "gig",
      price: 100,
    },
    {
      image: VoiceoverServices,
      name: "Voiceover Services",
      storeName: "VoiceMasters",
      ratingAverage: 4.7,
      totalRating: 70,
      type: "gig",
      price: 50,
    },
    {
      image: CustomWebsiteDesign,
      name: "Custom Website Design",
      storeName: "WebCreators",
      ratingAverage: 4.6,
      totalRating: 60,
      type: "gig",
      price: 150,
    },
  ];

  const GamesData = [
    {
      image: FantasyAdventure,
      name: "Fantasy Adventure",
      storeName: "EpicGames Studio",
      ratingAverage: 4.5,
      totalRating: 120,
      type: "game",
      price: 25,
    },
    {
      image: FPSBattleRoyale,
      name: "FPS Battle Royale",
      storeName: "Warzone Studios",
      ratingAverage: 4.7,
      totalRating: 200,
      type: "game",
      price: 40,
    },
    {
      image: ExtremeRacing,
      name: "Extreme Racing",
      storeName: "SpeedWay Games",
      ratingAverage: 4.6,
      totalRating: 180,
      type: "game",
      price: 35,
    },
    {
      image: MindBenderPuzzle,
      name: "Mind Bender Puzzle",
      storeName: "BrainTeasers Inc.",
      ratingAverage: 4.8,
      totalRating: 90,
      type: "game",
      price: 15,
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
                Name={card.name}
                storeName={card.storeName}
                ratingAverage={card.ratingAverage}
                totalrating={card.totalRating}
                price={card.price}
                type={card.type}
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
              Name={card.name}
              storeName={card.storeName}
              ratingAverage={card.ratingAverage}
              totalrating={card.totalRating}
              discount={card.discount}
              price={card.price}
              type={card.type}
            />
          ))}
        </div>
      </div>
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white"> Top Games</h3>
        <div className="grid lg:grid-cols-4 gap-4 mx-10 md:grid-cols-2 grid-cols-1">
          {GamesData.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              Name={card.name}
              storeName={card.storeName}
              ratingAverage={card.ratingAverage}
              totalrating={card.totalRating}
              discount={card.discount}
              price={card.price}
              type={card.type}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
