import React from "react";
import { formatPrice } from "../common/Format";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
export const OrderHistory = () => {
  const { items } = useSelector((store) => store.cart);
  const [selectedItem, setSelectedItem] = React.useState(
    items[items.length - 1]
  );
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
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
        {items.length === 0 ? (
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
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Items in Bag
                </h2>
                <div
                  className={`${
                    items.length > 6 ? "max-h-96 overflow-y-auto" : ""
                  }`}
                >
                  {items?.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded cursor-pointer transition mb-2 d-flex flex justify-between items-center ${
                        selectedItem.id === item.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <div onClick={() => setSelectedItem(item)}>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm">{formatPrice(item.price)}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="cursor-pointer w-8 h-8 text-white rounded-full bg-red-500 flex items-center justify-center"
                        >
                          <span>−</span>
                        </button>
                        <button className=" cursor-pointer w-8 h-8 text-white rounded-full bg-blue-500 flex items-center justify-center">
                          <span>♡</span>
                        </button>
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
                    <span>{formatPrice(total)}</span>
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
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Item Details
                </h2>
                <img
                  src={selectedItem?.image}
                  alt={selectedItem?.name}
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedItem?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedItem?.title}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedItem?.description}
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {formatPrice(selectedItem?.price)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
