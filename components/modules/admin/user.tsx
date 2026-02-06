"use client";

import { useEffect, useState } from "react";
import { AdminService, IUser } from "@/services/admin.service";
import { toast } from "react-hot-toast";

export default function UserManipulationPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await AdminService.getAllUsers();
      setUsers(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (
    userId: string,
    status: "ACTIVE" | "BANNED",
  ) => {
    try {
      await AdminService.updateUserStatus(userId, status);
      toast.success(`User ${status === "BANNED" ? "banned" : "activated"}`);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Action failed");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading users...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">👥 User Management</h1>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-3">
                  {user.role !== "ADMIN" && (
                    <button
                      onClick={() =>
                        handleStatusChange(
                          user.id,
                          user.status === "ACTIVE" ? "BANNED" : "ACTIVE",
                        )
                      }
                      className={`px-3 py-1 rounded text-sm font-medium
                      ${
                        user.status === "ACTIVE"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {user.status === "ACTIVE" ? "Ban" : "Unban"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No users found
          </p>
        )}
      </div>
    </div>
  );
}
