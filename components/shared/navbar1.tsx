"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarProps {
  user?: {
    role: "STUDENT" | "TUTOR" | "ADMIN";
  } | null;
}

export const Navbar = ({ user }: NavbarProps) => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-xl font-bold">
          SkillBridge 🎓
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          <a href="/" className="nav-link">Home</a>
          <a href="/tutors" className="nav-link">Tutors</a>
          <a href="/categories" className="nav-link">Categories</a>

          {!user && (
            <>
              <a href="/login" className="nav-link">Login</a>
              <Button asChild>
                <a href="/register">Register</a>
              </Button>
            </>
          )}

          {user?.role === "STUDENT" && (
            <>
              <a href="/dashboard" className="nav-link">Dashboard</a>
              <a href="/dashboard/bookings" className="nav-link">My Bookings</a>
              <a href="/dashboard/profile" className="nav-link">Profile</a>
              <Button variant="outline">Logout</Button>
            </>
          )}

          {user?.role === "TUTOR" && (
            <>
              <a href="/tutor/dashboard" className="nav-link">Dashboard</a>
              <a href="/tutor/availability" className="nav-link">Availability</a>
              <a href="/tutor/profile" className="nav-link">Profile</a>
              <Button variant="outline">Logout</Button>
            </>
          )}

          {user?.role === "ADMIN" && (
            <>
              <a href="/admin" className="nav-link">Admin</a>
              <a href="/admin/users" className="nav-link">Users</a>
              <a href="/admin/bookings" className="nav-link">Bookings</a>
              <a href="/admin/categories" className="nav-link">Categories</a>
              <Button variant="destructive">Logout</Button>
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
              <a href="/">Home</a>
              <a href="/tutors">Tutors</a>
              <a href="/categories">Categories</a>

              {!user && (
                <>
                  <a href="/login">Login</a>
                  <a href="/register">Register</a>
                </>
              )}

              {user?.role === "STUDENT" && (
                <>
                  <a href="/dashboard">Dashboard</a>
                  <a href="/dashboard/bookings">My Bookings</a>
                  <a href="/dashboard/profile">Profile</a>
                  <Button variant="outline">Logout</Button>
                </>
              )}

              {user?.role === "TUTOR" && (
                <>
                  <a href="/tutor/dashboard">Dashboard</a>
                  <a href="/tutor/availability">Availability</a>
                  <a href="/tutor/profile">Profile</a>
                  <Button variant="outline">Logout</Button>
                </>
              )}

              {user?.role === "ADMIN" && (
                <>
                  <a href="/admin">Admin</a>
                  <a href="/admin/users">Users</a>
                  <a href="/admin/bookings">Bookings</a>
                  <a href="/admin/categories">Categories</a>
                  <Button variant="destructive">Logout</Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
