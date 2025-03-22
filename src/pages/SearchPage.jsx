// src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../middleware/apiMiddleware";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card"; // Assuming you reuse this for results

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState({ assets: [], gigs: [], games: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch search results when query changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setResults({ assets: [], gigs: [], games: [] });
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(
          `/users/search?q=${encodeURIComponent(searchQuery)}`
        );
        if (response.status === 200) {
          setResults({
            assets: response.data.assets || [],
            gigs: response.data.gigs || [],
            games: response.data.games || [],
          });
        } else {
          setError("Failed to fetch search results.");
        }
      } catch (err) {
        setError("An error occurred while searching.");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  // Handle search input and update URL
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  // Skeleton loader for results
  const SkeletonCardGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(6)
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-6 mt-5">
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for assets, gigs, or games..."
            className="flex-1 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
          >
            Search
          </button>
        </form>

        {loading ? (
          <SkeletonCardGrid />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="space-y-8">
            {/* Assets */}
            {results.assets.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Assets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.assets.map((item, index) => (
                    <Card key={index} item={item} />
                  ))}
                </div>
              </section>
            )}

            {/* Gigs */}
            {results.gigs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Gigs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.gigs.map((item, index) => (
                    <Card key={index} item={item} />
                  ))}
                </div>
              </section>
            )}

            {/* Games */}
            {results.games.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Games</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.games.map((item, index) => (
                    <Card key={index} item={item} />
                  ))}
                </div>
              </section>
            )}

            {/* No Results */}
            {results.assets.length === 0 &&
              results.gigs.length === 0 &&
              results.games.length === 0 &&
              searchQuery && (
                <p className="text-gray-400 text-center">
                  No results found for "{searchQuery}".
                </p>
              )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
