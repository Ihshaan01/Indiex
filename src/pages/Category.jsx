import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import apiClient from "../middleware/apiMiddleware";

export default function Category() {
  const { categoryName: type, subCategoryName: category } = useParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(type);
  const [selectedCategory, setSelectedCategory] = useState(category);

  // Filter, sort, and pagination states
  const [priceFilter, setPriceFilter] = useState("Price");
  const [ratingFilter, setRatingFilter] = useState("Rating");
  const [sortBy, setSortBy] = useState("Relevance");
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = useMemo(
    () => [
      {
        name: "Assets",
        subCategories: [
          { name: "3D Animation" },
          { name: "3D Models" },
          { name: "2D Animation" },
          { name: "2D Models" },
          { name: "Music" },
          { name: "Sound FX" },
          { name: "Particles" },
          { name: "Shaders" },
        ],
      },
      {
        name: "Gigs",
        subCategories: [
          { name: "Graphics & Design" },
          { name: "Programming & Tech" },
          { name: "Digital Marketing" },
          { name: "Music & Audio" },
          { name: "Video & Animation" },
          { name: "Writing & Translation" },
          { name: "Photography" },
          { name: "Consulting" },
        ],
      },
      {
        name: "Games",
        subCategories: [
          { name: "Action" },
          { name: "Fighting" },
          { name: "Platformer" },
          { name: "Puzzle" },
          { name: "Simulation video game" },
          { name: "Sports" },
          { name: "Survival horror" },
          { name: "First-person shooter" },
          { name: "Role-playing video game" },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let endpoint = `/users/categories/${type}`;
        if (category) endpoint += `/${category}`;

        const params = {
          price: priceFilter !== "Price" ? priceFilter : undefined,
          rating: ratingFilter !== "Rating" ? ratingFilter : undefined,
          sort: sortBy !== "Relevance" ? sortBy : undefined,
          page: currentPage,
          limit: resultsPerPage,
        };

        const response = await apiClient.get(endpoint, { params });
        const items = response.data.items.map((item) => ({
          images: item.images,
          name: item.productName,
          storeName: item.store.name,
          ratingAverage: item?.ratingAverage || 0,
          totalRating: item?.totalRating || 0,
          discount: item?.discount || 0,
          price: item?.price,
          type: item?.type,
          id: item._id,
          packages: item?.packages,
        }));
        setCards(items);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        setError("Failed to fetch items. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    setSelectedType(type);
    setSelectedCategory(category || null);
    window.scrollTo(0, 0);
  }, [
    type,
    category,
    priceFilter,
    ratingFilter,
    sortBy,
    resultsPerPage,
    currentPage,
  ]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Critical loading state with a spinner
  if (loading && cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Loading items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div>
      <Header />
      <HeroBanner type="short" />

      <div className="container mx-auto my-10 text-gray-300">
        <div className="grid md:grid-cols-[20%_80%] md:mx-10 gap-5">
          {/* Sidebar */}
          <div className="p-4 rounded">
            <ul>
              {selectedType && (
                <li className="mb-4 cursor-pointer">
                  <div className="font-semibold text-xl mb-4">
                    {selectedType}
                  </div>
                  <ul>
                    {categories
                      .find((cat) => cat.name === selectedType)
                      ?.subCategories.map((subCategory, subIndex) => (
                        <Link
                          to={`/Category/${selectedType}/${subCategory.name}`}
                          key={subIndex}
                        >
                          <li
                            className={`text-sm font-medium p-1 cursor-pointer transition duration-300 ${
                              selectedCategory === subCategory.name
                                ? "bg-gray-500"
                                : "hover:bg-gray-600"
                            }`}
                          >
                            {subCategory.name}
                          </li>
                        </Link>
                      ))}
                  </ul>
                </li>
              )}
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex flex-col px-3">
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-white">
                {selectedCategory
                  ? `${selectedCategory} in ${selectedType}`
                  : selectedType}
              </h1>
            </div>

            {/* Filters and Sorting */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5">
              <div className="flex flex-col w-full">
                <label className="mb-2 text-base md:text-lg">Filters</label>
                <div className="flex flex-col xs:flex-row gap-2 w-full">
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full xs:w-1/2 bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  >
                    <option value="Price">Price</option>
                    <option value="Free">Free</option>
                    <option value="Under £10">Under £10</option>
                    <option value="Under £20">Under £20</option>
                    <option value="Under £50">Under £50</option>
                  </select>
                  <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="w-full xs:w-1/2 bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  >
                    <option value="Rating">Rating</option>
                    <option value="1 Star">1 Star</option>
                    <option value="2 Star">2 Star</option>
                    <option value="3 Star">3 Star</option>
                    <option value="4 Star">4 Star</option>
                    <option value="5 Star">5 Star</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col xs:flex-row gap-2 w-full md:w-auto">
                <div className="flex flex-col w-full xs:w-1/2">
                  <label className="mb-2 text-base md:text-lg">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  >
                    <option value="Relevance">Relevance</option>
                    <option value="Price: Low to High">
                      Price: Low to High
                    </option>
                    <option value="Price: High to Low">
                      Price: High to Low
                    </option>
                  </select>
                </div>
                <div className="flex flex-col w-full xs:w-1/2">
                  <label className="mb-2 text-base md:text-lg">Results</label>
                  <select
                    value={resultsPerPage}
                    onChange={(e) => {
                      setResultsPerPage(parseInt(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Card Grid */}
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4 self-center w-11/12">
              {loading ? (
                <SkeletonCardGrid count={resultsPerPage} />
              ) : cards.length > 0 ? (
                cards.map((card, index) => (
                  <Link
                    key={index}
                    to={`/DetailPage/${card.id}`}
                    state={card.type}
                  >
                    <Card item={card} />
                  </Link>
                ))
              ) : (
                <p className="col-span-4 text-center text-gray-400">
                  No items found in this category.
                </p>
              )}
            </div>

            {/* Pagination */}
            {!loading && cards.length > 0 && (
              <div className="flex justify-center items-center mt-5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`border rounded px-3 py-1 mx-1 text-gray-300 ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-700"
                  }`}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(
                    Math.max(0, currentPage - 3),
                    Math.min(totalPages, currentPage + 2)
                  )
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`border rounded px-3 py-1 mx-1 ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "text-gray-300 hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`border rounded px-3 py-1 mx-1 text-gray-300 ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-700"
                  }`}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Skeleton Card Grid Component
function SkeletonCardGrid({ count }) {
  return (
    <>
      {Array(Math.min(count, 4))
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 h-64 rounded-lg animate-pulse"
          >
            <div className="h-40 bg-gray-700 rounded-t-lg"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
    </>
  );
}
