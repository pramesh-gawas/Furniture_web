import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFetch } from "../utils/useFetch";
import { setProducts } from "../store/productSlice";
import { Spinner } from "./common/Spinner";
import { Card } from "./common/Card";
const apiUrl = import.meta.env.VITE_API_URL;

export const ProductList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.product);
  const { data, loading, error } = useFetch(`${apiUrl}/shop/productlist`);
  useEffect(() => {
    if (data?.response) {
      dispatch(setProducts(data.response));
    }
  }, [data, dispatch]);

  return (
    <div className="bg-gray-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12">Our Furniture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? <Spinner /> : items?.map((item) => <Card item={item} />)}
          {error && <div>error loading</div>}
        </div>
      </div>
    </div>
  );
};
