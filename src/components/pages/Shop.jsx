import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../common/Format";
import { Pagination } from "../common/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { toggleWishList } from "../../store/wishlistSlice";
export const Shop = () => {
  const { items } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };
  const handleBuy = (item) => {
    dispatch(addItem(item));
    Navigate(`/product/${item.id}`);
  };
  const handleAddToWishList = (item) => {
    dispatch(toggleWishList(item));
  };
  return (
    <div className="px-6 py-32 lg:px-8 bg-gray-900">
      <Pagination />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {items?.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition block"
          >
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover bg-gray-200"
              />{" "}
            </Link>

            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <div className="relative group">
                  <button
                    onClick={() => handleAddToWishList(item)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-900 py-1 px-2 rounded-lg font-medium transition"
                  >
                    ♡
                  </button>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                    Add to wishlist
                  </span>
                </div>
              </div>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {formatPrice(item.price)}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleBuy(item)}
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
};
