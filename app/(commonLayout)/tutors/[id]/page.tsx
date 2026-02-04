"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { tutorService } from "@/services/tutor.service";
import { bookingService } from "@/services/booking.service";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function TutorDetailPage() {
  const params = useParams<{ id: string }>();
  const tutorId = params?.id;
  const router = useRouter();

  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!tutorId) return;

    const fetchTutor = async () => {
      setLoading(true);
      const { data, error } = await tutorService.getTutorById(tutorId);

      if (!error && data?.success) {
        setTutor(data.data);
      }

      setLoading(false);
    };

    fetchTutor();
  }, [tutorId]);

  const handleBooking = async (slot: any) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to book a slot.");
      return;
    }

    setBookingLoading(slot.id);
    try {
      const payload = {
        tutorProfileId: tutor.id,
        date: slot.date.split("T")[0],
        startTime: slot.startTime,
        endTime: slot.endTime,
      };

      await bookingService.createBooking(token, payload);
      alert("Booking successful!");
      router.push("/dashboard/bookings");
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setBookingLoading(null);
    }
  };

  /* ================= Loading ================= */
  if (loading) {
    return (
      <p className="text-center mt-20 text-muted-foreground">
        Loading tutor...
      </p>
    );
  }

  /* ================= Not Found ================= */
  if (!tutor) {
    return (
      <p className="text-center mt-20 text-muted-foreground">
        Tutor not found.
      </p>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ================= Tutor Card ================= */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
          <div className="relative w-40 h-40 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-primary">
            <Image
              src={tutor.user?.profilePicture || "/images/just-for-fun.jpeg"}
              alt={tutor.user?.name || "Tutor"}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{tutor.user?.name}</h1>
            <p className="text-muted-foreground">{tutor.user?.email}</p>

            <p className="mt-4">
              {tutor.bio || "No bio available"}
            </p>

            {/* Categories */}
            {tutor.categories?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tutor.categories.map((c: any) => (
                  <span
                    key={c.category.id}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {c.category.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-6 font-medium">
              <p>💰 {tutor.pricePerHour} ৳ / hour</p>
              <p>📚 {tutor.experience} years experience</p>
              <p className="text-yellow-500">
                ⭐ {tutor.rating} ({tutor.totalReviews} reviews)
              </p>
            </div>
          </div>
        </div>

        {/* ================= Availability ================= */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Availability</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {tutor.availability?.map((slot: any) => (
              <div
                key={slot.id}
                className={`p-4 rounded-xl border ${
                  slot.isBooked
                    ? "bg-red-100 border-red-400"
                    : "bg-green-100 border-green-400"
                }`}
              >
                <p>📅 {formatDate(slot.date)}</p>
                <p>⏰ {slot.startTime} - {slot.endTime}</p>

                {slot.isBooked ? (
                  <span className="inline-block mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded-full">
                    Booked
                  </span>
                ) : (
                  <button
                    disabled={bookingLoading === slot.id}
                    className={`mt-2 px-3 py-1 rounded-full ${
                      bookingLoading === slot.id
                        ? "bg-gray-400 text-white"
                        : "bg-green-600 text-white"
                    }`}
                    onClick={() => handleBooking(slot)}
                  >
                    {bookingLoading === slot.id ? "Booking..." : "Book Now"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= Reviews ================= */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-6">
            Student Reviews ({tutor.reviews?.length || 0})
          </h2>

          {!tutor.reviews || tutor.reviews.length === 0 ? (
            <p className="text-muted-foreground">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {tutor.reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="border rounded-xl p-4 hover:shadow transition"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Student</p>
                    <p className="text-yellow-500">
                      ⭐ {review.rating}/5
                    </p>
                  </div>

                  {review.comment && (
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      “{review.comment}”
                    </p>
                  )}

                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
