"use client";

import { TutorCard } from "@/components/card/tutorCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { tutorService } from "@/services/tutor.service";
import { useEffect, useState } from "react";


interface Tutor {
  id: string;
  bio?: string;
  pricePerHour: number;
  experience: number;
  rating: number;
  totalReviews: number;
  user: {
    name: string;
    email: string;
    profilePicture?: string;
  };
  categories: {
    category: {
      name: string;
    };
  }[];
}

export default function FeaturedTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedTutors = async () => {
      const { data, error } = await tutorService.getFeaturedTutors();

      if (error) {
        console.error(error.message);
      } else {
        setTutors(Array.isArray(data?.data) ? data.data : []);
      }
      setLoading(false);
    };

    fetchFeaturedTutors();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
       
        <LoadingSpinner size={12} text=" Loading featured tutors..."></LoadingSpinner>
      </div>
    );
  }

  if (!tutors.length) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No featured tutors available.
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">🌟 Featured Tutors</h2>
          <p className="mt-2 text-muted-foreground">
            Learn from our top-rated and most experienced tutors
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              categories={tutor.categories.map(
                (c) => c.category.name
              )}
              href={`/tutors/${tutor.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
