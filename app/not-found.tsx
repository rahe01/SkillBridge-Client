"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-9xl font-extrabold text-red-600 animate-pulse">404</h1>
        <h2 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
          Oops! Page Not Found
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
          Don't worry, we will help you find your way!
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-8 px-8 py-4 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition"
        >
          Go Back Home
        </button>

        <div className="mt-12 flex justify-center gap-4">
          <span className="text-gray-400">💡 Tip:</span>
          <p className="text-gray-600 dark:text-gray-400">
            Check the URL or use the navigation menu to find what you need.
          </p>
        </div>
      </div>
    </div>
  );
}
