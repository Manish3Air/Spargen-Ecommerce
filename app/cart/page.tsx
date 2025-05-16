"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";


export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  

  if (cartItems.length === 0) {
    return (
      <main className="p-6 min-h-screen flex items-center justify-center bg-[#e0e5ec]">
        <p className="text-gray-600 text-lg">🛒 Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="p-6 bg-[#e0e5ec] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🛍️ Your Cart
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {cartItems.map(({ id, name, price, quantity, image }) => (
          <div
            key={id}
            className="flex flex-col sm:flex-row items-center gap-6 bg-[#e0e5ec] shadow-neumorphic rounded-2xl p-5 transition hover:shadow-lg"
          >
            <img
              src={image}
              alt={name}
              className="w-24 h-24 object-contain rounded-xl bg-white shadow-inner"
            />

            <div className="flex-1 w-full">
              <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
              <p className="text-sm text-gray-500">${price.toFixed(2)}</p>

              <div className="flex items-center gap-3 mt-3">
                <label htmlFor={`qty-${id}`} className="text-sm">
                  Qty:
                </label>
                <input
                  id={`qty-${id}`}
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => updateQuantity(id, +e.target.value)}
                  className="w-16 px-2 py-1 rounded-md shadow-inner bg-white border border-gray-300 text-sm text-center"
                />
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => removeFromCart(id)}
                className="text-sm font-medium text-red-500 hover:underline"
              >
                ❌ Remove
              </button>
            </div>
          </div>
        ))}

        <div className="text-right mt-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Total: ${totalPrice.toFixed(2)}
          </h2>
          <button className="mt-4 w-full bg-[#d1d9e6] hover:bg-gray-300 transition rounded-md py-2 font-medium text-gray-800 shadow-neumorphic-inner">
          <Link href="/checkout">
            <span className="text-gray-700 hover:underline">Checkout</span>
          </Link>
          </button>
        </div>
      </div>
    </main>
  );
}
