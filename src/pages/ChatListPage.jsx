import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";

function ChatListPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore(); // Assuming logout clears the user state
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await apiClient.get("/users/chats");
        console.log(response.data);
        setThreads(response.data.threads);
      } catch (err) {
        console.error(err);

        // Check for invalid or expired token (401 status or specific message)
        if (
          err.response?.status === 401 ||
          err.response?.data?.message === "Invalid or expired token"
        ) {
          logout(); // Clear user state
          navigate("/"); // Navigate to home screen
          return;
        }

        setError("Failed to load chat list.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchChatList();
    } else {
      setLoading(false);
      setError("Please log in to view your chats.");
    }
  }, [user, navigate, logout]);

  const handleOpenChat = (gigId, storeId, storeName) => {
    navigate(`/chat/${gigId}`, { state: { storeId, storeName, type: "Gig" } });
  };

  if (loading) {
    return <div className="text-white text-center py-10">Loading chats...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="max-w-4xl mx-auto p-6 mt-5">
        <h1 className="text-3xl font-bold mb-6">Your Chats</h1>

        {threads.length === 0 ? (
          <p className="text-gray-400 text-center">
            No chats yet. Start a conversation from a gig!
          </p>
        ) : (
          <div className="space-y-4">
            {threads.map((thread) => (
              <div
                key={thread.gigId}
                onClick={() =>
                  handleOpenChat(thread.gigId, thread.storeId, thread.storeName)
                }
                className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition-all duration-200 shadow-md"
              >
                <img
                  src={thread.storeImage || "https://via.placeholder.com/50"}
                  alt="store"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                      {thread.storeName}
                    </h2>
                    <span className="text-sm text-gray-400">
                      {new Date(
                        thread.lastMessage.timestamp
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm truncate">
                    {thread.gigName}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {thread.lastMessage.content}
                  </p>
                  {!thread.lastMessage.isRead &&
                    thread.lastMessage.receiverId === user.id && (
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1"></span>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ChatListPage;
