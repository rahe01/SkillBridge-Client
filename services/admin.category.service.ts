import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No access token found");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export interface ICategory {
  id: string;
  name: string;
}

// 🔹 Public (no auth)
const getCategories = async (): Promise<ICategory[]> => {
  const res = await axios.get(`${API_URL}/admin/categories`);
  return res.data.data || res.data;
};

// 🔹 Admin only
const createCategory = async (name: string) => {
  const res = await axios.post(
    `${API_URL}/admin/categories`,
    { name },
    getAuthHeader(),
  );
  return res.data;
};

const updateCategory = async (id: string, name: string) => {
  const res = await axios.put(
    `${API_URL}/admin/categories/${id}`,
    { name },
    getAuthHeader(),
  );
  return res.data;
};

const deleteCategory = async (id: string) => {
  const res = await axios.delete(
    `${API_URL}/admin/categories/${id}`,
    getAuthHeader(),
  );
  return res.data;
};

export const AdminCategoryService = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
