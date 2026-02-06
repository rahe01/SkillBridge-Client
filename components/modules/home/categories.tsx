"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { AdminCategoryService, ICategory } from "@/services/admin.category.service";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminCategoryService.getCategories()
      .then((data) => setCategories(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Explore Categories 🎓
        </h1>
        <p className="text-gray-500 mt-3">
          Discover skills, topics, and subjects taught by expert tutors
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center text-gray-500 text-lg">
          ⏳ Loading categories...
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                <BookOpen size={26} />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                {cat.name}
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Learn & grow with this category
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && categories.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          😕 No categories available right now
        </div>
      )}
    </section>
  );
}
