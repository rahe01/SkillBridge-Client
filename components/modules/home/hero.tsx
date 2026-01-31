"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  {
    id: 4,
    title: "Trusted by Students & Tutors",
    subtitle: "Real reviews, real results, real success.",
    tag: "Join SkillBridge today",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden rounded-b-1xl ">
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

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
              <div className="h-full max-w-7xl mx-auto px-6 flex items-center">
                <div className="text-white max-w-xl space-y-5">
                  <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm">
                    {slide.tag}
                  </span>

                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl text-gray-200">
                    {slide.subtitle}
                  </p>

                  <div className="flex gap-4 pt-4">
                    <Button className="bg-white text-black hover:bg-gray-200">
                      Find a Tutor
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-black hover:bg-gray-200 hover:text-black"
                    >
                      Become a Tutor
                    </Button>
                  </div>
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
