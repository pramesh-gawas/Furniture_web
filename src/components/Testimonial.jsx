import { useState } from "react";

export const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Our living room has never looked better. The quality of the oak coffee table is outstanding, and the delivery was seamless.",
      author: "Judith Black",
      role: "Homeowner",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      quote:
        "The ergonomic office chair is a game changer for my productivity. Finally, a brand that balances style with true comfort.",
      author: "John Doe",
      role: "Interior Designer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      quote:
        "Sustainable materials and beautiful design. It's rare to find a furniture store that cares this much about the planet.",
      author: "Jane Smith",
      role: "Architect",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20 dark:bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] dark:opacity-10" />

      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="flex justify-center text-indigo-600 font-bold text-2xl tracking-tighter dark:text-indigo-400">
          FURNITURE HUB
        </div>

        <figure className="mt-10">
          <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9 dark:text-white min-h-[120px] flex items-center justify-center">
            <p className="transition-all duration-500">"{current.quote}"</p>
          </blockquote>

          <figcaption className="mt-10">
            <img
              alt={current.author}
              src={current.image}
              className="mx-auto size-12 rounded-full object-cover shadow-md"
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900 dark:text-white">
                {current.author}
              </div>
              <svg
                width={3}
                height={3}
                viewBox="0 0 2 2"
                className="fill-gray-900 dark:fill-white"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="text-gray-600 dark:text-gray-400">
                {current.role}
              </div>
            </div>
          </figcaption>
        </figure>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={prevTestimonial}
            className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <span className="text-2xl">←</span>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-indigo-600"
                    : "w-2 bg-gray-300 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <span className="text-2xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
