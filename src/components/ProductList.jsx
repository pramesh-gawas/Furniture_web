import React from "react";
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

  const formatPrice = (price) => {
    const priceNumber = parseFloat(price.replace(/[$,]/g, ""));
    return `₹${priceNumber.toLocaleString("en-IN")}`;
  };
  return (
    <div className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12">Our Furniture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {furniture.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-400">
                    {formatPrice(item.price)}
                  </span>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
