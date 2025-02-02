import React, { useState } from "react";
import { Dialog, DialogContent } from "./Dialog";

function CreateGigForm({ val, onOpen, onClose }) {
  const [storeSettings, setStoreSettings] = useState({
    images: [], // List of images (array of URLs)
    youtubeLink: "", // YouTube video link
    productName: "", // Product name
    description: "", // Description
    packages: [{ amount: "", services: "" }], // Packages Offered (array of objects)
    keywords: "", // Keywords (comma-separated)
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (storeSettings.images.length === 0)
      newErrors.images = "At least one image is required";
    if (!storeSettings.youtubeLink)
      newErrors.youtubeLink = "YouTube video link is required";
    if (!storeSettings.productName)
      newErrors.productName = "Gig name is required";
    if (!storeSettings.description)
      newErrors.description = "Description is required";
    if (storeSettings.packages.some((pkg) => !pkg.amount || !pkg.services))
      newErrors.packages = "All packages must have an amount and services";
    if (!storeSettings.keywords) newErrors.keywords = "Keywords are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Created new gig with:", storeSettings);
    onClose(); // Close the dialog after submission
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setStoreSettings({ ...storeSettings, images: imageUrls });
  };

  const handlePackageChange = (index, field, value) => {
    const newPackages = [...storeSettings.packages];
    newPackages[index][field] = value;
    setStoreSettings({ ...storeSettings, packages: newPackages });
  };

  const addPackage = () => {
    setStoreSettings({
      ...storeSettings,
      packages: [...storeSettings.packages, { amount: "", services: "" }],
    });
  };

  const removePackage = (index) => {
    const newPackages = storeSettings.packages.filter((_, i) => i !== index);
    setStoreSettings({ ...storeSettings, packages: newPackages });
  };

  return (
    <Dialog open={val} onOpenChange={onOpen} onClose={onClose}>
      <DialogContent>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Create New Gig</h3>
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* List of Images */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                List of Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {storeSettings.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* YouTube Video Link */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.youtubeLink && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.youtubeLink}
                </p>
              )}
            </div>

            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              />
              {errors.productName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productName}
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

            {/* Packages Offered */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Packages Offered
              </label>
              {storeSettings.packages.map((pkg, index) => (
                <div key={index} className="mb-4 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Amount"
                      value={pkg.amount}
                      onChange={(e) =>
                        handlePackageChange(index, "amount", e.target.value)
                      }
                      className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                    />
                    <input
                      type="text"
                      placeholder="Services"
                      value={pkg.services}
                      onChange={(e) =>
                        handlePackageChange(index, "services", e.target.value)
                      }
                      className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                    />
                    <button
                      type="button"
                      onClick={() => removePackage(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addPackage}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Package
              </button>
              {errors.packages && (
                <p className="text-red-500 text-sm mt-1">{errors.packages}</p>
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
              Create New Gig
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateGigForm;
