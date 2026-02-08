"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";


const signupSchema = z
  .object({
    role: z.enum(["STUDENT", "TUTOR"]),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false); 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "STUDENT",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      
    },
  });

  
  useEffect(() => {
    setMounted(true);
  }, []);

  const role = watch("role") || "STUDENT";

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      const payload: any = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      };

  

      await axios.post(
        "https://skill-bridge-server-three.vercel.app/api/auth/register",
        payload,
      );

     
      toast.success(
        data.role === "TUTOR"
          ? "Tutor profile created successfully! Please login"
          : "Student profile created successfully! Please login",
        { duration: 5000 }
      );

      
      setTimeout(() => {
        router.push("/login");
      }, 1000); 
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong", { duration: 5000 });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <>

      <Toaster position="top-right" />

      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Fill in the form below to create your account
            </p>
          </div>

          {/* Role */}
          <Field>
            <FieldLabel htmlFor="role">I am a</FieldLabel>
            <select {...register("role")} id="role" className="border rounded p-2">
              <option value="STUDENT">Student</option>
              <option value="TUTOR">Tutor</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </Field>

          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input {...register("name")} placeholder="John Doe" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input {...register("email")} type="email" placeholder="m@example.com" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input {...register("password")} type="password" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input {...register("confirmPassword")} type="password" />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </Field>

      

          <Field>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </Field>

          <FieldSeparator>Or continue with</FieldSeparator>

          <Field>
            <FieldDescription className="px-6 text-center">
              Already have an account? <Link href="/login">Login</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
