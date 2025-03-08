import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import apiClient from "../middleware/apiMiddleware";

export default function Home() {
  const [assets, setAssets] = useState([]); // State to store assets data
  const [gigs, setGigs] = useState([]); // State to store gigs data
  const [games, setGames] = useState([]); // State to store games data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch data from APIs
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await apiClient.get("/users/assets");
        setAssets(response.data.assets);
      } catch (error) {
        setError("Failed to fetch assets. Please try again later.");
      }
    };

    const fetchGigs = async () => {
      try {
        const response = await apiClient.get("/users/gigs");
        setGigs(response.data.gigs);
      } catch (error) {
        setError("Failed to fetch gigs. Please try again later.");
      }
    };

    const fetchGames = async () => {
      try {
        const response = await apiClient.get("/users/games"); // Call the getAllGames API
        setGames(response.data.games); // Set the fetched games data
      } catch (error) {
        setError("Failed to fetch games. Please try again later.");
      }
    };

    // Fetch all data concurrently and set loading to false when all are done
    Promise.all([fetchAssets(), fetchGigs(), fetchGames()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false)); // Ensure loading stops even if there's an error
  }, []);

  // Render loading state
  if (loading) {
    return <div className="text-white text-center">Loading content...</div>;
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
          Top Freelancers
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
          {games.slice(0, 4).map((game, index) => (
            <Link key={index} to={`/DetailPage/${game._id}`} state={game.type}>
              <Card item={game} />
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
