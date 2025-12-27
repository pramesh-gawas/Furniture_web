import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "./common/Format";
export const ProductList = () => {
  const furniture = [
    {
      id: 1,
      name: "Modern Sofa",
      price: "1,299",
      image: "./images/bedroom_furniture.png",
    },
    {
      id: 2,
      name: "Dining Table",
      price: "799",
      image: "./images/bedroom_furniture_2.png",
    },
    {
      id: 3,
      name: "Office Chair",
      price: "449",
      image: "./images/chair.jpg",
    },
    {
      id: 4,
      name: "Bookshelf",
      price: "599",
      image: "./images/bedroom_furniture_3.jpg",
    },
  ];

  return (
    <div className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12">Our Furniture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {furniture.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition block"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <div className="relative group">
                    <a className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg font-medium transition">
                      ♡
                    </a>
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition z-index-1">
                      Add to wishlist
                    </span>
                  </div>
                </div>
                <p className="text-xl font-bold text-indigo-400">
                  {formatPrice(item.price)}
                </p>
                <div className="flex gap-1 mt-4">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition text-sm">
                    Buy
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
