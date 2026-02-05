"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface Slot {
  date: string;
  startTime: string;
  endTime: string;
}

export default function SetAvailabilityPage() {
  const [slots, setSlots] = useState<Slot[]>([
    { date: "", startTime: "", endTime: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Add a new empty slot
  const addSlot = () => {
    setSlots([...slots, { date: "", startTime: "", endTime: "" }]);
  };

  // Remove a slot by index
  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  // Update a slot field
  const updateSlot = (index: number, field: keyof Slot, value: string) => {
    const updated = [...slots];
    updated[index][field] = value;
    setSlots(updated);
  };

  // Submit availability
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Unauthorized. Please login first.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ slots }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to save slots");

      // ✅ Success toast
      toast.success("Availability updated successfully 🎉");

      // ✅ Clear slots or reset UI if you want
      setSlots([{ date: "", startTime: "", endTime: "" }]);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Set Your Availability 🗓️</h1>
      <p className="mb-6">
        Add the time slots when you are available for tutoring.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="flex gap-2 items-end border p-3 rounded-lg"
          >
            {/* Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={slot.date}
                onChange={(e) => updateSlot(index, "date", e.target.value)}
                className="border rounded px-2 py-1"
                required
              />
            </div>

            {/* Start Time */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Start Time</label>
              <input
                type="time"
                value={slot.startTime}
                onChange={(e) => updateSlot(index, "startTime", e.target.value)}
                className="border rounded px-2 py-1"
                required
              />
            </div>

            {/* End Time */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">End Time</label>
              <input
                type="time"
                value={slot.endTime}
                onChange={(e) => updateSlot(index, "endTime", e.target.value)}
                className="border rounded px-2 py-1"
                required
              />
            </div>

            {/* Remove Button */}
            {slots.length > 1 && (
              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="text-red-500 font-bold px-2 py-1"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {/* Add Slot */}
        <button
          type="button"
          onClick={addSlot}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          + Add Slot
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Saving..." : "Save Availability"}
        </button>
      </form>
    </div>
  );
}
