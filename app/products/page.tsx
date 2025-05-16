"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch {
        setProducts([]);
      }
    }
  }, []);

  return (
    <main className="p-6 bg-[#e0e5ec] min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🛍️ Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded p-4 flex flex-col items-center"
            >

              
            <div className="relative w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-contain mb-2"
              />
              {isWishlisted(product.id) && (
                <span className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded-md shadow-md">
                  ❤️
                </span>
              )}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
              

              {/* 🛒 Add to Cart */}
              <div className=" flex justify-center items-center gap-4">
              <button
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className=" bg-[#d1d9e6] hover:bg-gray-300 px-4 py-2 rounded font-medium text-sm text-black hover:scale-105 transition"
              >
                🛒 Add to Cart
              </button>

              {/* 💖 Wishlist Toggle */}
              <button
                onClick={() =>
                  isWishlisted(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
                className=" bg-gradient-to-br from-[#d1d9e6] to-[#f0f4f8] rounded-lg px-4 py-2  text-center   hover:scale-105 transition  text-red-500 font-medium text-sm "
              >
                {isWishlisted(product.id)
                  ? "💔 Remove from Wishlist"
                  : "💖 Add to Wishlist"}
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
