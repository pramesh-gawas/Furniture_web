import React from "react";

const stats = [
  { id: 1, name: "Rooms Transformed", value: "250,000+" },
  { id: 2, name: "Sustainable Materials Used", value: "100%" },
  { id: 3, name: "Global Design Awards", value: "12" },
  { id: 4, name: "Customer Satisfaction Rate", value: "99.8%" },
];

export const StatusSection = () => {
  return (
    <div className="bg-white py-10 sm:py-0 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 text-center py-12">
          Our Impact by Numbers
        </h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base/7 text-gray-600 dark:text-gray-400">
                {stat.name}
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
