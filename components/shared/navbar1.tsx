"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export const Navbar = () => {
  const [user, setUser] = useState<{ role: "STUDENT" | "TUTOR" | "ADMIN" } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <header className="border-b px-5">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          SkillBridge 🎓
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/tutors">Tutors</Link>
          <Link href="/categories">Categories</Link>
        

          {/* User Authentication */}
          {!user && (
            <>
              <Link href="/login">Login</Link>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}

          {/* Student Menu */}
          {user?.role === "STUDENT" && (
            <>
              <Link href="/dashboard">Dashboard</Link>
             
              <Button
                variant="outline"
                 className="bg-red-500"
                onClick={() => {
                  localStorage.clear();
                  setUser(null);
                  location.href = "/login"; // Logout redirect
                }}
              >
                Logout
              </Button>
            </>
          )}

          {/* Tutor Menu */}
          {user?.role === "TUTOR" && (
            <>
              <Link href="/tutor/dashboard">Dashboard</Link>
            
              <Button
                variant="outline"
                 className="bg-red-500"
                onClick={() => {
                  localStorage.clear();
                  setUser(null);
                  location.href = "/login";
                }}
              >
                Logout
              </Button>
            </>
          )}

          {/* Admin Menu */}
          {user?.role === "ADMIN" && (
            <>
              <Link href="/admin">Admin</Link>
             
              <Button
                variant="destructive"
                className="bg-red-500"
                onClick={() => {
                  localStorage.clear();
                  setUser(null);
                  location.href = "/login";
                }}
              >
                Logout
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>SkillBridge 🎓</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">
              <Link href="/">Home</Link>
              <Link href="/tutors">Tutors</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/blog">Blog</Link>

              {!user && (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/register">Register</Link>
                </>
              )}

              {user?.role === "STUDENT" && (
                <>
                  <Link href="/dashboard">Dashboard</Link>
                 
                  <Button
                    variant="outline"
                    onClick={() => {
                      localStorage.clear();
                      setUser(null);
                      location.href = "/login";
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}

              {user?.role === "TUTOR" && (
                <>
                  <Link href="/tutor/dashboard">Dashboard</Link>
                 
                  <Button
                    variant="outline"
                    onClick={() => {
                      localStorage.clear();
                      setUser(null);
                      location.href = "/login";
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}

              {user?.role === "ADMIN" && (
                <>
                  <Link href="/admin">Admin</Link>
                 
                  <Button
                    variant="destructive"
                    onClick={() => {
                      localStorage.clear();
                      setUser(null);
                      location.href = "/login";
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
