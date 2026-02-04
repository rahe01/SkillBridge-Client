"use client";

import { useEffect, useState } from "react";
import { bookingService } from "@/services/booking.service";
import { StudentService } from "@/services/student.service";
import { set } from "zod";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB") +
  " " +
  new Date(date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingBookingId, setReviewingBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchBookings = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await bookingService.getBookings(token);
      setBookings(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await bookingService.updateBookingStatus(token, id, "CANCELLED");
      alert("Booking cancelled!");
      fetchBookings();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }
  };


  const handleSubmitReview = async () => {
    if (!token || !reviewingBookingId) return;

    try {
      await StudentService.createReview(token, {
        bookingId: reviewingBookingId,
        rating,
        comment,
      });
      alert("Review submitted!");
      setReviewingBookingId(null);
      setComment("");
      setRating(5);
      fetchBookings();
     
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading bookings...</p>;
  if (!bookings.length) return <p className="text-center mt-20">No bookings yet.</p>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>

        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 flex flex-col md:flex-row justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{b.tutorProfile.user.name}</h2>
              <p>{b.tutorProfile.bio}</p>
              <p>💰 {b.tutorProfile.pricePerHour} ৳ / hour</p>
              <p>📅 {formatDate(b.date)} ⏰ {b.startTime} - {b.endTime}</p>
            </div>

            <div className="mt-2 md:mt-0 flex flex-col items-end gap-2">
              <span
                className={`px-3 py-1 rounded-full ${
                  b.status === "CONFIRMED"
                    ? "bg-blue-100 text-blue-800"
                    : b.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {b.status}
              </span>

              {/* Cancel Button only for CONFIRMED bookings */}
              {b.status === "CONFIRMED" && (
                <button
                  className="mt-2 px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                  onClick={() => handleCancel(b.id)}
                >
                  Cancel Booking
                </button>
              )}

              {/* Review Button only for COMPLETED bookings without review */}
              {b.status === "COMPLETED" && !b.review && (
                <button
                  className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                  onClick={() => setReviewingBookingId(b.id)}
                >
                  Leave Review
                </button>
              )}
            </div>
          </div>
        ))}

        {/* ================= Review Modal ================= */}
        {reviewingBookingId && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

              <label className="block mb-2">
                Rating (1-5):
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="mt-1 w-full border rounded px-2 py-1"
                />
              </label>

              <label className="block mb-4">
                Comment:
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-1 w-full border rounded px-2 py-1"
                />
              </label>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setReviewingBookingId(null)}
                >
                  Cancel
                </button>
             
                      <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={handleSubmitReview}
                >
                  Submit
                </button>
               
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
