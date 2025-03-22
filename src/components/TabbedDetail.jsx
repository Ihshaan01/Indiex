import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import StarRating from "./StarRating"; // Adjust the import path based on your structure

const TabbedDetails = ({
  description,
  keywords,
  store,
  reviews,
  setReviews,
  handleSubmitReview,
  newRating,
  setNewRating,
  newComment,
  setNewComment,
  user,
  itemId,
  itemType,
}) => {
  const [activeTab, setActiveTab] = useState("OverView");
  const [openedSection, setOpenedSection] = useState("Description");

  const toggleOpenedSection = (section) => {
    setOpenedSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["OverView", "Publisher Info", "Reviews"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 text-center py-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === "OverView" && (
        <div className="space-y-6 mt-4 text-white">
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
              <p className="mt-2 text-gray-300">{description}</p>
            </div>
          </div>

          {/* Technical Details */}
          {/* <div>
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
              <p className="mt-2 text-gray-300">Add technical details here.</p>
            </div>
          </div> */}

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
                {keywords.map((keyword, index) => (
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

      {activeTab === "Publisher Info" && (
        <div className="mt-4">
          <h2 className="text-xl font-bold text-white">Publisher Info</h2>
          <p className="mt-4 text-gray-300">
            Publisher: {store?.name || "Unknown Store"}
          </p>
          <p className="mt-2 text-gray-300">Founded: 2010</p>{" "}
          {/* Update with real data if available */}
          <p className="mt-2 text-gray-300">
            Contact: info@awesomegames.com
          </p>{" "}
          {/* Update with real data if available */}
        </div>
      )}

      {activeTab === "Reviews" && (
        <div className="mt-4">
          <h2 className="text-xl font-bold text-white">Reviews</h2>
          <div className="mt-4 space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="border p-4 rounded-md bg-gray-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.user?.profilePic} // Fallback if profilePic is missing
                      alt="user"
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
                    />
                    <div>
                      <p className="text-gray-200 font-medium">
                        {review.user.username}
                      </p>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <p className="text-gray-300 mt-2">
                    {review.comment || "No comment provided."}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                No reviews yet. Be the first to review!
              </p>
            )}

            {/* Review Submission Form */}
            <form onSubmit={handleSubmitReview} className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-2">
                Write a Review
              </h4>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-300">Rating:</span>
                <StarRating
                  rating={newRating}
                  editable={true}
                  ratingChanged={(rating) => setNewRating(rating)}
                />
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your review here..."
                className="w-full p-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
              <button
                type="submit"
                className="mt-4 w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabbedDetails;
