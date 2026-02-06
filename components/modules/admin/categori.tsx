"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  AdminCategoryService,
  ICategory,
} from "@/services/admin.category.service";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const data = await AdminCategoryService.getCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await AdminCategoryService.updateCategory(editingId, name);
        toast.success("Category updated");
      } else {
        await AdminCategoryService.createCategory(name);
        toast.success("Category created");
      }

      setName("");
      setEditingId(null);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: ICategory) => {
    setName(category.name);
    setEditingId(category.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await AdminCategoryService.deleteCategory(id);
      toast.success("Category deleted");
      fetchCategories();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📚 Category Management</h1>

      {/* Create / Update */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setName("");
            }}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      {/* List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3">{cat.name}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No categories found
          </p>
        )}
      </div>
    </div>
  );
}
