"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return <p className="p-6 text-center">Your cart is empty.</p>;
  }

  return (
    <main className="p-6 bg-[#e0e5ec] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4 max-w-4xl mx-auto">
        {cartItems.map(({ id, name, price, quantity, image }) => (
          <div
            key={id}
            className="flex items-center gap-4 p-4 bg-[#e0e5ec] shadow-neumorphic rounded-lg"
          >
            <img src={image} alt={name} className="w-24 h-24 object-contain rounded" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-gray-600">${price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-2">
                <label htmlFor={`qty-${id}`}>Qty:</label>
                <input
                  id={`qty-${id}`}
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => updateQuantity(id, +e.target.value)}
                  className="w-16 p-1 rounded border border-gray-300"
                />
              </div>
            </div>
            <button
              onClick={() => removeFromCart(id)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="text-right text-xl font-bold mt-6">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>
    </main>
  );
}
