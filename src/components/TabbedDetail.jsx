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
            <div
              className={`overflow-hidden transition-all duration-500 ${
                openedSection === "Description"
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore.
              </p>
            </div>
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
            <div
              className={`overflow-hidden transition-all duration-500 ${
                openedSection === "TechnicalDetails"
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="mt-2 text-gray-600">Add technical details here.</p>
            </div>
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
            <div
              className={`overflow-hidden transition-all duration-500 ${
                openedSection === "KeyWords"
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
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
            </div>
          </div>
        </div>
      )}

      {activeTab === "Package Contents" && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Package Contents</h2>
          <ul className="list-disc pl-5 mt-4 text-gray-600">
            <li>1x Item 1</li>
            <li>1x Item 2</li>
            <li>1x Item 3</li>
            <li>1x Item 4</li>
          </ul>
        </div>
      )}

      {activeTab === "Publisher Info" && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Publisher Info</h2>
          <p className="mt-4 text-gray-600">Publisher: Awesome Games Ltd.</p>
          <p className="mt-2 text-gray-600">Founded: 2010</p>
          <p className="mt-2 text-gray-600">Contact: info@awesomegames.com</p>
        </div>
      )}

      {activeTab === "Reviews" && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Reviews</h2>
          <div className="mt-4 space-y-4">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border p-4 rounded-md">
                <p className="font-semibold">User {review}</p>
                <p className="text-gray-600 mt-2">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua."
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabbedDetails;
