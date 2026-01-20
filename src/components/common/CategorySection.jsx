import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../utils/useFetch";
import { Spinner } from "./Spinner";
export const CategorySection = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data: categoryData, loading } = useFetch(`${apiUrl}/shop/categories`);
  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 text-center py-12">
          Shop by Category
        </h2>

        <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {loading ? (
            <Spinner />
          ) : (
            categoryData?.response?.map((category, index) => (
              <Link
                key={index}
                to={`/shop?category=${category.name}`}
                className="group flex flex-col items-center min-w-[120px] lg:min-w-[150px]"
              >
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full border-2 border-gray-100 dark:border-gray-800 transition-all duration-300 group-hover:border-indigo-600 group-hover:shadow-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>

                <span className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">
                  {category.name}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
