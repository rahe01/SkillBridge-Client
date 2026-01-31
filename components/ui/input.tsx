"use client";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {}

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      {...props}
      className={cn(
        "w-full border rounded px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
    />
  );
}
