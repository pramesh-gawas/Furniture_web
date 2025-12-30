import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "./common/Format";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { useSelector } from "react-redux";
import { toggleWishList } from "../store/wishlistSlice";
import { Link } from "react-router-dom";

export const ProductList = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.product);
  const wishlist = useSelector((store) => store.wishlist);
  const handleBuy = (item) => {
    Navigate(`/product/${item.id}`);
  };

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };
  const handleAddToWishList = (item) => {
    dispatch(toggleWishList(item));
  };

  return (
    <div className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12">Our Furniture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items?.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition block "
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <div className="relative group">
                    <button
                      onClick={() => handleAddToWishList(item)}
                      className={`h-8 w-8 bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded-full font-medium transition ${
                        wishlist.items.some(
                          (wishItem) => wishItem.id === item.id
                        )
                          ? "text-red-500"
                          : "text-gray-900"
                      }`}
                    >
                      {wishlist.items.some(
                        (wishItem) => wishItem.id === item.id
                      )
                        ? "♥"
                        : "♡"}
                    </button>
                    <span className="absolute bottom-full left-1/15 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                      Add to wishlist
                    </span>
                  </div>
                </div>
                <p className="text-xl font-bold text-indigo-400">
                  {formatPrice(item.price)}
                </p>
                <div className="flex gap-1 mt-4">
                  <button
                    onClick={() => handleBuy(item)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition text-sm"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition text-sm"
                  >
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
