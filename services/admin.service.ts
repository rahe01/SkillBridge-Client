import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
}

// 🔹 Get all users
const getAllUsers = async (): Promise<IUser[]> => {
  const res = await axios.get(`${API_URL}/admin/users`, getAuthHeader());
  return res.data.data || res.data;
};

// 🔹 Update user status (ACTIVE / BANNED)
const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "BANNED",
) => {
  const res = await axios.patch(
    `${API_URL}/admin/users/${userId}`,
    { status },
    getAuthHeader(),
  );

  return res.data;
};

export interface IAdminDashboardStats {
  totalUsers: number;
  totalStudents: number;
  totalTutors: number;
  activeTutors: number;
  totalBookings: number;
  totalCategories: number;
}


const getDashboardStats = async () => {
  const res = await axios.get(
    `${API_URL}/admin/dashboard-stats`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    }
  );

  return res.data.data;
};


export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getDashboardStats
};
