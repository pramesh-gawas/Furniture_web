import React, { useEffect, useState } from "react";
import { formatPrice } from "../common/Format";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantityServer,
  removeFromCartServer,
  selectCartSubtotal,
  selectCartTax,
  selectCartTotal,
  clearCartServer,
} from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import Toaster from "../common/Toaster";
import { Spinner } from "../common/Spinner";
export const OrderHistory = () => {
  const { items, loading, error } = useSelector((store) => store.cart);
  const [selectedItem, setSelectedItem] = useState(null);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const total = useSelector(selectCartTotal);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

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
    if (items?.length > 0) {
      if (!selectedItem) {
        setSelectedItem(items[items.length - 1]?.product);
      } else {
        const match = items.find((i) => i.product?._id === selectedItem?._id);
        if (match) setSelectedItem(match.product);
        else {
          setSelectedItem(items[0]?.product);
        }
      }
    } else {
      setSelectedItem(null);
    }
  }, [items]);

  if (loading && items.length === 0) return <Spinner />;

  const handleInc = (item) => {
    const obj = {
      productId: item?.product?._id,
      quantity: item.quantity + 1,
    };
    dispatch(updateQuantityServer(obj));
  };

  const handleDec = (item) => {
    if (item.quantity > 1) {
      const obj = {
        productId: item?.product?._id,
        quantity: item.quantity - 1,
      };
      dispatch(updateQuantityServer(obj));
    }
  };

  const handlePayment = () => {
    Navigate("/checkout");
  };
  return (
    <div className="min-h-screen py-32 px-4 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 dark:text-white">
          My Cart
        </h1>
        {items?.length === 0 ? (
          <>
            {" "}
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              Your Cart is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-500">
              Start adding items to your Cart!
            </p>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex space-x-7 ">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Items in Bag
                  </h2>
                  <button
                    onClick={() => dispatch(clearCartServer())}
                    className="bg-blue-500 p-2 rounded-lg text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                  >
                    Clear Cart
                  </button>
                </div>
                <div
                  className={`${
                    items.length > 6 ? "max-h-96 overflow-y-auto" : ""
                  }`}
                >
                  {items?.map((item, index) => (
                    <div
                      onClick={() => setSelectedItem(item?.product)}
                      key={index}
                      className={`p-3 rounded transition mb-2 d-flex flex justify-between items-center ${
                        selectedItem?._id === item?.product?._id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">
                          {item?.product?.name}
                        </div>
                        <div className="text-sm">
                          {formatPrice(item?.product?.price)}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() =>
                            dispatch(removeFromCartServer(item?.product?._id))
                          }
                          className=" cursor-pointer w-8 h-8 text-white rounded-full bg-red-500 flex items-center justify-center"
                        >
                          <span>−</span>
                        </button>

                        <div className="d-flex p-2">
                          <p className="font-bold">Q</p>
                        </div>
                        <div>
                          <button
                            onClick={() => handleInc(item)}
                            className="mb-1 cursor-pointer w-6 h-6 text-white rounded-full bg-green-500 flex items-center justify-center "
                          >
                            +
                          </button>
                          <p className="bg-white text-black rounded-full flex items-center justify-center">
                            {item.quantity}
                          </p>
                          <button
                            onClick={() => handleDec(item)}
                            className=" mt-1 cursor-pointer w-6 h-6 text-white rounded-full bg-red-500 flex items-center justify-center"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between mb-4 text-gray-700 dark:text-gray-300">
                    <span>Tax (10%):</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 p-3 rounded">
                    <span>Total:</span>
                    <span>{total || "0"}</span>
                  </div>
                  <button
                    onClick={() => handlePayment()}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
            {/* Item Details */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                {selectedItem ? (
                  <>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      Item Details
                    </h2>
                    {selectedItem.images && selectedItem.images.length > 0 ? (
                      <img
                        src={selectedItem.images[0]}
                        alt={selectedItem.name}
                        className="w-full h-64 object-cover rounded mb-4"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded mb-4">
                        No Image Available
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedItem.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {selectedItem.description}
                    </p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {formatPrice(selectedItem.price)}
                    </p>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Select an item to see details
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {
          <Toaster
            visible={toast.show}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        }
      </div>
    </div>
  );
};
