import React, { useState } from "react";
import { Dialog, DialogContent } from "./Dialog";
import apiClient from "../middleware/apiMiddleware";
import useAuthStore from "../store/authStore";

function CreateGamesForm({ val, onOpen, onClose }) {
  const [storeSettings, setStoreSettings] = useState({
    youtubeLink: "",
    productName: "",
    fileSize: "",
    latestVersion: "",
    price: "",
    discount: "",
    description: "",
    technicalDetail: "",
    keywords: "",
    earlyAccess: false,
    category: "",
    platform: "",
    mobileType: "",
    webglDemoZip: null, // Changed from webglDemoLink to webglDemoZip for file upload
  });
  const { store } = useAuthStore();
  const [images, setImages] = useState([]); // Separate state for image files
  const [errors, setErrors] = useState({});

  const categories = [
    "Action",
    "Fighting",
    "Platformer",
    "Puzzle",
    "Simulation video game",
    "Sports",
    "Survival horror",
    "First-person shooter",
    "Role-playing video game",
  ];

  const platforms = ["Mobile", "Desktop", "WebGL"];
  const mobileTypes = ["iOS", "Android", "Both"];

  const validateForm = () => {
    const newErrors = {};
    if (images.length === 0)
      newErrors.images = "At least one image is required";
    if (!storeSettings.productName)
      newErrors.productName = "Product Name is required";
    if (!storeSettings.fileSize) newErrors.fileSize = "File Size is required";
    if (!storeSettings.latestVersion)
      newErrors.latestVersion = "Latest Version is required";
    if (!storeSettings.price) newErrors.price = "Price is required";
    if (!storeSettings.description)
      newErrors.description = "Description is required";
    if (!storeSettings.technicalDetail)
      newErrors.technicalDetail = "Technical Detail is required";
    if (!storeSettings.keywords) newErrors.keywords = "Keywords are required";
    if (!storeSettings.category) newErrors.category = "Category is required";
    if (!storeSettings.platform) newErrors.platform = "Platform is required";
    if (storeSettings.platform === "Mobile" && !storeSettings.mobileType)
      newErrors.mobileType = "Mobile type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("storeId", store._id); // Replace with actual store ID from auth store
    formData.append("type", "Game");
    formData.append("category", storeSettings.category);
    formData.append("youtubeLink", storeSettings.youtubeLink);
    formData.append("productName", storeSettings.productName);
    formData.append("price", storeSettings.price);
    formData.append("discount", storeSettings.discount);
    formData.append("fileSize", storeSettings.fileSize);
    formData.append("latestVersion", storeSettings.latestVersion);
    formData.append("description", storeSettings.description);
    formData.append("technicalDetail", storeSettings.technicalDetail);
    formData.append("keywords", storeSettings.keywords);
    formData.append("earlyAccess", storeSettings.earlyAccess);
    formData.append("platform", storeSettings.platform);
    formData.append("mobileType", storeSettings.mobileType);

    images.forEach((image) => formData.append("images", image));
    if (storeSettings.webglDemoZip) {
      formData.append("webglDemoZip", storeSettings.webglDemoZip);
    }

    try {
      const response = await apiClient.post("/users/create-games", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Game created successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error creating game:", error);
      setErrors({ submit: "Failed to create game. Please try again." });
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

  const handleDemoZipChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStoreSettings({ ...storeSettings, webglDemoZip: file });
    } else {
      setStoreSettings({ ...storeSettings, webglDemoZip: null });
    }
  };

  return (
    <Dialog open={val} onOpenChange={onOpen} onClose={onClose}>
      <DialogContent>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Create New Game</h3>
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Game Images */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Game Images (Multiple)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}
              {/* Image Previews */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube Link
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
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
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
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.productName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productName}
                </p>
              )}
            </div>

            {/* File Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File Size
              </label>
              <input
                type="number"
                min="1"
                value={storeSettings.fileSize}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    fileSize: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.fileSize && (
                <p className="text-red-500 text-sm mt-1">{errors.fileSize}</p>
              )}
            </div>

            {/* Latest Version */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Version
              </label>
              <input
                type="text"
                value={storeSettings.latestVersion}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    latestVersion: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.latestVersion && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.latestVersion}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                min="0"
                value={storeSettings.price}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    price: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={storeSettings.discount}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    discount: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg text-gray-700"
              />
              {errors.discount && (
                <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
              )}
            </div>

            {/* Early Access */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Early Access
              </label>
              <input
                type="checkbox"
                checked={storeSettings.earlyAccess}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    earlyAccess: e.target.checked,
                  })
                }
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform
              </label>
              <select
                value={storeSettings.platform}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    platform: e.target.value,
                    mobileType: "",
                    webglDemoZip: null, // Reset demo ZIP when platform changes
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              >
                <option value="">Select a platform</option>
                {platforms.map((plat) => (
                  <option key={plat} value={plat}>
                    {plat}
                  </option>
                ))}
              </select>
              {errors.platform && (
                <p className="text-red-500 text-sm mt-1">{errors.platform}</p>
              )}
            </div>

            {/* Mobile Type (Conditional) */}
            {storeSettings.platform === "Mobile" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Type
                </label>
                <select
                  value={storeSettings.mobileType}
                  onChange={(e) =>
                    setStoreSettings({
                      ...storeSettings,
                      mobileType: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                >
                  <option value="">Select mobile type</option>
                  {mobileTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.mobileType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobileType}
                  </p>
                )}
              </div>
            )}

            {/* WebGL Demo ZIP File (Conditional) */}
            {storeSettings.platform === "WebGL" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Demo ZIP File (optional)
                </label>
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleDemoZipChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                />
              </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                rows="4"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Technical Detail */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technical Details
              </label>
              <textarea
                value={storeSettings.technicalDetail}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    technicalDetail: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                rows="4"
              />
              {errors.technicalDetail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.technicalDetail}
                </p>
              )}
            </div>

            {/* Keywords */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.keywords && (
                <p className="text-red-500 text-sm mt-1">{errors.keywords}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Game
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateGamesForm;
