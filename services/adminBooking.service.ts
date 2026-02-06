import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AdminBookingService = {
  getAllBookings: async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API_URL}/admin/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },
};
