import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartServer } from "../../store/cartSlice";

export const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const paymentIntent = searchParams.get("payment_intent");

  useEffect(() => {
    if (paymentIntent) {
      dispatch(clearCartServer());
    }
  }, [paymentIntent, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="text-green-500 text-6xl mb-4">✔</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment was processed successfully.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
