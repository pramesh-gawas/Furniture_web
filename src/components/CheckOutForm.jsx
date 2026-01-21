import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import {
  selectCartSubtotal,
  selectCartTax,
  selectCartTotal,
} from "../store/cartSlice";
import { formatPrice } from "./common/Format";

export const CheckoutForm = ({ items, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    email: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success`,
        receipt_email: shippingDetails.email,
        shipping: {
          name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
          address: {
            line1: shippingDetails.address,
            city: shippingDetails.city,
            postal_code: shippingDetails.zipCode,
            country: "IN",
          },
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
    setIsProcessing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {items.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b">
              <span>
                {item?.product?.name} (x{item.quantity})
              </span>
              <span className="font-semibold">
                {formatPrice(item?.product?.price * item.quantity)}
              </span>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Tax (10%):</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold bg-gray-100 p-3 rounded">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>

      <form className="lg:col-span-2" onSubmit={handleSubmit}>
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
              type="text"
              name="address"
              placeholder="Full Address"
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
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Payment Information
            </h2>
            {/* PaymentElement handles the secure UI for card data */}
            <PaymentElement className="mb-6" />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}

          <button
            type="submit"
            disabled={isProcessing || !stripe || !elements}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:bg-gray-400"
          >
            {isProcessing ? "Processing..." : `Pay ${formatPrice(total)}`}
          </button>
        </div>
      </form>
    </div>
  );
};
