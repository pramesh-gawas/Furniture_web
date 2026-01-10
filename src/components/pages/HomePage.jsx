import { Testimonial } from "../Testimonial";
import { StatusSection } from "../common/StatusSection";
import { ProductList } from "../ProductList";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CategorySection } from "../common/CategorySection";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const { items } = useSelector((store) => store.product);
  const slides = items ? items.slice(0, 3) : [];
  const nextSlide = () =>
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  // Auto-play feature
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <section className="relative h-[600px] w-full overflow-hidden bg-gray-900">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides?.map((slide) => (
            <div key={slide._id} className="relative min-w-full h-full">
              <img
                src={slide.images[0]}
                alt={slide.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-70"
              />
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
                <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                  {slide.name}
                </h1>
                <p className="mt-6 text-lg max-w-xl">{slide.description}</p>
                <Link
                  to={"/shop"}
                  className="mt-10 rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-all"
                >
                  {slide.cta || "buy now "}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-md hover:bg-white/40 transition"
        >
          <ChevronLeftIcon className="size-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-md hover:bg-white/40 transition"
        >
          <ChevronRightIcon className="size-8" />
        </button>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                current === index ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>
      <CategorySection />
      <StatusSection />
      <ProductList />
      <Testimonial />
    </>
  );
};
