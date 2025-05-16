"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export default function AdminProductsPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false); // ✅ track initial load

  // 🛡 Protect access
  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    const user = stored ? JSON.parse(stored) : null;
    if (!user || user.email !== "admin@example.com") {
      router.push("/login");
    }
  }, [router]);

  // 📦 Load products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    try {
      const parsed = storedProducts ? JSON.parse(storedProducts) : [];
      setProducts(parsed);
    } catch (err) {
      console.error("Failed to parse products:", err);
      setProducts([]);
    } finally {
      setLoaded(true); // ✅ finished loading
    }
  }, []);

  // 🧹 Save to localStorage only after initial load
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, loaded]);

  const deleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <main className="p-6 bg-[#e0e5ec] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📦 Products</h1>
        <button
          onClick={() => router.push("/admin/products/new")}
          className="bg-[#d1d9e6] hover:bg-gray-300 text-sm px-4 py-2 rounded shadow"
        >
          ➕ Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <table className="w-full text-sm bg-white rounded shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-contain" />
                </td>
                <td className="p-3 font-medium">{product.name}</td>
                <td className="p-3 text-gray-700">${product.price}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
