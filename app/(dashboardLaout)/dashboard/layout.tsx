"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  Menu,
  X,
} from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.replace("/login");
      return;
    }

    const parsedUser = JSON.parse(user);

    if (parsedUser.role !== "STUDENT") {
      router.replace("/unauthorized");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size={48} text="Dashboard loading"/>
      </div>
    );
  }

  const navItem = (href: string, label: string, Icon: any) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
          ${
            active
              ? "bg-indigo-600 text-white shadow"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Mobile Top Bar */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
        <span className="font-bold">SkillBridge 🎓</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Overlay (mobile) */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 z-50
          h-screen w-64
          bg-gradient-to-b from-gray-900 to-gray-800 text-white p-5
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
        >
          {/* Brand */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-2xl font-extrabold">
              SkillBridge 🎓
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav */}
          <nav className="space-y-2">
            {navItem("/dashboard", "Dashboard", LayoutDashboard)}
            {navItem("/dashboard/bookings", "My Bookings", CalendarCheck)}
            {navItem("/dashboard/profile", "Profile", User)}
          </nav>

          {/* Footer */}
          <div className="absolute bottom-4 text-xs text-gray-400">
            Student Panel
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="bg-white rounded-2xl shadow-sm p-4 lg:p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
