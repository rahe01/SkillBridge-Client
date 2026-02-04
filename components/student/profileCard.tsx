"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { updateUser } from "@/services/user.service";
import toast from "react-hot-toast";

interface ProfileCardProps {
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
  token: string;
  onUpdate: (updated: { name: string; email: string }) => void;
}

export default function ProfileCard({ name, email, role, profilePicture, token, onUpdate }: ProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name, email, password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await updateUser(token, form);
      toast.success("Profile updated successfully!");
      onUpdate(updated);
      setIsOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-2xl p-6 flex flex-col items-center space-y-6 transition-transform hover:scale-105 hover:shadow-3xl duration-300">
        
        {/* Profile Picture */}
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image
            src={profilePicture || "/images/just-for-fun.jpeg"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        {/* User Info */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-500 text-lg">{email}</p>
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm capitalize shadow-md">
            {role}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setIsOpen(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* ===== Modal ===== */}
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
  {/* Overlay */}
  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

  {/* Panel */}
  <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-lg z-10">
    <Dialog.Title className="text-2xl font-bold mb-4">Edit Profile</Dialog.Title>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Leave blank to keep current password"
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  </div>
</Dialog>

    </>
  );
}
