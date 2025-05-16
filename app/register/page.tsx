"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register(form);
    if (success) {
      alert("✅ Registered! Please log in.");
      router.push("/login"); // ✅ go to login
    } else {
      alert("⚠️ Email already in use");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#e0e5ec]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-neumorphic space-y-4 w-96"
      >
        <h1 className="text-xl font-bold text-gray-800 text-center">
          Register
        </h1>
        <input
          type="text"
          placeholder="Name"
          name="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 rounded shadow-inner bg-[#f5f6fa] text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 rounded shadow-inner bg-[#f5f6fa] text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 rounded shadow-inner bg-[#f5f6fa] text-sm"
        />
        <button className="w-full bg-[#d1d9e6] hover:bg-gray-300 py-2 rounded font-medium text-gray-800">
          Register
        </button>
      </form>
    </main>
  );
}
