"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else {
      setForm({ name: currentUser.name, email: currentUser.email });
    }
  }, [currentUser]);

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return alert("Fields required");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) =>
      u.email === currentUser?.email ? { ...u, ...form } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("authUser", JSON.stringify(form));
    alert("✅ Profile updated. Please log in again.");
    logout();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[#e0e5ec] p-6 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-neumorphic w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold text-gray-800 text-center">My Profile</h1>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 rounded shadow-inner bg-gray-100 text-sm"
          placeholder="Name"
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 rounded shadow-inner bg-gray-100 text-sm"
          placeholder="Email"
        />
        <button
          onClick={handleSave}
          className="w-full bg-[#d1d9e6] hover:bg-gray-300 py-2 rounded font-medium text-gray-800"
        >
          Save & Logout
        </button>
      </div>
    </main>
  );
}
