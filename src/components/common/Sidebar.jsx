import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { filterByCategory, sortByPrice } from "../../store/productSlice";

export const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const categoryFromUrl = searchParams.get("category") || "all";
  useEffect(() => {
    dispatch(filterByCategory(categoryFromUrl));
  }, [categoryFromUrl, dispatch]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("");
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSearchParams(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const handleApply = () => {
    dispatch(filterByCategory(selectedCategory));
    dispatch(sortByPrice(selectedSort));
    setIsOpen(false);
  };

  const handleFilter = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Mobile Filter Button */}
      <button
        className={`lg:hidden fixed top-20 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded ${
          !isOpen ? "z-50" : "z-50"
        } shadow-lg`}
        onClick={() => handleFilter()}
      >
        Filters
      </button>

      {/* Sidebar */}
      <div
        className={`lg:w-1/4 bg-gray-800 text-white p-4 ${
          isOpen ? "block" : "hidden"
        } lg:block fixed lg:relative top-0 left-0 w-full lg:w-auto h-full lg:h-auto ${
          isOpen ? "z-50" : "z-40"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Category</h3>
          <select
            onChange={handleCategoryChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            value={selectedCategory}
          >
            <option value="all">All</option>
            <option value="living">Living</option>
            <option value="office">Office</option>
            <option value="bedroom">Bedroom</option>
          </select>
        </div>

        {/* Price Sort */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Sort by Price</h3>
          <select
            onChange={handleSortChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            value={selectedSort}
          >
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
        <div className="apply">
          <button
            onClick={handleApply}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};
