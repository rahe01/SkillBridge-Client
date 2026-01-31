"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Role = "admin" | "tutor" | "student";

interface DashboardLayoutProps {
  admin: React.ReactNode;
  tutor: React.ReactNode;
  student: React.ReactNode;
}

export default function DashboardLayout({ admin, tutor, student }: DashboardLayoutProps) {
  const [userInfo, setUserInfo] = useState<{ role: Role } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); 
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
       
        const role: Role = parsed.role.toLowerCase() as Role;
        setUserInfo({ role });
      } catch (err) {
        console.error("Failed to parse user info from localStorage:", err);
        setUserInfo(null);
      }
    }
  }, []);

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const role = userInfo.role;

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
      
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

       
        <div className="flex flex-1 flex-col gap-4 p-4">
          {role === "admin" ? admin : role === "tutor" ? tutor : student}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
