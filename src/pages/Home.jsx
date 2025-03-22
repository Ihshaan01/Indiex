import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import apiClient from "../middleware/apiMiddleware";

export default function Home() {
  const [assets, setAssets] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [games, setGames] = useState([]);
  const [loadingCritical, setLoadingCritical] = useState(true); // For critical data (e.g., assets)
  const [loadingNonCritical, setLoadingNonCritical] = useState(true); // For gigs and games
  const [error, setError] = useState(null);

  // Fetch critical data (assets) first
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await apiClient.get("/users/assets");
        setAssets(response.data.assets);
      } catch (error) {
        setError("Failed to fetch assets. Please try again later.");
        console.error(error);
      } finally {
        setLoadingCritical(false);
      }
    };

    fetchAssets();
  }, []);

  // Fetch non-critical data (gigs and games) after critical data
  useEffect(() => {
    if (loadingCritical) return; // Wait until critical data is loaded

    const fetchNonCriticalData = async () => {
      try {
        const [gigsResponse, gamesResponse] = await Promise.all([
          apiClient.get("/users/gigs"),
          apiClient.get("/users/games"),
        ]);
        setGigs(gigsResponse.data.gigs);
        setGames(gamesResponse.data.games);
      } catch (error) {
        console.error("Error fetching non-critical data:", error);
        // Optionally set a non-critical error state
      } finally {
        setLoadingNonCritical(false);
      }
    };

    fetchNonCriticalData();
  }, [loadingCritical]);

  // Memoize sliced arrays to prevent unnecessary re-renders
  const topAssets = useMemo(() => assets.slice(0, 4), [assets]);
  const topGigs = useMemo(() => gigs.slice(0, 4), [gigs]);
  const topGames = useMemo(() => games.slice(0, 4), [games]);

  // Critical loading state with a spinner
  if (loadingCritical) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div>
      <Header />
      <HeroBanner />

      {/* Top Freelancers Section */}
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">
          Top Freelancers
        </h3>
        {loadingNonCritical ? (
          <SkeletonCardGrid />
        ) : (
          <div className="grid lg:grid-cols-4 gap-4 mx-10 md:grid-cols-2 grid-cols-1">
            {topGigs.map((gig, index) => (
              <Link
                key={index}
                to={`/DetailPage/${gig._id}`}
                state={gig.type || "Gig"}
              >
                <Card item={gig} />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Top Assets Section */}
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">Top Assets</h3>
        <div className="grid lg:grid-cols-4 gap-4 mx-10 md:grid-cols-2 grid-cols-1">
          {topAssets.map((asset, index) => (
            <Link
              key={index}
              to={`/DetailPage/${asset._id}`}
              state={asset.type || "Asset"}
            >
              <Card item={asset} />
            </Link>
          ))}
        </div>
      </div>

      {/* Top Games Section */}
      <div className="my-10">
        <h3 className="text-2xl font-bold mb-4 mx-10 text-white">Top Games</h3>
        {loadingNonCritical ? (
          <SkeletonCardGrid />
        ) : (
          <div className="grid lg:grid-cols-4 gap-4 mx-10 md:grid-cols-2 grid-cols-1">
            {topGames.map((game, index) => (
              <Link
                key={index}
                to={`/DetailPage/${game._id}`}
                state={game.type || "Game"}
              >
                <Card item={game} />
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

// Skeleton Card Grid Component
function SkeletonCardGrid() {
  return (
    <div className="grid lg:grid-cols-4 gap-4 mx-10 md:grid-cols-2 grid-cols-1">
      {Array(4)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 h-64 rounded-lg animate-pulse"
          >
            <div className="h-40 bg-gray-700 rounded-t-lg"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
    </div>
  );
}
