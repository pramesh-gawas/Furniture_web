import React, { useEffect } from "react";
import { formatPrice } from "../common/Format";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addItem } from "../../store/cartSlice";
import {
  removeFromWishlistServer,
  toggleWishList,
} from "../../store/wishlistSlice";
import { useFetch } from "../../utils/useFetch";
export const WishList = () => {
  const { items } = useSelector((store) => store.wishlist);
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("user");
  const { data, loading, error } = useFetch(
    `${apiUrl}/shop/wishlist`,
    "GET",
    null,
    token
  );
  useEffect(() => {
    if (data?.response?.products) {
      dispatch(toggleWishList(data.response.products));
    }
  }, [data, dispatch]);
  const removeFromWishlist = (id) => {
    dispatch(removeFromWishlistServer(id));
  };

  const addToCart = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="min-h-screen py-32 px-4 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 dark:text-white">
          My Wishlist
        </h1>
        {!loading && items.length === 0 ? (
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
            {loading ? (
              <div>loading ...</div>
            ) : (
              items?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-36 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.name}
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
                        onClick={() => removeFromWishlist(item._id)}
                        className="w-10 h-10 text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 rounded-lg flex items-center justify-center transition duration-300"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {error && <div className="text-red-500 mt-4">Error: {error}</div>}
      </div>
    </div>
  );
};
