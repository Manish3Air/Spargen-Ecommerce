"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [form, setForm] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    image: "",
    description: "",
  });

  // Load product from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (!stored) return;

    const products: Product[] = JSON.parse(stored);
    const target = products.find((p) => p.id === productId);
    if (target) {
      setForm(target);
    } else {
      alert("Product not found.");
      router.push("/admin/products");
    }
  }, [productId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
    const updated = products.map((p) => (p.id === productId ? form : p));
    localStorage.setItem("products", JSON.stringify(updated));
    alert("✅ Product updated!");
    router.push("/admin/products");
  };

  return (
    <main className="p-6 bg-[#e0e5ec] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">✏️ Edit Product</h1>

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
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300"
        />
        <button
          type="submit"
          className="bg-[#d1d9e6] hover:bg-gray-300 px-4 py-2 rounded font-medium text-gray-800"
        >
          Update Product
        </button>
      </form>
    </main>
  );
}
