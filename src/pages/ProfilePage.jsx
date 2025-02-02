import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const { user } = useAuthStore(); // Get the user data from the store

  // If no user is logged in, show a message
  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-800 text-white p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Profile</h1>
            <p className="text-gray-400">Please log in to view your profile.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-800 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            {/* Profile Picture */}
            <div className="flex items-center mb-6">
              <img
                src={
                  user.profilePic ||
                  "https://randomuser.me/api/portraits/men/15.jpg" // Default placeholder image
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="ml-6">
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p className="text-gray-400 capitalize">{user.role}</p>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-4">
              <div>
                <label className="text-gray-400">Email</label>
                <p className="text-white">{user.email}</p>
              </div>
              <div>
                <label className="text-gray-400">Phone Number</label>
                <p className="text-white">
                  {user.phoneNumber || "Not provided"}
                </p>
              </div>
              <div>
                <label className="text-gray-400">Role</label>
                <p className="text-white capitalize">{user.role}</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-8">
              <Link
                to="/edit-profile" // Route to the edit profile page
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
