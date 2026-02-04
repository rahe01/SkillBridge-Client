"use client";

import { useEffect, useState } from "react";

import { getCurrentUser } from "@/services/user.service";
import toast from "react-hot-toast";
import ProfileCard from "@/components/student/profileCard";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const data = await getCurrentUser(token);
        setUser(data);
      } catch (err: any) {
        toast.error("Failed to fetch user info");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) return <p className="mt-20 text-center text-gray-500">Loading profile...</p>;
  if (!user) return <p className="mt-20 text-center text-gray-500">User not found</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-800">My Profile</h1>
      <ProfileCard
        name={user.name}
        email={user.email}
        role={user.role}
        profilePicture={user.profilePicture}
        token={token!}
        onUpdate={(updated : any) => setUser(updated)}
      />
    </div>
  );
}
