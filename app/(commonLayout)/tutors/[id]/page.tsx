"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { tutorService } from "@/services/tutor.service";

export default function TutorDetailPage() {
  const params = useParams();
  const tutorId = params?.id;
  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tutorId) return;

    const fetchTutor = async () => {
      const { data, error } = await tutorService.getTutorById(tutorId as string);
      if (error) console.error(error.message);
      else setTutor(data?.data);
      setLoading(false);
    };

    fetchTutor();
  }, [tutorId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading tutor...</p>
      </div>
    );

  if (!tutor)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Tutor not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:flex md:gap-8 items-center">
        {/* Tutor Image */}
        <div className="flex-shrink-0">
          <img
            src={tutor.user.profilePicture || "/images/just-for-fun.jpeg"}
            alt={tutor.user.name}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary mx-auto"
          />
        </div>

        {/* Tutor Info */}
        <div className="mt-6 md:mt-0 flex-1">
          <h1 className="text-3xl font-bold text-center md:text-left">
            {tutor.user.name}
          </h1>
          <p className="text-center md:text-left text-muted-foreground mt-1">
            {tutor.user.email}
          </p>

          <p className="mt-4 text-gray-700 dark:text-gray-300">{tutor.bio || "No bio available"}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Categories: {tutor.categories.map((c: any) => c.category.name).join(", ") || "None"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-gray-700 dark:text-gray-300 font-medium">
            <p>Price: ${tutor.pricePerHour}/hr</p>
            <p>Experience: {tutor.experience} years</p>
            <p className="text-yellow-500">
              ⭐ {tutor.rating} ({tutor.totalReviews} reviews)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
