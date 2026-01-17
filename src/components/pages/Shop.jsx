import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../common/Sidebar";
import { useFetch } from "../../utils/useFetch";
import { setProducts, appendProducts } from "../../store/productSlice";
import { useSearchParams } from "react-router-dom";
import { Card } from "../common/Card";
import Toaster from "../common/Toaster";
const apiUrl = import.meta.env.VITE_API_URL;

export const Shop = () => {
  const { filteredItems, items } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "all";
  const { data, loading, error } = useFetch(
    `${apiUrl}/shop/productlist?page=${page}&sort=${sort}&category=${category}`
  );
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

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [sort, category]);

  useEffect(() => {
    if (data?.response) {
      if (page === 1) {
        dispatch(setProducts(data.response));
      } else {
        dispatch(appendProducts(data.response));
      }
      if (data.currentPage >= data.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [data, dispatch, page]);

  const product = filteredItems.length > 0 ? filteredItems : items;
  return (
    <div className="px-6 py-32 lg:px-2 bg-gray-900 flex">
      <Sidebar />
      <div className="w-full lg:w-4/4">
        <div className="px-3 py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {product?.map((item, index) => (
            <Card item={item} key={index} setToast={setToast} />
          ))}
          {hasMore && (
            <button
              onClick={() => {
                if (page < data?.totalPages) {
                  setPage((prev) => prev + 1);
                }
              }}
              disabled={loading || page >= data?.totalPages}
              className="mt-8 px-6 py-2 bg-black text-white"
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
