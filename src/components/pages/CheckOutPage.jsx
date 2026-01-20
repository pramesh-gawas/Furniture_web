import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCartServer,
  selectCartSubtotal,
  selectCartTax,
  selectCartTotal,
} from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../common/Format";

export const CheckOutPage = () => {
  const { items } = useSelector((store) => store.cart);
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const total = useSelector(selectCartTotal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user");
    const apiUrl = import.meta.env.VITE_API_URL;
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const shippingAddress = Object.fromEntries(formData.entries());
    const orderData = {
      cartItems: items,
      shippingAddress: shippingAddress,
    };

    try {
      const res = await fetch(`${apiUrl}/shop/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (res.ok) {
        formElement.reset();
        navigate(`/order-success/${result?.orderId}`);
        dispatch(clearCartServer());
      } else {
        console.error("Order failed:", result.message);
      }
    } catch (err) {
      console.error("Network error:", err.message);
    }
  };

  return (
    <div className="min-h-screen py-22 px-4 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b border-gray-200"
                >
                  <span className="text-gray-700">{item?.product?.name}</span>
                  <span className="text-gray-900 font-semibold">
                    ${(item?.product?.price * item?.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-2 text-gray-700">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal.toFixed(2))}</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-700">
                  <span>Tax (10%):</span>
                  <span>{formatPrice(tax.toFixed(2))}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 bg-gray-100 p-3 rounded">
                  <span>Total:</span>
                  <span>{formatPrice(total.toFixed(2))}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form className="lg:col-span-2" onSubmit={handlePlaceOrder}>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={handleInputChange}
                  className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Payment Information
                </h2>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
