import React, { useEffect, useState } from "react";
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
import axios from "axios"; // Import axios for API calls
import apiClient from "../middleware/apiMiddleware";

export default function Home() {
  const [assets, setAssets] = useState([]); // State to store assets data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [gigs, setGigs] = useState([]);
  // Fetch assets data from the API
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await apiClient.get("/users/assets"); // Call the API
        setAssets(response.data.assets); // Set the fetched assets data
      } catch (error) {
        setError("Failed to fetch assets. Please try again later."); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };
    const fetchGigs = async () => {
      try {
        const response = await apiClient.get("/users/gigs"); // Call the API
        setGigs(response.data.gigs); // Set the fetched assets data
      } catch (error) {
        setError("Failed to fetch assets. Please try again later."); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAssets();
    fetchGigs();
  }, []);

  const GamesData = [
    {
      images: ["https://via.placeholder.com/150"],
      productName: "Camera Assets",
      store: { name: "DesignPro Studio" },
      ratingAverage: 4.5,
      totalrating: 50,
      discount: 20,
      price: 30,
    },
  ];

  // Render loading state
  if (loading) {
    return <div className="text-white text-center">Loading assets...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div>
      <Header />
      <HeroBanner />

      {/* Top Freelancers Section */}
      <div>
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">
          Top FreeLancers
        </h3>
        <div className="grid lg:grid-cols-4 gap-4 mx-10 md:grid-cols-2 grid-cols-1">
          {gigs.slice(0, 4).map((gig, index) => (
            <Link key={index} to={`/DetailPage/${gig._id}`} state={gig.type}>
              <Card item={gig} />
            </Link>
          ))}
        </div>
      </div>

      {/* Top Assets Section */}
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">Top Assets</h3>
        <div className="grid lg:grid-cols-4 gap-4 mx-10 md:grid-cols-2 grid-cols-1">
          {assets.slice(0, 4).map((asset, index) => (
            <Link
              key={index}
              to={`/DetailPage/${asset._id}`}
              state={asset.type}
            >
              <Card item={asset} />
            </Link>
          ))}
        </div>
      </div>

      {/* Top Games Section */}
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">Top Games</h3>
        <div className="grid lg:grid-cols-4 gap-4 mx-10 md:grid-cols-2 grid-cols-1">
          {GamesData.map((game, index) => (
            <Link
              key={index}
              to={`/DetailPage/${game._id || index}`}
              state={game.type || index}
            >
              <Card item={game} />
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
