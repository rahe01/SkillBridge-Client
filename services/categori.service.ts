const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  getCategories: async function () {
    try {
      const res = await fetch(`${API_URL}/admin/categories`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
