import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
        
        {/* Decorative blur */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-red-200 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-red-300 rounded-full blur-3xl opacity-30" />

        {/* Icon */}
        <div className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600">
          <ShieldAlert size={32} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.  
          This area is restricted to authorized users only.
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <a
            href="/"
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Go Home
          </a>

          <a
            href="/login"
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow"
          >
            Login
          </a>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-xs text-gray-400">
          SkillBridge 🎓 • Secure Area
        </p>
      </div>
    </div>
  );
}
