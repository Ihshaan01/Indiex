import React, { useState, useEffect } from "react";
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
import CreateGigForm from "../components/CreateGigsForm"; // Assuming this is the correct import
import CreateGamesForm from "../components/CreateGamesForm";
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";
import StoreSettingsForm from "../components/StoreSettingsForm";
import Section from "../components/Section";
import ViewAllDialog from "../components/ViewAllDialog";

const Dashboard = () => {
  const { user, store, setStore } = useAuthStore();
  const [assets, setAssets] = useState([]);
  const [gigs, setGigs] = useState([]); // Initialized as empty array to be populated by API
  const [games, setGames] = useState([
    // Keeping static games data as a fallback or until you implement games API
    {
      images: ["https://via.placeholder.com/150"],
      productName: "Camera Assets",
      store: { name: "DesignPro Studio" },
      ratingAverage: 4.5,
      totalrating: 50,
      discount: 20,
      price: 30,
    },
  ]);
  const [showCreateAsset, setShowCreateAsset] = useState(false);
  const [showCreateGigs, setShowCreateGigs] = useState(false);
  const [showCreateGames, setShowCreateGames] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storePreview, setStorePreview] = useState(store?.image || "");
  const [storeSettings, setStoreSettings] = useState(
    store || {
      image: "",
      name: "",
      description: "",
    }
  );

  const [showAllAssets, setShowAllAssets] = useState(false);
  const [showAllGigs, setShowAllGigs] = useState(false);
  const [showAllGames, setShowAllGames] = useState(false);

  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ];

  const revenueData = [
    { name: "Assets", revenue: 2400 },
    { name: "Gigs", revenue: 1398 },
    { name: "Games", revenue: 9800 },
  ];

  const userActivityData = [
    { name: "Active Users", value: 400 },
    { name: "Inactive Users", value: 300 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Store settings updated:", storeSettings);
  };

  const [message, setMessage] = useState("");

  const handleCreateStore = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("name", storeSettings.name);
    formData.append("description", storeSettings.description);
    if (storeSettings.image) {
      formData.append("image", storeSettings.image);
    }
    const userId = user.id;
    const name = storeSettings.name;
    const description = storeSettings.description;
    const image = storeSettings.image;
    try {
      setLoading(true);
      const response = await apiClient.post("/users/store", {
        userId,
        name,
        description,
        image,
      });
      console.log(response);

      if (response.status === 201) {
        console.log(response.data);
        setMessage(response.data.message);
        setStoreSettings(response.data.store);
        setStorePreview(response.data.store.image);
        setStore(response.data.store);
      } else {
        setMessage(response.data.message || "Failed to create store.");
      }
    } catch (error) {
      setMessage("Error creating store.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditStore = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("storeId", store._id);
    formData.append("name", storeSettings.name);
    formData.append("description", storeSettings.description);
    if (storeSettings.image) {
      formData.append("image", storeSettings.image);
    }
    try {
      setLoading(true);
      const response = await apiClient.put("/users/update-store", formData);
      console.log(response);

      if (response.status === 200) {
        setMessage(response.data.message);
        setStoreSettings(response.data.store);
        setStore(response.data.store);
        setStorePreview(response.data.store.image);
      } else {
        setMessage(response.data.message || "Failed to Update store.");
      }
    } catch (error) {
      setMessage("Error Updating store.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAssetsByStoreId = async (storeId) => {
    try {
      const response = await apiClient.get(
        `/users/get-stores-assets/${storeId}`
      );
      if (response.status === 200) {
        console.log("Assets:", response.data.assets);
        setAssets(response.data.assets); // Update assets state
      } else {
        console.error("Failed to fetch assets:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const fetchGigsByStoreId = async (storeId) => {
    try {
      const response = await apiClient.get(`/users/get-stores-gigs/${storeId}`);
      if (response.status === 200) {
        console.log("Gigs:", response.data.gigs);
        setGigs(response.data.gigs); // Update gigs state
      } else {
        console.error("Failed to fetch gigs:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching gigs:", error);
    }
  };

  useEffect(() => {
    if (store?._id) {
      fetchAssetsByStoreId(store._id);
      fetchGigsByStoreId(store._id); // Fetch gigs when store ID is available
    }
  }, [store?._id]);

  return (
    <>
      <Header />
      <div className="flex bg-gray-900 text-white border-t-2 border-gray-800">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 p-4">
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-xl font-bold">Dashboard</span>
          </div>
          <nav className="space-y-2">
            <a
              href="#dashboard"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-2">📊</span>
              Dashboard
            </a>
            <a
              href="#assets"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-2">🖼️</span>
              Assets
            </a>
            <a
              href="#gigs"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-2">💼</span>
              Gigs
            </a>
            <a
              href="#games"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-2">🎮</span>
              Games
            </a>
            <a
              href="#store-settings"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-2">⚙️</span>
              Store Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 example">
          <section id="dashboard" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 bg-gray-700 rounded-lg shadow"
              >
                <h3 className="text-lg font-bold mb-2">Sales Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 bg-gray-700 rounded-lg shadow"
              >
                <h3 className="text-lg font-bold mb-2">Revenue by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 bg-gray-700 rounded-lg shadow"
              >
                <h3 className="text-lg font-bold mb-2">User Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userActivityData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </section>

          {/* Assets Section */}
          <Section
            title="Assets"
            items={assets}
            onCreate={() => setShowCreateAsset(true)}
            onViewAll={() => setShowAllAssets(true)}
            id="assets"
          />

          {/* Gigs Section */}
          <Section
            title="Gigs"
            items={gigs}
            onCreate={() => setShowCreateGigs(true)}
            onViewAll={() => setShowAllGigs(true)}
            id="gigs"
          />

          {/* Games Section */}
          <Section
            title="Games"
            items={games}
            onCreate={() => setShowCreateGames(true)}
            onViewAll={() => setShowAllGames(true)}
            id="games"
          />

          <section id="store-settings" className="mb-12">
            <div className="min-h-screen bg-gray-800 text-white p-8">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Store Settings</h1>
                <StoreSettingsForm
                  store={store}
                  onSubmit={store ? handleEditStore : handleCreateStore}
                  loading={loading}
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

export default Dashboard;
