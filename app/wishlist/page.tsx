"use client";

import React from "react";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <main className="p-6 bg-[#e0e5ec] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        💖 Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-600 text-lg">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {wishlist.map(({ id, name, price, image }) => (
            <div
              key={id}
              className="bg-[#e0e5ec] shadow-neumorphic rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <img
                src={image}
                alt={name}
                className="w-32 h-32 object-contain mb-3 rounded-xl bg-white shadow-inner"
              />
              <h2 className="text-lg font-semibold text-gray-800 truncate w-full">{name}</h2>
              <p className="text-sm text-gray-500 mb-3">${price.toFixed(2)}</p>

              <button
                onClick={() => removeFromWishlist(id)}
                className="text-red-500 text-sm font-medium hover:underline transition"
              >
                ❌ Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
