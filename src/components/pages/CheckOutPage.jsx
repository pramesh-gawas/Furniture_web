import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./../CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const CheckOutPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { items } = useSelector((store) => store.cart);
  const userEmail = useSelector((state) => state?.auth?.user?.email);
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/shop/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: Math.round(total * 100),
              email: userEmail,
            }),
          },
        );

        if (!response.ok) throw new Error("Failed to fetch intent");

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Payment Intent Error:", err);
      }
    };

    if (total > 0) fetchPaymentIntent();
  }, [total]);

  const appearance = { theme: "stripe" };
  const loader = "auto";

  return (
    <div className="min-h-screen py-22 px-4 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Checkout
        </h1>

        {clientSecret ? (
          <Elements
            options={{ clientSecret, appearance, loader }}
            stripe={stripePromise}
          >
            <CheckoutForm items={items} total={total} />
          </Elements>
        ) : (
          <div className="text-white text-center">
            Loading Payment Gateway...
          </div>
        )}
      </div>
    </div>
  );
};
