"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.image) {
      alert("Please fill in all required fields.");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: form.name,
      price: form.price,
      image: form.image,
      description: form.description,
    };

    const existing = JSON.parse(localStorage.getItem("products") || "[]");
    existing.push(newProduct);
    localStorage.setItem("products", JSON.stringify(existing));

    alert("✅ Product added!");
    router.push("/admin/products");
  };

  return (
    <main className="p-6 bg-[#e0e5ec] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">➕ Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4 max-w-xl"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description (optional)"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300"
        />
        <button
          type="submit"
          className="bg-[#d1d9e6] hover:bg-gray-300 px-4 py-2 rounded font-medium text-gray-800"
        >
          Add Product
        </button>
      </form>
    </main>
  );
}
