import { Testimonial } from "../Testimonial";
import { StatusSection } from "../common/StatusSection";
import { ProductList } from "../ProductList";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CategorySection } from "../common/CategorySection";

const slides = [
  {
    id: 1,
    title: "Minimalist Living Room",
    description: "Discover our new Scandinavian collection for 2025.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1920",
    cta: "Shop Seating",
  },
  {
    id: 2,
    title: "Modern Office Spaces",
    description: "Ergonomic designs to boost your home productivity.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1920",
    cta: "View Desks",
  },
  {
    id: 3,
    title: "Sustainable Bedroom",
    description: "Ethically sourced oak and linen for a better sleep.",
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1920",
    cta: "Shop Dining",
  },
];
export const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const nextSlide = () =>
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  // Auto-play feature
  useEffect(() => {
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
          {slides.map((slide) => (
            <div key={slide.id} className="relative min-w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover opacity-70"
              />
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
                <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                  {slide.title}
                </h1>
                <p className="mt-6 text-lg max-w-xl">{slide.description}</p>
                <button className="mt-10 rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-all">
                  {slide.cta}
                </button>
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
