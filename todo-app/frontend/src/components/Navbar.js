'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
        ✅ Todo App
      </Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link
              href="/todos"
              className="text-sm text-gray-600 hover:text-blue-600 font-medium transition"
            >
              My Todos
            </Link>
            <span className="text-sm text-gray-400">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-600 font-medium transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition">
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 font-medium transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
