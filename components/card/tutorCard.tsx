"use client";

import React from "react";

interface TutorCardProps {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  pricePerHour: number;
  experience: number;
  rating: number;
  totalReviews: number;
  categories: string[];
  href?: string; 
}

export const TutorCard: React.FC<TutorCardProps> = ({
  id,
  name,
  email,
  profilePicture,
  bio,
  pricePerHour,
  experience,
  rating,
  totalReviews,
  categories,
  href = "#",
}) => {
  return (
    <a
      href={href}
      className="group block border rounded-xl shadow-lg hover:shadow-2xl transition p-6 bg-white dark:bg-gray-800"
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={profilePicture || "/images/just-for-fun.jpeg"}
          alt={name}
          className="w-28 h-28 rounded-full object-cover border-2 border-primary group-hover:border-secondary transition"
        />
        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>

      <p className="mt-4 text-gray-700 dark:text-gray-300 text-center">{bio || "No bio available"}</p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <span
            key={cat}
            className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold"
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
        <span>Price: ${pricePerHour}/hr</span>
        <span>Exp: {experience} yrs</span>
      </div>

      <div className="mt-2 text-center text-sm text-yellow-500 font-semibold">
        ⭐ {rating} ({totalReviews} reviews)
      </div>
    </a>
  );
};
