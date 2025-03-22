// components/StoreSettingsForm.js
import React, { useState } from "react";

const StoreSettingsForm = ({ store, onSubmit, loading }) => {
  const [storeSettings, setStoreSettings] = useState(store);
  const [storePreview, setStorePreview] = useState(store?.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(storeSettings);
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Store Image */}
          <div>
            <label className="text-gray-400">Store Image</label>
            {storePreview && (
              <img
                src={storePreview}
                alt="Store Preview"
                className="mt-4 w-24 h-24 rounded-lg object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setStoreSettings((prev) => ({
                      ...prev,
                      image: file,
                    }));
                  };
                  reader.readAsDataURL(file);
                  setStorePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full p-2 bg-gray-600 rounded-lg mt-2"
              required
            />
          </div>

          {/* Store Name */}
          <div>
            <label className="text-gray-400">Store Name</label>
            <input
              type="text"
              value={storeSettings?.name || ""}
              onChange={(e) =>
                setStoreSettings((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full p-2 bg-gray-600 rounded-lg mt-2"
              placeholder="Enter store name"
              required
            />
          </div>

          {/* Store Description */}
          <div>
            <label className="text-gray-400">Store Description</label>
            <textarea
              value={storeSettings?.description || ""}
              onChange={(e) =>
                setStoreSettings((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full p-2 bg-gray-600 rounded-lg mt-2"
              placeholder="Enter store description"
              rows={4}
              required
            />
          </div>

          {/* Save Button */}
          <div className="mt-6">
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
        </div>
      </form>
    </div>
  );
};

export default StoreSettingsForm;
