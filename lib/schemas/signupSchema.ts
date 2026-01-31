// lib/schemas/signupSchema.ts
import { z } from "zod";

// ----- Signup schema -----
export const signupSchema = z
  .object({
    role: z.enum(["STUDENT", "TUTOR"]),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    bio: z.string().optional(),
    pricePerHour: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), "Price must be a number"),
    experience: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), "Experience must be a number"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// TypeScript type inference
export type SignupFormData = z.infer<typeof signupSchema>;
