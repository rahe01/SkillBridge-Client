"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { tutorService } from "@/services/tutor.service";
import { TutorCard } from "@/components/card/tutorCard";
import { Loader } from "@/components/ui/Loader";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const rating = searchParams.get("rating") || "";

  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    const fetchTutors = async () => {
      // যদি কোনো search param না থাকে → tutors খালি রাখো
      if (!categoryId && !minPrice && !maxPrice && !rating) {
        setTutors([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setError(null);
      setHasSearched(true);

      const { data, error } = await tutorService.getTutors({
        categoryId: categoryId || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        rating: rating ? Number(rating) : undefined,
      });

      if (error) setError(error.message);
      else setTutors(data?.data || []);

      setLoading(false);
    };

    fetchTutors();
  }, [categoryId, minPrice, maxPrice, rating]);

  return (
    <div className="container mx-auto px-6 py-10 max-w-7xl">
      {/* ================= Header ================= */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse & Find Tutors</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our expert tutors by category, rating, and price. Use the search or filter options to find the perfect match.
        </p>
      </div>

      {/* ================= Loading & Error ================= */}
      {loading && <Loader text="Searching tutors..." />}
      {error && <ErrorMessage message={error} />}

      {/* ================= No Search / No Results ================= */}
      {!loading && !error && !hasSearched && (
        <p className="text-center text-muted-foreground">
          Enter a category, rating or price filter to start searching.
        </p>
      )}
      {!loading && !error && hasSearched && tutors.length === 0 && (
        <p className="text-center text-muted-foreground">
          No tutors found for your search criteria.
        </p>
      )}

      {/* ================= Tutors Grid ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <TutorCard
            key={tutor.id}
            id={tutor.id}
            name={tutor.user.name}
            email={tutor.user.email}
            profilePicture={tutor.user.profilePicture || undefined}
            bio={tutor.bio}
            pricePerHour={tutor.pricePerHour}
            experience={tutor.experience}
            rating={tutor.rating}
            totalReviews={tutor.totalReviews}
            categories={tutor.categories.map((c: any) => c.category.name)}
            href={`/tutors/${tutor.id}`}
          />
        ))}
      </div>
    </div>
  );
}
