"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Order {
  id: string;
  date: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  shipping: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      alert("You must be logged in to access this page.");
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) return null; // Prevent flicker

  useEffect(() => {
  if (currentUser) {
    const stored = localStorage.getItem(`orders-${currentUser.email}`);
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }
}, [currentUser]);


  return (
    <main className="p-6 bg-[#e0e5ec] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">📦 Order History</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No past orders found.</p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#e0e5ec] shadow-neumorphic rounded-xl p-6"
            >
              <div className="mb-4 text-sm text-gray-600">
                <strong>Order ID:</strong> #{order.id} <br />
                <strong>Date:</strong> {order.date}
              </div>

              <div className="space-y-2 text-sm">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-right font-semibold text-gray-800">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
