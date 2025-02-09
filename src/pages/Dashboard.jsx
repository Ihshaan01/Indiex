import React, { useState } from "react";
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
const Dashboard = () => {
  const { user, store, setStore } = useAuthStore();
  const [assets, setAssets] = useState([
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
  ]);
  const [gigs, setGigs] = useState([
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
  ]);
  const [games, setGames] = useState([
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

      if (response.status == 201) {
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

      if (response.status == 200) {
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
  return (
    <>
      <Header />
      <div className="flex  bg-gray-900 text-white border-t-2 border-gray-800 ">
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
        <main className="flex-1 p-6  example">
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
          <section id="assets" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assets.slice(0, 5).map((asset, index) => (
                <Card key={index} {...asset} />
              ))}
            </div>
            <div className="flex justify-between items-center mt-6">
              <Button onClick={() => setShowAllAssets(true)}>View All</Button>
              <Button onClick={() => setShowCreateAsset(true)}>
                Create New Asset
              </Button>
            </div>
          </section>
          <section id="gigs" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Gigs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gigs.slice(0, 5).map((asset, index) => (
                <Card key={index} {...asset} />
              ))}
            </div>
            <div className="flex justify-between items-center mt-6">
              <Button onClick={() => setShowAllAssets(true)}>View All</Button>
              <Button onClick={() => setShowCreateGigs(true)}>
                Create New Gigs
              </Button>
            </div>
          </section>
          <section id="games" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.slice(0, 5).map((asset, index) => (
                <Card key={index} {...asset} />
              ))}
            </div>
            <div className="flex justify-between items-center mt-6">
              <Button onClick={() => setShowAllAssets(true)}>View All</Button>
              <Button onClick={() => setShowCreateGames(true)}>
                Add New Games
              </Button>
            </div>
          </section>
          <section id="store-settings" className="mb-12">
            <div className="min-h-screen bg-gray-800 text-white p-8">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Store Settings</h1>

                <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                  <form onSubmit={store ? handleEditStore : handleCreateStore}>
                    <div className="space-y-6">
                      {/* Store Image */}
                      <div>
                        <label className="text-gray-400">Store Image</label>

                        {storePreview && (
                          <img
                            src={storePreview}
                            alt="Store Preview"
                            className="mt-4 w-24 h-24 rounded-lg object-cover"
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setStoreSettings((prev) => ({
                                  ...prev,
                                  image: file,
                                }));
                              };
                              reader.readAsDataURL(file);
                              setStorePreview(URL.createObjectURL(file));
                            }
                          }}
                          className="w-full p-2 bg-gray-600 rounded-lg mt-2"
                          required
                        />
                      </div>

                      {/* Store Name */}
                      <div>
                        <label className="text-gray-400">Store Name</label>
                        <input
                          type="text"
                          value={storeSettings.name}
                          onChange={(e) =>
                            setStoreSettings((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full p-2 bg-gray-600 rounded-lg mt-2"
                          placeholder="Enter store name"
                          required
                        />
                      </div>

                      {/* Store Description */}
                      <div>
                        <label className="text-gray-400">
                          Store Description
                        </label>
                        <textarea
                          value={storeSettings.description}
                          onChange={(e) =>
                            setStoreSettings((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="w-full p-2 bg-gray-600 rounded-lg mt-2"
                          placeholder="Enter store description"
                          rows={4}
                          required
                        />
                      </div>

                      {/* Save Button */}
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {loading ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                              </svg>
                              Saving Changes...
                            </span>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          {/* Dialogs */}
          <Dialog
            open={showAllAssets}
            onOpenChange={setShowAllAssets}
            onClose={() => setShowAllAssets(false)}
          >
            <DialogContent className="bg-gray-800 rounded-lg p-6 backdrop-blur-sm overflow-auto  ">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-black">All Assets</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
                {assets.map((asset, index) => (
                  <Card key={index} {...asset} />
                ))}
              </div>
            </DialogContent>
          </Dialog>
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
