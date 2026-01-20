import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../common/Sidebar";
import { useFetch } from "../../utils/useFetch";
import { fetchCategoryServer } from "../../store/productSlice";
import { useSearchParams } from "react-router-dom";
import { Card } from "../common/Card";
import Toaster from "../common/Toaster";

export const Shop = () => {
  const { items, loading, error, totalPages } = useSelector(
    (store) => store.product,
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "all";
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    setPage(1);
  }, [category, sort]);

  useEffect(() => {
    dispatch(fetchCategoryServer({ page, sort, category }));
  }, [page, category, sort, dispatch]);

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

  useEffect(() => {
    setPage(1);
  }, [sort, category]);

  return (
    <div className="px-6 py-32 lg:px-2 bg-gray-900 flex">
      <Sidebar />
      <div className="w-full lg:w-4/4">
        <div className="px-3 py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {items?.map((item, index) => (
            <Card item={item} key={index} setToast={setToast} />
          ))}
          {page < totalPages && (
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
              className="m-10 bg-blue-600 p-2 text-white"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
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
    </div>
  );
};
