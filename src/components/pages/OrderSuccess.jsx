import { useParams, Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export const OrderSuccess = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircleIcon className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thank you for your order!
        </h1>
        <div className="bg-gray-50 border border-dashed border-gray-300 p-4 rounded-lg mb-8">
          <span className="text-sm text-gray-500 uppercase tracking-widest block mb-1">
            Order Number
          </span>
          <span className="text-lg font-mono font-bold text-blue-600">
            #{orderId}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
          >
            Continue Shopping
          </Link>
          {/* <Link
            to="/shop"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition"
          >
            Track Order
          </Link> */}
        </div>
      </div>
    </div>
  );
};
