import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";
import { sokitIoURL } from "../utils/Constants";

const socket = io(sokitIoURL); // Adjust to your backend URL

function ChatPage() {
  const { chatId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receiverId, setReceiverId] = useState(
    state?.initiatorId === user?.id
      ? state?.gigOwnerId
      : state?.initiatorId || null
  );
  const [gigId, setGigId] = useState(state?.gigId || null);

  // Fetch initial chat history and determine receiver/gigId
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        if (state?.chatId) {
          const response = await apiClient.get(`/users/chats/${state?.chatId}`);
          const fetchedMessages = response.data.messages;
          console.log("Chat history response:", response.data);
          setMessages(fetchedMessages);
        } else {
          setMessages([]);
        }
      } catch (err) {
        setError("Failed to load chat history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      console.log(state?.chatId);
      fetchChatHistory();
      socket.emit("joinChat", state?.chatId); // Join with chatId once set
    } else {
      setLoading(false);
      setError("Please log in to view chat.");
    }
  }, [chatId, user, state?.chatId]);

  // Listen for new messages
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      if (message.chatId === chatId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
      if (!receiverId && message.receiver._id !== user?.id) {
        setReceiverId(message.receiver._id);
      }
    });

    // Re-join room if gigId changes
    if (gigId) {
      socket.emit("joinChat", gigId);
    }

    // Cleanup listener on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId, receiverId, user?.id, gigId]);

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Sending message:", { newMessage, user, receiverId, gigId });
      if (!newMessage.trim() || !user || !gigId) {
        console.log("Cannot send message:", {
          newMessage,
          user,
          receiverId,
          gigId,
        });
        return;
      }

      socket.emit(
        "sendMessage",
        {
          gigId,
          content: newMessage,
          senderId: user.id,
          receiverId,
          chat_Id: chatId,
        },
        (response) => {
          console.log("Send message response:", response);
          if (response.status === "error") {
            alert(response.message);
          } else {
            setNewMessage("");
          }
        }
      );
    },
    [newMessage, user, gigId, receiverId, chatId]
  );

  // Full-page spinner for initial load
  if (loading && messages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Loading your chat...</p>
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
        <div className="flex items-center justify-between bg-gray-800 p-4 rounded-t-lg border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={
                state?.storeImage ||
                "https://randomuser.me/api/portraits/men/15.jpg"
              }
              alt="store"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
            />
            <div>
              <h2 className="text-lg font-semibold">
                Chat with {state?.storeName || "Store"}
              </h2>
              <p className="text-sm text-gray-400">Chat ID: {chatId}</p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>

        <div className="bg-gray-800 p-4 h-96 overflow-y-auto rounded-b-lg">
          {loading ? (
            <SkeletonChatMessages count={3} />
          ) : messages.length === 0 ? (
            <p className="text-gray-400 text-center">
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender._id === user?.id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender._id === user?.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  <p className="font-semibold">{msg.sender.username}</p>
                  <p>{msg.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="h-12 px-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

// Skeleton component for chat messages
function SkeletonChatMessages({ count }) {
  return (
    <div className="space-y-4">
      {Array(count)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg animate-pulse ${
                index % 2 === 0 ? "bg-gray-700" : "bg-blue-600"
              }`}
            >
              <div className="h-4 bg-gray-600 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              <div className="h-3 bg-gray-600 rounded w-1/4 mt-1"></div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChatPage;
