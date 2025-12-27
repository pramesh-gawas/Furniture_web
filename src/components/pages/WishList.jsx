import React from "react";
 /import { formatPrice } from "../common/Format";

export const WishList = () => {
  const [wishlistItems, setWishlistItems] = React.useState([
    {
      id: 1,
      title: "Minimalist Living Room",
      description: "Discover our new Scandinavian collection for 2025.",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1920",
      price: 400,
    },
    {
      id: 2,
      title: "Modern Office Spaces",
      description: "Ergonomic designs to boost your home productivity.",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1920",
      price: 500,
    },
    {
      id: 3,
      title: "Sustainable Bedroom",
      description: "Ethically sourced oak and linen for a better sleep.",
      image:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1920",
      price: 700,
    },
    {
      id: 4,
      title: "Sustainable Bedroom",
      description: "Ethically sourced oak and linen for a better sleep.",
      image:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1920",
      price: 700,
    },
    {
      id: 1,
      title: "Minimalist Living Room",
      description: "Discover our new Scandinavian collection for 2025.",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1920",
      price: 400,
    },
    {
      id: 2,
      title: "Modern Office Spaces",
      description: "Ergonomic designs to boost your home productivity.",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1920",
      price: 500,
    },
    {
      id: 3,
      title: "Sustainable Bedroom",
      description: "Ethically sourced oak and linen for a better sleep.",
      image:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1920",
      price: 700,
    },
    {
      id: 4,
      title: "Sustainable Bedroom",
      description: "Ethically sourced oak and linen for a better sleep.",
      image:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1920",
      price: 700,
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const addToCart = (item) => {
    // Placeholder for add to cart functionality
    alert(`${item.title} added to cart!`);
  };

  return (
    <div className="min-h-screen py-32 px-4 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 dark:text-white">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-500">
              Start adding items you love to your wishlist!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-36 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {item.description}
                  </p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-10 h-10 text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 rounded-lg flex items-center justify-center transition duration-300"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
