import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "./common/Spinner";
import { Card } from "./common/Card";
import Toaster from "./common/Toaster";

export const ProductList = () => {
  const { items, loading, error } = useSelector((store) => store.product);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.show]);

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

  return (
    <div className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12">Our Furniture</h2>
        {
          <Toaster
            visible={toast.show}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        }
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items?.map((item, index) => (
              <Card item={item} key={index} setToast={setToast} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
