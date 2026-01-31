"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = (allowedRoles: string[] = []) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(user);
    if (allowedRoles.length && !allowedRoles.includes(parsed.role)) {
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [router, allowedRoles]);

  return { loading };
};
