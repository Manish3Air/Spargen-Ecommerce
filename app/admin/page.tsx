"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Wait for localStorage-based auth restoration
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("authUser");

      if (!stored) {
        router.push("/login");
      } else {
        const user = JSON.parse(stored);
        const isAdmin = user.email === "admin@example.com";

        if (!isAdmin) {
          alert("Unauthorized: Admin access only");
          router.push("/login");
        }

        setCheckingAuth(false);
      }
    }
  }, [router]);

  if (checkingAuth || !currentUser) return null;

  // Optional double-check
  const isAdmin = currentUser.email === "admin@example.com";
  if (!isAdmin) return null;

  return (
    <main className="min-h-screen p-8 bg-[#e0e5ec]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        👨‍💼 Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-neumorphic text-center">
          <h2 className="text-xl font-semibold text-gray-700">📦 Products</h2>
          <p className="text-gray-500 mt-2">Manage your product inventory</p>
          <button
            onClick={() => router.push("/admin/products")}
            className="mt-4 bg-[#d1d9e6] hover:bg-gray-300 text-sm px-4 py-2 rounded shadow font-medium"
          >
            Manage Products
          </button>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-neumorphic text-center">
          <h2 className="text-xl font-semibold text-gray-700">🛒 Orders</h2>
          <p className="text-gray-500 mt-2">View all customer orders</p>
          <button
             onClick={() => router.push("/admin/orders")}
            className="mt-4 bg-gray-200 text-sm px-4 py-2 rounded font-medium cursor-not-allowed"
          >
            Orders
          </button>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-neumorphic text-center">
          <h2 className="text-xl font-semibold text-gray-700">📊 Analytics</h2>
          <p className="text-gray-500 mt-2">Dashboard stats and metrics</p>
          <button
            
            onClick={() => router.push("/admin/analytics")}
            className="mt-4 bg-gray-200 text-sm px-4 py-2 rounded font-medium cursor"
          >
            Analytics
          </button>
        </div>
      </div>
    </main>
  );
}
