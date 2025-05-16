"use client";

import React, { useState,useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    if (!currentUser) {
      alert("You must be logged in to access this page.");
      router.push("/login");
    }
  }, [currentUser, router]);





  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (Object.values(form).some((val) => val.trim() === "")) {
      alert("Please fill all fields.");
      return;
    }

    const order = {
  id: Date.now().toString(), // unique ID
  date: new Date().toLocaleString(),
  items: cartItems,
  total: totalPrice,
  shipping: form,
};

if (currentUser) {
  const existing = localStorage.getItem(`orders-${currentUser.email}`);
  const orderHistory = existing ? JSON.parse(existing) : [];
  orderHistory.push(order);
  localStorage.setItem(`orders-${currentUser.email}`, JSON.stringify(orderHistory));
}

  if (!currentUser) return null; // Prevent flicker

    // Simulate payment delay
    setTimeout(() => {
      clearCart();
      alert("✅ Order placed successfully!");
      router.push("/");
    }, 1000);
  };

  return (
    <main className="p-6 bg-[#e0e5ec] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Address Form */}
        <div className="bg-[#e0e5ec] shadow-neumorphic rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Info</h2>
          {["name", "email", "address", "city", "zip"].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={field[0].toUpperCase() + field.slice(1)}
              value={(form as any)[field]}
              onChange={handleChange}
              className="w-full p-3 rounded-md shadow-inner bg-white text-sm text-gray-700 focus:outline-none"
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-[#e0e5ec] shadow-neumorphic rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
          <ul className="space-y-3 text-sm">
            
            {cartItems.length === 0 && (
              <li className="text-gray-500">Your cart is empty.</li>
            )}
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <hr className="my-4 border-gray-300" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-[#d1d9e6] hover:bg-gray-300 transition rounded-md py-2 font-medium text-gray-800 shadow-neumorphic-inner"
          >
            🛒 Place Order
          </button>
          
        </div>
      </div>
    </main>
  );
}
