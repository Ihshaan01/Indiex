import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
const StarRating = ({ rating, editable = false, ratingChanged }) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Determine if there’s a half star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining stars

  const [currentRating, setCurrentRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setCurrentRating(newRating);
    if (ratingChanged) {
      ratingChanged(newRating); // Callback function to return the selected rating
    }
  };
  return (
    <>
      {editable ? (
        <div className="flex items-center">
          {Array(5)
            .fill(0)
            .map((_, index) => {
              const starValue = index + 1;
              return (
                <span
                  key={`star-${index}`}
                  onClick={() => handleRatingChange(starValue)}
                  onMouseEnter={() => setCurrentRating(starValue)}
                  className="cursor-pointer"
                >
                  {starValue <= currentRating ? (
                    <FaStar className="text-yellow-500 mr-1" />
                  ) : (
                    <FaRegStar className="text-gray-400 mr-1" />
                  )}
                </span>
              );
            })}
        </div>
      ) : (
        <div className="flex items-center">
          {/* Render full stars */}
          {Array(fullStars)
            .fill(0)
            .map((_, index) => (
              <FaStar key={`full-${index}`} className="text-yellow-500 mr-1" />
            ))}

          {/* Render half star if applicable */}
          {hasHalfStar && <FaStarHalfAlt className="text-yellow-500 mr-1" />}

          {/* Render empty stars */}
          {Array(emptyStars)
            .fill(0)
            .map((_, index) => (
              <FaRegStar
                key={`empty-${index}`}
                className="text-gray-400 mr-1"
              />
            ))}
        </div>
      )}
    </>
  );
};

export default StarRating;
