import React, { useState, useEffect, useMemo } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { Dialog, DialogTrigger, DialogContent } from "../components/Dialog";
import Tabs, { TabList, TabTrigger, TabContent } from "../components/Tabs";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CreateAssetForm from "../components/CreateAssetForm";
import CreateGigForm from "../components/CreateGigsForm";
import CreateGamesForm from "../components/CreateGamesForm";
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";
import StoreSettingsForm from "../components/StoreSettingsForm";
import Section from "../components/Section";
import ViewAllDialog from "../components/ViewAllDialog";

const Dashboard = () => {
  const { user, store, setStore } = useAuthStore();
  const [assets, setAssets] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [games, setGames] = useState([]);
  const [showCreateAsset, setShowCreateAsset] = useState(false);
  const [showCreateGigs, setShowCreateGigs] = useState(false);
  const [showCreateGames, setShowCreateGames] = useState(false);
  const [loadingCritical, setLoadingCritical] = useState(true); // For store settings
  const [loadingNonCritical, setLoadingNonCritical] = useState(true); // For assets, gigs, games
  const [error, setError] = useState(null);
  const [storePreview, setStorePreview] = useState(store?.image || "");
  const [storeSettings, setStoreSettings] = useState(
    store || { image: "", name: "", description: "" }
  );

  const [showAllAssets, setShowAllAssets] = useState(false);
  const [showAllGigs, setShowAllGigs] = useState(false);
  const [showAllGames, setShowAllGames] = useState(false);

  // Memoized static chart data (if reintroduced later)
  const salesData = useMemo(
    () => [
      { name: "Jan", sales: 4000 },
      { name: "Feb", sales: 3000 },
      { name: "Mar", sales: 2000 },
      { name: "Apr", sales: 2780 },
      { name: "May", sales: 1890 },
      { name: "Jun", sales: 2390 },
    ],
    []
  );

  const revenueData = useMemo(
    () => [
      { name: "Assets", revenue: 2400 },
      { name: "Gigs", revenue: 1398 },
      { name: "Games", revenue: 9800 },
    ],
    []
  );

  const userActivityData = useMemo(
    () => [
      { name: "Active Users", value: 400 },
      { name: "Inactive Users", value: 300 },
    ],
    []
  );

  const fetchAssetsByStoreId = async (storeId) => {
    try {
      const response = await apiClient.get(
        `/users/get-stores-assets/${storeId}`
      );
      console.log("Assets response:", response.data);
      if (response.status === 200) {
        setAssets(response.data?.assets || []);
      } else {
        console.error("Failed to fetch assets:", response.data?.message);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const fetchGigsByStoreId = async (storeId) => {
    try {
      const response = await apiClient.get(`/users/get-stores-gigs/${storeId}`);
      console.log("Assets response:", response.data);

      if (response.status === 200) {
        setGigs(response.data?.gigs || []);
      } else {
        console.error("Failed to fetch gigs:", response.data?.message);
      }
    } catch (error) {
      console.error("Error fetching gigs:", error);
    }
  };

  const fetchGamesByStoreId = async (storeId) => {
    try {
      const response = await apiClient.get(
        `/users/get-stores-games/${storeId}`
      );
      console.log("Assets response:", response.data);

      if (response.status === 200) {
        setGames(response.data?.games || []);
      } else {
        console.error("Failed to fetch games:", response.data?.message);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  // Fetch critical data (store settings) first
  useEffect(() => {
    if (!user?.id) {
      setError("Please log in to view your dashboard.");
      setLoadingCritical(false);
      return;
    }
    setLoadingCritical(false); // No critical fetch needed if store is already in state
  }, [user?.id]);

  // Fetch non-critical data (assets, gigs, games) after store is available
  useEffect(() => {
    if (loadingCritical) return; // Wait for critical loading to finish

    const fetchAllData = async () => {
      console.log("fetchAllData called with store._id:", store?._id);
      if (!store?._id) {
        console.log("No store found, setting empty states");
        setAssets([]);
        setGigs([]);
        setGames([]);
        setLoadingNonCritical(false); // Explicitly set false when no store
        return;
      }

      try {
        await Promise.all([
          fetchAssetsByStoreId(store._id),
          fetchGigsByStoreId(store._id),
          fetchGamesByStoreId(store._id),
        ]);
        console.log("All non-critical data fetched successfully");
      } catch (error) {
        console.error("Error fetching dashboard data:", error.message);
      } finally {
        console.log("Setting loadingNonCritical to false");
        setLoadingNonCritical(false); // Set false after fetch attempts
      }
    };

    fetchAllData();
  }, [store?._id, loadingCritical]);

  const handleCreateStore = async (storeSettings) => {
    const userId = user?.id;
    try {
      setLoadingCritical(true);
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("name", storeSettings?.name);
      formData.append("description", storeSettings?.description);
      formData.append("image", storeSettings?.image);
      
      const response = await apiClient.post("/users/store",formData);
      console.log(response.data);
      if (response.status === 201) {
        setStoreSettings(response.data?.store);
        setStorePreview(response.data?.store?.image);
        setStore(response.data?.store);
      }
    } catch (error) {
      setError("Error creating store.");
    } finally {
      setLoadingCritical(false);
    }
  };

  const handleEditStore = async (storeSettings) => {
    const formData = new FormData();
    formData.append("storeId", store?._id);
    formData.append("name", storeSettings?.name);
    formData.append("description", storeSettings?.description);
    if (storeSettings?.image) formData.append("image", storeSettings?.image);
    try {
      setLoadingCritical(true);
      const response = await apiClient.put("/users/update-store", formData);
      if (response.status === 200) {
        setStoreSettings(response.data?.store);
        setStore(response.data?.store);
        setStorePreview(response.data?.store.image);
      }
    } catch (error) {
      setError("Error updating store.");
    } finally {
      setLoadingCritical(false);
    }
  };

  // Full-page spinner for initial load
  if (loadingCritical) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row bg-gray-900 text-white border-t-2 border-gray-800">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-800 p-4 fixed md:relative hidden md:top-0 z-40 border-t md:border-t-0 border-gray-700">
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-xl font-bold">Dashboard</span>
          </div>
          <nav className="flex md:block justify-around space-y-2">
            <a
              href="#assets"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-2">🖼️</span> Assets
            </a>
            <a
              href="#gigs"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-2">💼</span> Gigs
            </a>
            <a
              href="#games"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-2">🎮</span> Games
            </a>
            <a
              href="#store-settings"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-2">⚙️</span> Store Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0 overflow-x-hidden">
          {/* Assets Section */}
          <Section
            title="Assets"
            items={assets}
            onCreate={() => setShowCreateAsset(true)}
            onViewAll={() => setShowAllAssets(true)}
            id="assets"
            loading={loadingNonCritical}
            noItemsMessage="No assets available. Create one to get started!"
            SkeletonComponent={SkeletonCardGrid}
          />

          {/* Gigs Section */}
          <Section
            title="Gigs"
            items={gigs}
            onCreate={() => setShowCreateGigs(true)}
            onViewAll={() => setShowAllGigs(true)}
            id="gigs"
            loading={loadingNonCritical}
            noItemsMessage="No gigs available. Create one to get started!"
            SkeletonComponent={SkeletonCardGrid}
          />

          {/* Games Section */}
          <Section
            title="Games"
            items={games}
            onCreate={() => setShowCreateGames(true)}
            onViewAll={() => setShowAllGames(true)}
            id="games"
            loading={loadingNonCritical}
            noItemsMessage="No games available. Create one to get started!"
            SkeletonComponent={SkeletonCardGrid}
          />

          {/* Store Settings Section */}
          <section id="store-settings" className="mb-12 px-4 md:px-8">
            <div className="min-h-screen bg-gray-800 text-white p-4 md:p-8">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">
                  Store Settings
                </h1>
                <StoreSettingsForm
                  store={store}
                  onSubmit={store ? handleEditStore : handleCreateStore}
                  loading={loadingCritical}
                />
              </div>
            </div>
          </section>

          {/* Dialogs */}
          <ViewAllDialog
            open={showAllAssets}
            onClose={() => setShowAllAssets(false)}
            title="Assets"
            items={assets}
          />
          <ViewAllDialog
            open={showAllGigs}
            onClose={() => setShowAllGigs(false)}
            title="Gigs"
            items={gigs}
          />
          <ViewAllDialog
            open={showAllGames}
            onClose={() => setShowAllGames(false)}
            title="Games"
            items={games}
          />

          <CreateAssetForm
            val={showCreateAsset}
            onOpen={() => setShowCreateAsset(true)}
            onClose={() => setShowCreateAsset(false)}
          />
          <CreateGigForm
            val={showCreateGigs}
            onOpen={() => setShowCreateGigs(true)}
            onClose={() => setShowCreateGigs(false)}
          />
          <CreateGamesForm
            val={showCreateGames}
            onOpen={() => setShowCreateGames(true)}
            onClose={() => setShowCreateGames(false)}
          />
        </main>
      </div>
      <Footer />
    </>
  );
};

// Skeleton component for card grid (adjusted to match grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
function SkeletonCardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(5)
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

export default Dashboard;
