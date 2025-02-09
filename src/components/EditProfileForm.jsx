import React, { useState } from "react";
import { Dialog, DialogContent } from "./Dialog";
import apiClient from "../middleware/apiMiddleware";

function EditProfileForm({ isOpen, onClose, user, onSave }) {
  const [profileData, setProfileData] = useState({
    profilePic: user.profilePic || "",
    username: user.username || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    role: user.role || "",
  });

  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    const newErrors = {};
    if (!profileData.username) newErrors.username = "Username is required";
    if (!profileData.email) newErrors.email = "Email is required";
    if (!profileData.role) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setProfileData({ ...profileData, profilePic: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("userId", user.id); // Assuming `user` is passed as a prop
      formData.append("username", profileData.username);
      formData.append("email", profileData.email);
      formData.append("phoneNumber", profileData.phoneNumber);
      formData.append("role", profileData.role);

      // Append the image file if selected
      if (selectedImage) {
        formData.append("image", profileData.profilePic);
      }

      // Call the API to update the profile
      const response = await apiClient.put("/users/update-profile", formData);
      console.log(response);
      console.log(response.statusText);
      if (response.statusText !== "OK") {
        throw new Error("Failed to update profile", response.data.error);
      }

      onSave(response.data.user); // Pass the updated user data to the parent component
      onClose(); // Close the dialog after saving
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        // Server responded with a status code other than 2xx
        alert(`Error: ${error.response.data.error || "Something went wrong!"}`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
      onClose={onClose}
      style={{ width: "500px" }}
    >
      <DialogContent>
        <div className="flex justify-between items-center mb-6 ">
          <h3 className="text-2xl font-bold text-gray-800">Edit Profile</h3>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <label className="relative cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-all duration-300">
                  {selectedImage || profileData.profilePic ? (
                    <img
                      src={selectedImage || profileData.profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full">
                  <span className="text-white text-sm">Click to edit</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phoneNumber}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    phoneNumber: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
            </div>
          </div>

          <div className="flex justify-end">
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
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileForm;
