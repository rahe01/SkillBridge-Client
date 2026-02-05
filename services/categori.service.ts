const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  getCategories: async function () {
    try {
      const res = await fetch(`${API_URL}/admin/categories`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch categories");

      const json = await res.json();

      
      const categories = json?.data ?? [];

      return { data: categories, error: null };
    } catch (err: any) {
      return { data: [], error: { message: err.message || "Something went wrong" } };
    }
  },
};
