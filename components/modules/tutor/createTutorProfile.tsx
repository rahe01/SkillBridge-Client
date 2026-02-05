"use client";

import { useEffect, useState } from "react";
import { categoryService } from "@/services/categori.service";
import { tutorProfileService } from "@/services/tutorProfile.service";

interface Category {
  id: string;
  name: string;
}

export default function TutorProfilePage() {
  const [bio, setBio] = useState("");
  const [pricePerHour, setPricePerHour] = useState<number>(0);
  const [experience, setExperience] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState<string | null>(null);

  // ✅ Get token safely on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  // ✅ Fetch categories safely
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await categoryService.getCategories();
        if (res.data && Array.isArray(res.data)) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    loadCategories();
  }, []);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Unauthorized. Please login first.");
      return;
    }

    try {
      setLoading(true);

      await tutorProfileService.upsertProfile(
        {
          bio,
          pricePerHour,
          experience,
          categoryIds: selectedCategories,
        },
        token
      );

      alert("Tutor profile saved successfully 🎉");
    } catch (error: any) {
      alert(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Create / Update Tutor Profile 🎓
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bio */}
        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell students about yourself"
          />
        </div>

        {/* Price Per Hour */}
        <div>
          <label className="block font-medium mb-1">
            Price Per Hour (৳)
          </label>
          <input
            type="number"
            required
            value={pricePerHour}
            onChange={(e) => setPricePerHour(Number(e.target.value))}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block font-medium mb-1">
            Experience (years)
          </label>
          <input
            type="number"
            required
            value={experience}
            onChange={(e) => setExperience(Number(e.target.value))}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block font-medium mb-2">Select Subjects</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 border rounded-lg p-2 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                  />
                  <span>{category.name}</span>
                </label>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
