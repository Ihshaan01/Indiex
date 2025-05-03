import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";
import SliderCarasoul from "../components/SliderCarasoul";
import TabbedDetails from "../components/TabbedDetail";
import StarRating from "../components/StarRating";
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";

function DetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [storeItems, setStoreItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [threads, setThreads] = useState([]);
  const [loadingCritical, setLoadingCritical] = useState(true); // For critical data
  const [loadingNonCritical, setLoadingNonCritical] = useState(true); // For non-critical data
  const [error, setError] = useState(null);
  const { user } = useAuthStore();
  const type = location.state;

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");


  // Fetch critical data (item details) first
  useEffect(() => {
    const fetchCriticalData = async () => {
      try {
        if (!type || !id) throw new Error("Missing item type or ID");
        const endpoint =
          type === "Asset"
            ? `/users/get-asset-detail/${id}`
            : type === "Gig"
            ? `/users/get-gig-detail/${id}`
            : `/users/get-game-detail/${id}`;
        if (!endpoint) throw new Error("Invalid item type");

        const response = await apiClient.get(endpoint);
        setItem(response.data);
        console.log(response.data);
        setSelectedPackage(response?.data?.packages ? response?.data?.packages[0]:"")
      } catch (error) {
        setError("Failed to fetch item details. Please try again later.");
        console.error(error);
      } finally {
        setLoadingCritical(false);
      }
    };

    fetchCriticalData();
  }, [id, type]);

  // Fetch non-critical data (related items, store items, reviews, threads) after critical data
  useEffect(() => {
    if (!item) return; // Wait until item is loaded

    const fetchNonCriticalData = async () => {
      try {
        const [relatedResponse, storeResponse, reviewResponse, chatResponse] =
          await Promise.allSettled([
            apiClient.get(
              type === "Asset"
                ? "/users/assets"
                : type === "Gig"
                ? "/users/gigs"
                : "/users/games"
            ),
            apiClient.get(
              type === "Asset"
                ? `/users/get-stores-assets/${item.store._id}`
                : type === "Gig"
                ? `/users/get-stores-gigs/${item.store._id}`
                : `/users/get-stores-games/${item.store._id}`
            ),
            apiClient.get(`/users/reviews/${type.toLowerCase()}/${id}`),
            apiClient.get("/users/chats"),
          ]);

        console.log(
          relatedResponse.value.data,
          storeResponse.value.data,
          reviewResponse.value.data,
          chatResponse.value.data
        );
        // Related Items
        const filteredRelatedItems = relatedResponse.value.data[
          type === "Asset" ? "assets" : type === "Gig" ? "gigs" : "games"
        ]
          .filter((i) => i._id !== id)
          .slice(0, 4);
        setRelatedItems(filteredRelatedItems);

        // Store Items
        const filteredStoreItems = storeResponse.value.data[
          type === "Asset" ? "assets" : type === "Gig" ? "gigs" : "games"
        ]
          .filter((i) => i._id !== id)
          .slice(0, 4);
        setStoreItems(filteredStoreItems);

        // Reviews
        setReviews(reviewResponse.value.data.reviews);

        // Chat Threads
        setThreads(chatResponse.value.data.threads);
      } catch (error) {
        console.error("Error fetching non-critical data:", error);
        // Optionally set a non-critical error state if you want to display it
      } finally {
        setLoadingNonCritical(false);
      }
    };

    fetchNonCriticalData();
  }, [item, id, type]);

  const handleAddToCart = async () => {
    if (!user) return alert("Please log in to add items to your cart.");
    try {
      await apiClient.post("/users/add-to-cart", {
        userId: user.id,
        itemId: id,
        type: type,
        quantity: 1,
      });
      alert("Item added to cart successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add item to cart.";
      alert(errorMessage);
    }
  };

  const handleLaunchDemo = () => {
    if (type === "Game" && item.webglDemoZip) {
      navigate("/game", { state: { webglDemoZip: item.webglDemoZip } });
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in to submit a review.");
    if (newRating < 1 || newRating > 5)
      return alert("Please select a rating between 1 and 5 stars.");

    try {
      const response = await apiClient.post("/users/reviews", {
        itemId: id,
        itemType: type.toLowerCase(),
        rating: newRating,
        comment: newComment,
      });
      setReviews((prev) => [...prev, response.data.review]);
      setNewRating(0);
      setNewComment("");
      alert("Review submitted successfully!");

      const updatedItem = await apiClient.get(
        `/users/get-${type.toLowerCase()}-detail/${id}`
      );
      setItem(updatedItem.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to submit review.";
      alert(errorMessage);
    }
  };

  const handleChatWithFreelancer = async () => {
    if (!user) return alert("Please log in to chat with the freelancer.");

    try {
      const existingThread = threads.find((thread) => thread.gigId === id);
      if (existingThread) {
        navigate(`/chat/${existingThread._id}`, {
          state: {
            storeId: item.store._id,
            storeName: item.store.name,
            receiverId: item.store.user,
            chatId: existingThread._id,
            gigId: item._id,
            type: "Gig",
          },
        });
      } else {
        const defaultMessage = `Hi, I'm interested in your gig: ${item.productName}. Let's discuss!`;
        const response = await apiClient.post("/users/chats", {
          gigId: id,
          content: defaultMessage,
          senderId: user.id,
          receiverId: item.store.user,
        });

        const newChatId = response.data.chatId;
        if (newChatId) {
          const updatedThreads = await apiClient.get("/users/chats");
          setThreads(updatedThreads.data.threads);
          navigate(`/chat/${newChatId}`, {
            state: {
              storeId: item.store._id,
              storeName: item.store.name,
              receiverId: item.store.user,
              chatId: newChatId,
              gigId: item._id,
              type: "Gig",
            },
          });
        } else {
          throw new Error("Failed to get chat ID from response.");
        }
      }
    } catch (error) {
      console.error("Error initiating chat:", error);
      alert("Failed to start chat. Please try again later.");
    }
  };

  if (loadingCritical) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  if (!item) {
    return <div className="text-white text-center py-10">Item not found.</div>;
  }
  console.log(selectedPackage);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] mt-5">
        <div className="px-3 md:pl-12">
          <SliderCarasoul
            product={{ images: item.images, video: item.youtubeLink }}
          />
        </div>
        <div className="p-6 text-white bg-gray-900 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <h1 className="text-2xl font-bold text-white">
              {item.productName}
            </h1>
            <div className="flex items-center gap-2">
              <StarRating rating={item.ratingAverage || 0} />
              <span className="text-gray-300 text-sm font-medium">
                {item.ratingAverage || 0} ({item.totalRating || 0} reviews)
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <img
              src={item.store?.image}
              alt="store"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-700"
            />
            <p className="text-gray-200 font-medium">
              {item.store?.name || "Unknown Store"}
            </p>
          </div>

          <div className="mt-6">
            {type === "Asset" && (
              <div className="flex items-center gap-3">
                {item.discount ? (
                  <>
                    <p className="text-2xl font-bold text-red-500">
                      £
                      {(
                        item.price -
                        (item.price * item.discount) / 100
                      ).toFixed(2)}
                    </p>
                    <p className="text-lg text-gray-500 line-through">
                      £{item.price.toFixed(2)}
                    </p>
                    <span className="bg-red-500/20 text-red-300 text-xs font-semibold px-2 py-1 rounded-full">
                      {item.discount}% OFF
                    </span>
                  </>
                ) : (
                  <p className="text-2xl font-bold text-white">
                    £{item.price.toFixed(2)}
                  </p>
                )}
              </div>
            )}

            {type === "Gig" && item.packages && (
              <div className="space-y-4">
                <select
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={item.packages[0]?.name.toLowerCase()}
                  onChange={(e) => {
                    setSelectedPackage(item.packages.find(
                      (pkg) => pkg.name.toLowerCase() === e.target.value
                    )) 
                  }}
                >
                  {item.packages.map((pkg) => (
                    <option key={pkg.name} value={pkg.name.toLowerCase()}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                 {selectedPackage &&(   <div
                      key={selectedPackage.name}
                      className="text-white transition-opacity duration-200"
                      style={{
                        display:
                       "block"
                      }}
                    >
                      <p className="text-2xl font-bold">
                        £{selectedPackage.price.toFixed(2)}
                      </p>
                      <p className="mt-2 text-gray-300">{selectedPackage.services}</p>
                    </div>)}
                 
                  
                </div>
              </div>
            )}

            {type === "Game" && (
              <div className="flex items-center gap-3">
                {item.discount ? (
                  <>
                    <p className="text-2xl font-bold text-red-500">
                      £
                      {(
                        item.price -
                        (item.price * item.discount) / 100
                      ).toFixed(2)}
                    </p>
                    <p className="text-lg text-gray-500 line-through">
                      £{item.price.toFixed(2)}
                    </p>
                    <span className="bg-red-500/20 text-red-300 text-xs font-semibold px-2 py-1 rounded-full">
                      {item.discount}% OFF
                    </span>
                  </>
                ) : (
                  <p className="text-2xl font-bold text-white">
                    £{item.price.toFixed(2)}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4">
            {type === "Gig" ? (
              <button
                onClick={handleChatWithFreelancer}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold text-lg rounded-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md"
              >
                Chat with Freelancer
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md"
              >
                Add to Cart
              </button>
            )}
            {type === "Game" && item.webglDemoZip && (
              <button
                onClick={handleLaunchDemo}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-md"
              >
                Launch Game Demo
              </button>
            )}
          </div>

          {(type === "Asset" || type === "Game") && (
            <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">File Size</span>
                  <span className="text-white font-medium">
                    {item.fileSize} MB
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Version</span>
                  <span className="text-white font-medium">
                    {item.latestVersion}
                  </span>
                </div>
                {type === "Game" && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Platform</span>
                    <span className="text-white font-medium">WebGL</span>
                  </div>
                )}
                <div className="flex justify-between items-center col-span-2">
                  <span className="text-gray-400">Release Date</span>
                  <span className="text-white font-medium">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] mt-5">
        <div>
          {loadingNonCritical ? (
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <div className="h-6 bg-gray-700 rounded w-1/3 mb-4 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ) : (
            <TabbedDetails
              description={item.description}
              keywords={item.keywords}
              store={item.store}
              reviews={reviews}
              setReviews={setReviews}
              handleSubmitReview={handleSubmitReview}
              newRating={newRating}
              setNewRating={setNewRating}
              newComment={newComment}
              setNewComment={setNewComment}
              user={user}
              itemId={id}
              itemType={type.toLowerCase()}
            />
          )}
        </div>
        <div></div>
      </div>

      <div className="my-10">
       
        {loadingNonCritical ? (
          <>
           <h3 className="text-2xl font-bold mb-4 mx-10 text-white">
           You Might Also Like
         </h3>
          <div className="grid md:grid-cols-4 gap-4 mx-10">
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
          </>
        ) : (
          <div className="grid md:grid-cols-4 gap-4 mx-10">
            {relatedItems.map((card, index) => (
              <Card key={index} item={card} />
            ))}
          </div>
        )}
      </div>

      {storeItems.length > 0 && (
        <div className="my-10">
          <h3 className="text-2xl font-bold mb-4 mx-10 text-white">
            More from Same Store
          </h3>
          {loadingNonCritical ? (
            <div className="grid md:grid-cols-4 gap-4 mx-10">
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
          ) : (
            <div className="grid md:grid-cols-4 gap-4 mx-10">
              {storeItems.map((card, index) => (
                <Card key={index} item={card} />
              ))}
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default DetailPage;
