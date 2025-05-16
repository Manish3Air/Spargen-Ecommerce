"use client";

import { useEffect, useState } from "react";

export default function AdminAnalyticsPage() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // 👥 Users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setTotalUsers(users.length);

    // 📦 Products
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    setTotalProducts(products.length);

    // 🛒 Orders
    let orders = 0;
    let revenue = 0;

    users.forEach((user: any) => {
      const userOrders = JSON.parse(localStorage.getItem(`orders-${user.email}`) || "[]");
      orders += userOrders.length;

      userOrders.forEach((order: any) => {
        revenue += order.total || 0;
      });
    });

    setTotalOrders(orders);
    setTotalRevenue(revenue);
  }, []);

  return (
    <main className="p-6 bg-[#e0e5ec] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📈 Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value={totalUsers} />
        <Card title="Total Products" value={totalProducts} />
        <Card title="Total Orders" value={totalOrders} />
        <Card title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl shadow-neumorphic p-6 text-center">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}
