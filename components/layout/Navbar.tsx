"use client";
import Link from "next/link";
import VoiceSearch from "../shared/VoiceSearch";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const handleVoiceSearch = (query: string) => {
    // Route to products page with voice search query
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-[#e0e5ec] shadow-neumorphic">
      <Link href="/" className="text-xl font-bold text-gray-800">
        📱 MobileZone
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/products">
          <span className="text-gray-700 hover:underline">Products</span>
        </Link>
        <Link href="/cart">
          <span className="text-gray-700 hover:underline">Cart</span>
        </Link>
        <Link href="/wishlist">
          <span className="text-gray-700 hover:underline">Wishlist</span>
        </Link>
        <Link href="/register">
          <span className="text-gray-700 hover:underline">Register</span>
        </Link>
        {currentUser && (
          <Link href="/profile" className="text-gray-700 hover:underline">
            My Profile
          </Link>
        )}

        {currentUser ? (
          <>
            <span className="text-sm text-gray-700">
              Hi, {currentUser.name}
            </span>
            <Link
              href="/orders"
              className="text-sm text-gray-700 hover:underline"
            >
              Orders
            </Link>
            <button
              onClick={logout}
              className="text-sm text-gray-700 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="ml-3 text-sm text-gray-700 hover: underline"
          >
            Login
          </Link>
        )}
        <VoiceSearch onSearch={handleVoiceSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
