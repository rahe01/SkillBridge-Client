import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_USER_URL || "http://localhost:5000/api/users";

// Get current logged-in user
export const getCurrentUser = async (token: string) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

// Update current user
export const updateUser = async (
  token: string,
  payload: { name?: string; email?: string; password?: string }
) => {
  const res = await axios.patch(`${API_URL}/me`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};
