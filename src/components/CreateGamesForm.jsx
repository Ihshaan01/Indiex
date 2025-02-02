import React, { useState } from "react";
import { Dialog, DialogContent } from "./Dialog";

function CreateGamesForm({ val, onOpen, onClose }) {
  const [storeSettings, setStoreSettings] = useState({
    images: [],
    youtubeLink: "",
    productName: "",
    fileSize: "",
    latestVersion: "",
    price: "",
    discount: "",
    description: "",
    technicalDetail: "",
    keywords: "",
    packageContent: "",
    earlyAccess: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (storeSettings.images.length === 0)
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
    if (!storeSettings.packageContent)
      newErrors.packageContent = "Package Content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Created new game with:", storeSettings);
    onClose(); // Close the dialog after submission
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Game Images (comma separated URLs)
              </label>
              <input
                type="text"
                value={storeSettings.images.join(", ")}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    images: e.target.value.split(", "),
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}
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
                className="w-full p-2 border rounded-lg"
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

            {/* Package Content */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Content
              </label>
              <textarea
                value={storeSettings.packageContent}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    packageContent: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                rows="4"
              />
              {errors.packageContent && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.packageContent}
                </p>
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
