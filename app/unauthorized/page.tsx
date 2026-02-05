import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-red-100">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          Sorry, you don’t have permission to view this page.
          Please contact the administrator or go back.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Go Home
          </Link>

          <Link
            href="/login"
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
