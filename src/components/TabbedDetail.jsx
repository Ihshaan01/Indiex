import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const TabbedDetails = () => {
  const [activeTab, setActiveTab] = useState("OverView");
  const [openedSection, setOpenedSection] = useState("Description");

  const toggleOpenedSection = (section) => {
    setOpenedSection((prev) => (prev === section ? null : section));
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["OverView", "Package Contents", "Publisher Info", "Reviews"].map(
          (tab) => (
            <button
              key={tab}
              className={`flex-1 text-center py-2 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Content Sections */}
      {activeTab === "OverView" && (
        <div className="space-y-6 mt-4">
          {/* Description */}
          <div>
            <button
              onClick={() => toggleOpenedSection("Description")}
              className="w-full text-left text-lg font-bold border-b border-gray-200 py-2 flex items-center justify-between"
            >
              Description
              {openedSection === "Description" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </button>
            {openedSection === "Description" && (
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore.
              </p>
            )}
          </div>

          {/* Technical Details */}
          <div>
            <button
              onClick={() => toggleOpenedSection("TechnicalDetails")}
              className="w-full text-left text-lg font-bold border-b border-gray-200 py-2 flex items-center justify-between"
            >
              Technical Details
              {openedSection === "TechnicalDetails" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </button>
            {openedSection === "TechnicalDetails" && (
              <p className="mt-2 text-gray-600">Add technical details here.</p>
            )}
          </div>

          {/* Keywords */}
          <div>
            <button
              onClick={() => toggleOpenedSection("KeyWords")}
              className="w-full text-left text-lg font-bold border-b border-gray-200 py-2 flex items-center justify-between"
            >
              Key Words
              {openedSection === "KeyWords" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </button>
            {openedSection === "KeyWords" && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Array(10)
                  .fill("Reference Words")
                  .map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default TabbedDetails;
