import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";
import user from "../assets/user2.png";
import { sokitIoURL } from "../utils/Constants";

const socket = io(sokitIoURL); // Adjust to your backend URL

function ChatListPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await apiClient.get("/users/chats");
        console.log("Chat list response:", response.data);
        setThreads(response.data.threads);
      } catch (err) {
        console.error("Error fetching chat list:", err);
        if (
          err.response?.status === 401 ||
          err.response?.data?.message === "Invalid or expired token"
        ) {
          logout();
          navigate("/");
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

  // Listen for chat list updates
  useEffect(() => {
    if (!user) return;

    socket.on("updateChatList", async ({ gigId }) => {
      try {
        const response = await apiClient.get("/users/chats");
        setThreads(response.data.threads);
      } catch (err) {
        console.error("Error updating chat list:", err);
      }
    });

    // Cleanup listener on unmount
    return () => {
      socket.off("updateChatList");
    };
  }, [user]);

  const handleOpenChat = (
    chatId,
    gigId,
    storeId,
    storeName,
    initiatorId,
    gigOwnerId
  ) => {
    navigate(`/chat/${chatId}`, {
      state: {
        storeId,
        gigId,
        storeName,
        chatId: chatId,
        type: "Gig",
        initiatorId,
        gigOwnerId,
      },
    });
  };

  // Full-page spinner for initial load
  if (loading && threads.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Loading your chats...</p>
        </div>
      </div>
    );
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
            {loading ? (
              <SkeletonChatList count={3} />
            ) : (
              threads.map((thread) => {
                const isSender = thread.initiator.id === user.id;
                const otherParticipant = isSender
                  ? thread.gigOwner
                  : thread.initiator;

                return (
                  <div
                    key={thread.gigId}
                    onClick={() =>
                      handleOpenChat(
                        thread._id,
                        thread.gigId,
                        thread.storeId,
                        thread.storeName,
                        thread.initiator.id,
                        thread.gigOwner.id
                      )
                    }
                    className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition-all duration-200 shadow-md"
                  >
                    <img
                      src={
                        otherParticipant.profilePic ||
                        "https://randomuser.me/api/portraits/men/15.jpg"
                      }
                      alt="participant"
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">
                          {otherParticipant.username}
                        </h2>
                        <span className="text-sm text-gray-400">
                          {thread.lastMessage?.timestamp
                            ? new Date(
                                thread.lastMessage.timestamp
                              ).toLocaleDateString()
                            : "No messages yet"}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm truncate">
                        {thread.gigName}
                      </p>
                      {thread.lastMessage && (
                        <p className="text-gray-400 text-sm truncate">
                          {thread.lastMessage.content}
                        </p>
                      )}
                      {thread.lastMessage &&
                        !thread.lastMessage.isRead &&
                        thread.gigOwner.id === user.id && (
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1"></span>
                        )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

// Skeleton component for chat list
function SkeletonChatList({ count }) {
  return (
    <div className="space-y-4">
      {Array(count)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg animate-pulse"
          >
            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                <div className="h-3 bg-gray-700 rounded w-1/4"></div>
              </div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChatListPage;
