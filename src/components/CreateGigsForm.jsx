import React, { useState } from "react";
import { Dialog, DialogContent } from "./Dialog";
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";

function CreateGigForm({ val, onOpen, onClose }) {
  const [storeSettings, setStoreSettings] = useState({
    category: "",
    youtubeLink: "",
    productName: "",
    description: "",
    packages: [
      { name: "Basic", price: "", services: "" },
      { name: "Standard", price: "", services: "" },
      { name: "Premium", price: "", services: "" },
    ],
    keywords: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const { store } = useAuthStore();
  const categories = [
    "Graphics & Design",
    "Programming & Tech",
    "Digital Marketing",
    "Music & Audio",
    "Video & Animation",
    "Writing & Translation",
    "Photography",
    "Consulting",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (images.length === 0)
      newErrors.images = "At least one image is required";
    if (!storeSettings.category) newErrors.category = "Category is required";
    if (!storeSettings.productName)
      newErrors.productName = "Gig name is required";
    if (!storeSettings.description)
      newErrors.description = "Description is required";
    if (storeSettings.packages.some((pkg) => !pkg.price || !pkg.services))
      newErrors.packages = "All packages must have a price and services";
    if (!storeSettings.keywords) newErrors.keywords = "Keywords are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("storeId", store._id);
    formData.append("type", "Gig");
    formData.append("category", storeSettings.category);
    formData.append("youtubeLink", storeSettings.youtubeLink);
    formData.append("productName", storeSettings.productName);
    formData.append("description", storeSettings.description);
    formData.append("packages", JSON.stringify(storeSettings.packages));
    formData.append("keywords", storeSettings.keywords);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await apiClient.post("/users/create-gig", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        console.log("Gig created:", response.data.gig);
        onClose(); // Close dialog on success
      }
    } catch (error) {
      console.error("Error creating gig:", error);
      setErrors({
        ...errors,
        submit: "Failed to create gig. Please try again.",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handlePackageChange = (index, field, value) => {
    const newPackages = [...storeSettings.packages];
    newPackages[index][field] = value;
    setStoreSettings({ ...storeSettings, packages: newPackages });
  };

  return (
    <Dialog open={val} onOpenChange={onOpen} onClose={onClose}>
      <DialogContent className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="mb-8">
          <h3 className="text-3xl font-semibold text-gray-900">
            Create New Gig
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Fill out the details to create your gig.
          </p>
        </div>

        <form onSubmit={handleCreate} className="space-y-8 relative">
          {/* Loader Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
                <p className="text-white mt-2">Creating gig...</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images (Multiple)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={loading}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition duration-150 ease-in-out disabled:opacity-50"
              />
              {errors.images && (
                <p className="text-red-500 text-xs mt-1">{errors.images}</p>
              )}
              <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md transition duration-200 ease-in-out transform group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      disabled={loading}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition duration-150 ease-in-out disabled:opacity-50"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gig Name
              </label>
              <input
                type="text"
                value={storeSettings.productName}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    productName: e.target.value,
                  })
                }
                disabled={loading}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition duration-150 ease-in-out disabled:opacity-50"
              />
              {errors.productName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.productName}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={storeSettings.category}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    category: e.target.value,
                  })
                }
                disabled={loading}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition duration-150 ease-in-out disabled:opacity-50"
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            {/* YouTube Video Link */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube Video Link
              </label>
              <input
                type="url"
                value={storeSettings.youtubeLink}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    youtubeLink: e.target.value,
                  })
                }
                disabled={loading}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition duration-150 ease-in-out disabled:opacity-50"
              />
              {errors.youtubeLink && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.youtubeLink}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={storeSettings.description}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    description: e.target.value,
                  })
                }
                disabled={loading}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition duration-150 ease-in-out disabled:opacity-50"
                rows="4"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Packages Offered */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Packages Offered
              </label>
              <div className="space-y-4">
                {storeSettings.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <span className="w-1/4 text-gray-800 font-semibold">
                      {pkg.name}
                    </span>
                    <input
                      type="number"
                      placeholder="Price"
                      value={pkg.price}
                      onChange={(e) =>
                        handlePackageChange(index, "price", e.target.value)
                      }
                      disabled={loading}
                      className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition duration-150 ease-in-out disabled:opacity-50"
                    />
                    <input
                      type="text"
                      placeholder="Services (e.g., 'Logo design, 2 revisions')"
                      value={pkg.services}
                      onChange={(e) =>
                        handlePackageChange(index, "services", e.target.value)
                      }
                      disabled={loading}
                      className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition duration-150 ease-in-out disabled:opacity-50"
                    />
                  </div>
                ))}
              </div>
              {errors.packages && (
                <p className="text-red-500 text-xs mt-2">{errors.packages}</p>
              )}
            </div>

            {/* Keywords */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={storeSettings.keywords}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    keywords: e.target.value,
                  })
                }
                disabled={loading}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition duration-150 ease-in-out disabled:opacity-50"
                placeholder="e.g., design, tech, marketing"
              />
              {errors.keywords && (
                <p className="text-red-500 text-xs mt-1">{errors.keywords}</p>
              )}
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <p className="text-red-500 text-sm mt-2">{errors.submit}</p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-md transition duration-150 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create New Gig"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateGigForm;
