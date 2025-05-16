"use client";

import { useEffect, useState } from "react";

interface Order {
  id: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  date?: string;
}

interface UserOrder {
  email: string;
  orders: Order[];
}

export default function AdminOrdersPage() {
  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const collected: UserOrder[] = [];

    users.forEach((user: any) => {
      const userOrderData = JSON.parse(localStorage.getItem(`orders-${user.email}`) || "[]");
      if (userOrderData.length > 0) {
        collected.push({ email: user.email, orders: userOrderData });
      }
    });

    setUserOrders(collected);
  }, []);

  return (
    <main className="p-6 bg-[#e0e5ec] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🧾 All Orders</h1>

      {userOrders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {userOrders.map(({ email, orders }) => (
            <div key={email} className="bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">👤 {email}</h2>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border-t border-gray-200 py-3 text-sm space-y-2"
                >
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Order ID: {order.id}</span>
                    <span>Total: ${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 border rounded px-2 py-1"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-contain"
                        />
                        <span>{item.name} x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  {order.date && (
                    <p className="text-xs text-gray-400 mt-1">
                      Placed on: {new Date(order.date).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
