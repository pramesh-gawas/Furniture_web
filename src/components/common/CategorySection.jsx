import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export const CategorySection = () => {
  const { items } = useSelector((store) => store.product);

  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 text-center py-12">
          Shop by Category
        </h2>

        <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {items.map((category) => (
            <Link
              key={category._id}
              to={`/shop?category=${category.category}`}
              className="group flex flex-col items-center min-w-[120px] lg:min-w-[150px]"
            >
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full border-2 border-gray-100 dark:border-gray-800 transition-all duration-300 group-hover:border-indigo-600 group-hover:shadow-lg">
                <img
                  src={category.image[0]}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>

              <span className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">
                {category.category}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
