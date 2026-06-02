"use client"

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard } from "./auth-card";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { getUserSpaces } from "@/lib/dashboard/space-actions";


const schema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormFields = z.infer<typeof schema>;


export function SignUpForm() {

  const router = useRouter();

  const { 
      register,
      handleSubmit, 
      formState: { errors, isSubmitting } 
    } = useForm<FormFields>({
      resolver: zodResolver(schema)
    });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { error } = 
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

    if (error) {
      toast.error(error.message);
      return;
    }

    // Get the session after signup
    const { data: session } = await authClient.getSession();
    
    if (!session?.user?.id) {
      toast.error("Failed to get user session");
      return;
    }

    // Fetch user's spaces (the default space was already created by the auth hook)
    const spaces = await getUserSpaces(session.user.id);
    const defaultSpace = spaces.find(s => s.isDefault) || spaces[0];

    if (!defaultSpace) {
      toast.error("No space found");
      return;
    }

    toast.success("Account created");
    router.push(`/s/${defaultSpace.id}`);
  };

  return (
    <AuthCard
      title="Welcome to Kairo"
      description="Enter your details below to create your account"
      footerText="Already have an account?"
      footerLink="/sign-in"
      footerLinkText="Sign in"
      oauthText="Sign up"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className="p-5 focus-visible:ring-0 focus-visible:border-blue-500"
            />
            {errors.name && <div className="text-red-400">{errors.name.message}</div>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="your@email.com"
              className="p-5 focus-visible:ring-0 focus-visible:border-blue-500"
            />
            {errors.email && <div className="text-red-400">{errors.email.message}</div>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              {...register("password")}
              type="password"
              className="p-5 focus-visible:ring-0 focus-visible:border-blue-500"
            />
            {errors.password && <div className="text-red-400">{errors.password.message}</div>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input 
              {...register("confirmPassword")} 
              type="password"
              className="p-5 focus-visible:ring-0 focus-visible:border-blue-500"
            />
            {errors.confirmPassword && <div className="text-red-400">{errors.confirmPassword.message}</div>}
          </div>
          <div className="w-full flex items-center justify-center pt-2">
            <Button type="submit" className="w-full p-6 text-lg bg-[#71B2FF] hover:bg-[#5b8ac6] disabled:bg-[#43618b]">
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </div>
        </div>
      </form>
    </AuthCard>
  );
}
