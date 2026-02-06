import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  };
};

export interface IBookingStatus {
  CONFIRMED: number;
  COMPLETED: number;
  CANCELLED: number;
}

export interface IDashboardStats {
  users: {
    total: number;
    students: number;
    tutors: number;
    active: number;
    banned: number;
  };
  tutors: {
    totalProfiles: number;
    averageRating: number;
  };
  categories: {
    total: number;
  };
  bookings: {
    total: number;
    byStatus: IBookingStatus;
    last7Days: number;
  };
  reviews: {
    total: number;
  };
}

// 🔹 Get Admin Dashboard Stats
const getDashboardStats = async (): Promise<IDashboardStats> => {
  const res = await axios.get(`${API_URL}/admin/dashboard-stats`, getAuthHeader());
  return res.data.data;
};

export const AdminService = {
  getDashboardStats,
};
