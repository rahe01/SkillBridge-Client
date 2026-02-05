"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { bookingService } from "@/services/booking.service";

interface Session {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  student: {
    id: string;
    name: string;
    email: string;
  };
  review?: {
    id: string;
    rating: number;
    comment?: string;
  };
}

export default function TutorBookedSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchSessions = async () => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/sessions/booked`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setSessions(json.data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id: string) => {
    if (!token) return;

    setUpdatingId(id);
    try {
      await bookingService.updateBookingStatus(token, id, "COMPLETED");
      toast.success("Session completed ✅");
      fetchSessions();
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const statusColor = (status: string) => {
    if (status === "CONFIRMED") return "bg-blue-100 text-blue-700";
    if (status === "COMPLETED") return "bg-green-100 text-green-700";
    if (status === "CANCELLED") return "bg-red-100 text-red-700";
    return "";
  };

  if (loading) {
    return <p className="text-center mt-20">Loading sessions...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Booked Sessions 🗓️</h1>

      {sessions.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No booked sessions found
        </p>
      ) : (
        <div className="space-y-4">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="border rounded-xl p-4 bg-white shadow"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">
                  📅 {new Date(s.date).toLocaleDateString("en-GB")}
                </p>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${statusColor(
                    s.status
                  )}`}
                >
                  {s.status}
                </span>
              </div>

              <p className="mt-1">
                ⏰ {s.startTime} - {s.endTime}
              </p>

              <p className="mt-1">
                👤 {s.student.name} ({s.student.email})
              </p>

              {s.status === "CONFIRMED" && (
                <button
                  disabled={updatingId === s.id}
                  onClick={() => markCompleted(s.id)}
                  className="mt-2 px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {updatingId === s.id
                    ? "Updating..."
                    : "Mark as Completed"}
                </button>
              )}

              {s.review ? (
                <div className="mt-3 bg-yellow-50 p-2 rounded">
                  ⭐ {s.review.rating}/5  
                  {s.review.comment && <p>💬 {s.review.comment}</p>}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-2">No review yet</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
