"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";


import { tutorRoutes } from "@/routes/tutorRoutes";
import { studentRoutes } from "@/routes/studentRoutes";
import { adminRoutes } from "@/routes/adminRoutes";

type Role = "admin" | "tutor" | "student";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: Role };
}) {
  let routes : any[] = [];

  switch (user.role) {
    case "admin":
      routes = adminRoutes;
      break;
    case "tutor":
      routes = tutorRoutes;
      break;
    case "student":
      routes = studentRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item:any) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
