"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(form.email, form.password);
    if (success) {
      alert("✅ Logged in!");
      router.push("/");
    } else {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#e0e5ec]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-neumorphic space-y-4 w-96">
        <h1 className="text-xl font-bold text-gray-800 text-center">Login</h1>
        <input type="email" placeholder="Email" name="email" required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 rounded shadow-inner bg-[#f5f6fa] text-sm"
        />
        <input type="password" placeholder="Password" name="password" required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 rounded shadow-inner bg-[#f5f6fa] text-sm"
        />
        <button className="w-full bg-[#d1d9e6] hover:bg-gray-300 py-2 rounded font-medium text-gray-800">Login</button>
      </form>
    </main>
  );
}
