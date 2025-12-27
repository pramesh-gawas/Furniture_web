import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../common/Format";
import { Pagination } from "../common/Pagination";
export const Shop = () => {
  const products = [
    { id: 1, name: "Wooden Chair", price: "$199", image: "images/chair.jpg" },
    {
      id: 2,
      name: "Leather Sofa",
      price: "899",
      image: "images/bedroom-min.jpg",
    },
    {
      id: 3,
      name: "Glass Table",
      price: "299",
      image: "images/bedroom_furniture.png",
    },
    {
      id: 4,
      name: "Bed Frame",
      price: "599",
      image: "images/bedroom_furniture_2.png",
    },
    { id: 1, name: "Wooden Chair", price: "$199", image: "images/chair.jpg" },
    {
      id: 2,
      name: "Leather Sofa",
      price: "899",
      image: "images/bedroom-min.jpg",
    },
    {
      id: 3,
      name: "Glass Table",
      price: "299",
      image: "images/bedroom_furniture.png",
    },
    {
      id: 4,
      name: "Bed Frame",
      price: "599",
      image: "images/bedroom_furniture_2.png",
    },
  ];

  return (
    <div className="px-6 py-32 lg:px-8 bg-gray-900">
      <Pagination />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {products?.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition block"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover bg-gray-200"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {formatPrice(product.price)}
              </p>
              <div className="flex gap-2 mt-4">
                <button className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
                  Buy
                </button>
                <div className="relative group w-1/2">
                  <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-medium transition">
                    ♡
                  </button>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                    Add to wishlist
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination />
    </div>
  );
};
