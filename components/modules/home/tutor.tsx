"use client";

import { useEffect, useState } from "react";
import { tutorService } from "@/services/tutor.service";

import { TutorCard } from "@/components/card/tutorCard";
import { categoryService } from "@/services/categori.service";

interface Tutor {
  id: string;
  user: { name: string; email: string; profilePicture?: string };
  bio?: string;
  pricePerHour: number;
  experience: number;
  rating: number;
  totalReviews: number;
  categories: { category: { name: string } }[];
}

interface Category {
  id: string;
  name: string;
}

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoryId, setCategoryId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // -----------------------
  // Fetch Categories
  // -----------------------
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await categoryService.getCategories();
      if (data?.data) {
        setCategories(data.data);
      }
    };
    fetchCategories();
  }, []);

  // -----------------------
  // Fetch Tutors
  // -----------------------
  const fetchTutors = async (filters?: any) => {
    setLoading(true);
    const { data } = await tutorService.getTutors(filters);
    setTutors(Array.isArray(data?.data) ? data.data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const applyFilters = () => {
    fetchTutors({
      categoryId: categoryId || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  };

  return (
    <div className="p-6">
      {/* ===== Filters ===== */}
      <div className="mb-8 p-4 border rounded-xl bg-muted/30 flex flex-wrap gap-4 items-end">
        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border rounded px-3 py-2 min-w-[180px]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block mb-1 font-medium">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border rounded px-3 py-2 w-28"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block mb-1 font-medium">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border rounded px-3 py-2 w-28"
          />
        </div>

        <button
          onClick={applyFilters}
          className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
        >
          Apply Filters
        </button>
      </div>

      {/* ===== Tutors ===== */}
      {loading ? (
        <p className="text-center mt-10">Loading tutors...</p>
      ) : tutors.length === 0 ? (
        <p className="text-center mt-10">No tutors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              id={tutor.id}
              name={tutor.user.name}
              email={tutor.user.email}
              profilePicture={tutor.user.profilePicture}
              bio={tutor.bio}
              pricePerHour={tutor.pricePerHour}
              experience={tutor.experience}
              rating={tutor.rating}
              totalReviews={tutor.totalReviews}
              categories={tutor.categories.map((c) => c.category.name)}
              href={`/tutors/${tutor.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
