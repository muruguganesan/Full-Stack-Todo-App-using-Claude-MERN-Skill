import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center py-20">
      <div className="mb-6 text-6xl">✅</div>
      <h1 className="text-5xl font-bold mb-4 text-gray-800">Todo App</h1>
      <p className="text-gray-500 mb-10 text-lg">
        Stay organized. Built with Next.js + Express + MongoDB.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium transition"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-medium transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
