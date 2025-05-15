"use client";
import React, { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useCart }  from "@/context/CartContext";

// Inside your Home component:


const sampleProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 999.99,
    image: "https://via.placeholder.com/160",

    // image: "/products/iphone15pro.png",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    price: 899.99,
    image: "https://via.placeholder.com/160",

    // image: "/products/galaxys24.png",
  },
  {
    id: "3",
    name: "iPad Air",
    price: 599.99,
    image: "https://via.placeholder.com/160",

    // image: "/products/ipadair.png",
  },
  {
    id: "4",
    name: "OnePlus 12",
    price: 749.99,
    image: "https://via.placeholder.com/160",

    // image: "/products/oneplus12.png",
  },
];

export default function Home() {
  const [cart, setCart] = useState<string[]>([]);
  const  {addToCart}  = useCart();

  // const addToCart = (productId: string) => {
  //   setCart((prev) => [...prev, productId]);
   
  // };

  return (
    <main className="p-6 min-h-screen bg-[#e0e5ec]">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Welcome to MobileZone
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {sampleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </main>
  );
}
