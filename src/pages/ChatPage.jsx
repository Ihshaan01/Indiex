import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";

function ChatPage() {
  const { gigId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await apiClient.get(`/users/chats/${gigId}`);
        console.log(response.data);
        setMessages(response.data.messages);
      } catch (err) {
        setError("Failed to load chat history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchChatHistory();
    } else {
      setLoading(false);
      setError("Please log in to view chat.");
    }
  }, [gigId, user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await apiClient.post("/users/chats", {
        gigId,
        content: newMessage,
      });
      setMessages([...messages, response.data.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message.");
    }
  };

  if (loading) {
    return <div className="text-white text-center py-10">Loading chat...</div>;
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
              src={state?.storeImage || "https://via.placeholder.com/40"}
              alt="freelancer"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
            />
            <div>
              <h2 className="text-lg font-semibold">
                Chat with {state?.storeName || "Freelancer"}
              </h2>
              <p className="text-sm text-gray-400">Gig ID: {gigId}</p>
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
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender._id === user.id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender._id === user.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
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
            className="h-12 px-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md"
          >
            Send
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default ChatPage;
