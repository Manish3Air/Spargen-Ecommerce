"use client";
import React from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Props {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

const ProductCard = ({ product, onAddToCart }: Props) => {
  return (
    <div className="bg-[#e0e5ec] shadow-neumorphic rounded-xl p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-40 h-40 object-contain mb-4 rounded-lg"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
      <button
        onClick={() =>
          onAddToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
          })
        }
        className="bg-[#e0e5ec] shadow-neumorphic hover:shadow-inner rounded-lg px-4 py-2 font-medium transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
