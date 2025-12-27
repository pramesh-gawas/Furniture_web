import React from "react";
import { useParams } from "react-router-dom";
import { formatPrice } from "../common/Format";

export const ProductDetail = () => {
  const { id } = useParams();
  const products = [
    {
      id: 1,
      name: "Wooden Chair",
      price: "$199",
      image: "images/chair.jpg",
      description: "A comfortable wooden chair perfect for your dining room.",
    },
    {
      id: 2,
      name: "Leather Sofa",
      price: "899",
      image: "images/bedroom-min.jpg",
      description: "Luxurious leather sofa for your living room.",
    },
    {
      id: 3,
      name: "Glass Table",
      price: "299",
      image: "images/bedroom_furniture.png",
      description: "Elegant glass table that adds style to any space.",
    },
    {
      id: 4,
      name: "Bed Frame",
      price: "599",
      image: "images/bedroom_furniture_2.png",
      description: "Sturdy bed frame for a good night's sleep.",
    },
  ];

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="px-6 py-32 lg:px-8 bg-gray-900 text-white">
        Product not found
      </div>
    );
  }

  return (
    <div className="px-6 py-32 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl font-semibold text-blue-400 mb-4">
              {formatPrice(product.price)}
            </p>
            <p className="text-gray-300 mb-6">{product.description}</p>
            <div className="flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition">
                Add to Cart
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition">
                ♡ Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
