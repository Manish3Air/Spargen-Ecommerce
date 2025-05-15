'use client';
import Link from 'next/link';
import VoiceSearch from '../shared/VoiceSearch';
import { useRouter } from 'next/navigation';


const Navbar = () => {
  const router = useRouter();

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
        <Link href="/login">
          <span className="text-gray-700 hover:underline">Login</span>
        </Link>
        <VoiceSearch onSearch={handleVoiceSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
