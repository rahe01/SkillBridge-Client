"use client";

import { useEffect, useState } from "react";
import { AdminBookingService } from "@/services/adminBooking.service";

type Booking = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  student: {
    name: string;
    email: string;
  };
  tutorProfile: {
    pricePerHour: number;
    user: {
      name: string;
      email: string;
    };
  };
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await AdminBookingService.getAllBookings();
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading bookings...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📚 All Bookings</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Tutor</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <p className="font-medium">{booking.student.name}</p>
                  <p className="text-xs text-gray-500">
                    {booking.student.email}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <p className="font-medium">
                    {booking.tutorProfile.user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {booking.tutorProfile.user.email}
                  </p>
                </td>

                <td className="px-4 py-3">
                  {new Date(booking.date).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  {booking.startTime} - {booking.endTime}
                </td>

                <td className="px-4 py-3">
                  ৳{booking.tutorProfile.pricePerHour}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
                      ${
                        booking.status === "CONFIRMED"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No bookings found
          </p>
        )}
      </div>
    </div>
  );
}
