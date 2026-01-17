import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatPrice } from "../common/Format";
import { addToWishlistServer } from "../../store/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCartServer } from "../../store/cartSlice";
import Toaster from "../common/Toaster";
export const ProductDetail = () => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const { items, error } = useSelector((store) => store.product);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = items.find((p) => p._id === id);

  useEffect(() => {
    if (error) {
      const msg =
        typeof error === "string"
          ? error
          : error.message || "Something went wrong";
      setToast({ show: true, message: msg, type: "danger" });
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(
        () => setToast((prev) => ({ ...prev, show: false })),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  if (!product) {
    return (
      <div className="px-6 py-32 lg:px-8 bg-gray-900 text-white">
        Product not found
      </div>
    );
  }

  const handleToggle = (item) => {
    if (!user) {
      navigate("/signin");
      return;
    }
    dispatch(addToWishlistServer(item));
  };

  const handleAddToCart = (item) => {
    if (!user) {
      navigate("/signin");
      return;
    }
    dispatch(addToCartServer(item));
    setToast({
      show: true,
      message: `${item.name} added to cart`,
      type: "success",
    });
  };
  const handlePayment = (item) => {
    if (!user) {
      navigate("/signin");
      return;
    }
    dispatch(addToCartServer(item));
    navigate("/checkout");
  };

  return (
    <>
      <div className="px-6 py-32 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl font-semibold text-blue-400 mb-4">
                {formatPrice(product.price)}
              </p>
              <p className="text-gray-300 mb-6">{product.category}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleToggle(product)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition"
                >
                  ♡ Add to Wishlist
                </button>
                <button
                  onClick={() => handlePayment(product)}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <Toaster
          visible={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      }
    </>
  );
};
