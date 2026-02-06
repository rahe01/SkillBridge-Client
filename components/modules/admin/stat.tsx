"use client";

import { AdminService, IDashboardStats } from "@/services/dash.service";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  UserIcon,
  AcademicCapIcon,
  TagIcon,
  CalendarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [stats, setStats] = useState<IDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await AdminService.getDashboardStats();
        setStats(data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-xl font-semibold animate-pulse">
        Loading stats...
      </p>
    );

  if (!stats)
    return (
      <p className="text-center mt-20 text-xl font-semibold text-red-500">
        No data available
      </p>
    );

  // Common classes
  const cardClasses =
    "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl transition-shadow rounded-2xl p-6 flex flex-col justify-between border-l-8";
  const titleClasses = "flex items-center gap-3 text-lg font-semibold mb-4";
  const valueClasses = "text-3xl font-bold";

  return (
    <div className="p-6 md:p-10">
      <Toaster position="top-right" />
      <h1 className="text-5xl font-extrabold mb-10 text-center text-gray-800 dark:text-gray-100">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Users */}
        <div className={`${cardClasses} border-blue-400`}>
          <div className={titleClasses}>
            <UserIcon className="h-8 w-8 text-blue-500" />
            Users
          </div>
          <div className="space-y-1">
            <p className={valueClasses}>{stats.users.total}</p>
            <p className="text-sm text-gray-500">Students: {stats.users.students}</p>
            <p className="text-sm text-gray-500">Tutors: {stats.users.tutors}</p>
            <p className="text-sm text-green-600">Active: {stats.users.active}</p>
            <p className="text-sm text-red-600">Banned: {stats.users.banned}</p>
          </div>
        </div>

        {/* Tutors */}
        <div className={`${cardClasses} border-purple-400`}>
          <div className={titleClasses}>
            <AcademicCapIcon className="h-8 w-8 text-purple-500" />
            Tutors
          </div>
          <div className="space-y-1">
            <p className={valueClasses}>{stats.tutors.totalProfiles}</p>
            <p className="text-sm text-yellow-500">
              Avg Rating: {stats.tutors.averageRating.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className={`${cardClasses} border-pink-400`}>
          <div className={titleClasses}>
            <TagIcon className="h-8 w-8 text-pink-500" />
            Categories
          </div>
          <p className={valueClasses}>{stats.categories.total}</p>
        </div>

        {/* Bookings */}
        <div className={`${cardClasses} border-indigo-400`}>
          <div className={titleClasses}>
            <CalendarIcon className="h-8 w-8 text-indigo-500" />
            Bookings
          </div>
          <p className={valueClasses}>{stats.bookings.total}</p>
          <div className="mt-2 space-y-1 text-sm">
            <p className="text-blue-500">
              Confirmed: {stats.bookings.byStatus.CONFIRMED}
            </p>
            <p className="text-green-500">
              Completed: {stats.bookings.byStatus.COMPLETED}
            </p>
            <p className="text-red-500">
              Cancelled: {stats.bookings.byStatus.CANCELLED}
            </p>
            <p className="text-gray-500">
              Last 7 Days: {stats.bookings.last7Days}
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className={`${cardClasses} border-yellow-400`}>
          <div className={titleClasses}>
            <StarIcon className="h-8 w-8 text-yellow-400" />
            Reviews
          </div>
          <p className={valueClasses}>{stats.reviews.total}</p>
        </div>
      </div>
    </div>
  );
}
