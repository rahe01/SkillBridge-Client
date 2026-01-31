"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/categori.service";

const slides = [
  {
    id: 1,
    title: "Learn from Expert Tutors",
    subtitle: "Find the right tutor and learn at your own pace.",
    tag: "Start learning today",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200",
  },
  {
    id: 2,
    title: "Book Live Tutoring Sessions",
    subtitle: "One-on-one and group sessions, anytime anywhere.",
    tag: "Flexible scheduling",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
  },
  {
    id: 3,
    title: "Upgrade Your Skills",
    subtitle: "Academic, professional, and career-focused learning.",
    tag: "Learn • Practice • Grow",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // ---------------- Search Filters ----------------
  const [subject, setSubject] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  const router = useRouter();

  // ---------------- Slider ----------------
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // ---------------- Fetch Categories ----------------
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await categoryService.getCategories();
      if (data?.data) setCategories(data.data);
    };
    fetchCategories();
  }, []);

  // ---------------- Handle Search ----------------
  const handleSearch = () => {
    const query = new URLSearchParams();
    
    if (categoryId) query.append("categoryId", categoryId);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (rating) query.append("rating", rating);

    router.push(`/search?${query.toString()}`);
  };

  return (
    <section className="relative w-full h-[80vh] overflow-hidden rounded-b-1xl">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
              <div className="h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
                <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm text-white mb-2">
                  {slide.tag}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mt-2">
                  {slide.subtitle}
                </p>

                {/* ===== Search Inputs ===== */}
                <div className="mt-6 flex flex-wrap gap-2 w-full max-w-xl items-end">
                

                  {/* Category */}
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="px-4 py-2 bg-white text-black rounded"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  {/* Min Price */}
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min Price"
                    className="w-28 px-4 py-2 bg-white text-black rounded"
                  />

                  {/* Max Price */}
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max Price"
                    className="w-28 px-4 py-2 bg-white text-black rounded"
                  />

                  {/* Rating */}
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="px-4 py-2 bg-white text-black rounded"
                  >
                    <option value="">All Ratings</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {r} & up
                      </option>
                    ))}
                  </select>

                  <Button
                    onClick={handleSearch}
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    Search Tutors
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={() =>
          setCurrent((current - 1 + slides.length) % slides.length)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 w-3 rounded-full transition ${
              current === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
