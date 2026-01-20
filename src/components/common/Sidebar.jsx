import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../utils/useFetch";

export const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isOpen, setIsOpen] = useState(false);
  const categoryFromUrl = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedSort, setSelectedSort] = useState("");
  const { data: categoryData } = useFetch(`${apiUrl}/shop/categories`);
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const handleApply = () => {
    setSearchParams({ category: selectedCategory, sort: selectedSort });
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
        className={`lg:w-1/4 bg-gray-800 text-white p-7 ${
          !isOpen ? "rounded-full" : ""
        }  ${
          isOpen ? "block" : "hidden"
        } lg:block fixed lg:relative top-0 left-0 w-full lg:w-auto h-full lg:h-auto ${
          isOpen ? "z-50" : "z-40"
        }`}
      >
        <div className="flex justify-between items-center m-4">
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
            {categoryData?.response.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
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
