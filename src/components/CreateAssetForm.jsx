import React, { useState } from "react";
import { Dialog, DialogContent } from "./Dialog";

function CreateAssetForm({ val, onOpen, onClose }) {
  const [storeSettings, setStoreSettings] = useState({
    image: "",
    youtubeLink: "",
    productName: "",
    price: "",
    discount: "",
    fileSize: "",
    latestVersion: "",
    description: "",
    keywords: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!storeSettings.image) newErrors.image = "Image URL is required";
    if (!storeSettings.productName)
      newErrors.productName = "Product Name is required";
    if (!storeSettings.price) newErrors.price = "Price is required";
    if (!storeSettings.fileSize) newErrors.fileSize = "File Size is required";
    if (!storeSettings.latestVersion)
      newErrors.latestVersion = "Latest Version is required";
    if (!storeSettings.description)
      newErrors.description = "Description is required";
    if (!storeSettings.keywords) newErrors.keywords = "Keywords are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Created new asset with:", storeSettings);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={val} onOpenChange={onOpen} onClose={onClose}>
      <DialogContent>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Create New Asset</h3>
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Asset Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Asset Image URL
              </label>
              <input
                type="url"
                value={storeSettings.image}
                onChange={(e) =>
                  setStoreSettings({ ...storeSettings, image: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>
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
                    youtuyoutubeLinkbe: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500
focus:border-blue-500 bg-white text-gray-800"
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
                  setStoreSettings({ ...storeSettings, price: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            {/* Discount in percentage */}
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
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
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
              Create New Asset
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAssetForm;
