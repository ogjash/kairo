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

    const { data: session } = await authClient.getSession();
    
    if (!session?.user?.id) {
      toast.error("Failed to get user session");
      return;
    }

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
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className="p-4 sm:p-5 focus-visible:ring-0 focus-visible:border-blue-400"
            />
            {errors.name && <div className="text-red-400">{errors.name.message}</div>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="your@email.com"
              className="p-4 sm:p-5 focus-visible:ring-0 focus-visible:border-blue-400"
            />
            {errors.email && <div className="text-red-400">{errors.email.message}</div>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              type="password"
              className="p-4 sm:p-5 focus-visible:ring-0 focus-visible:border-blue-400"
            />
            {errors.password && <div className="text-red-400">{errors.password.message}</div>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input 
              {...register("confirmPassword")} 
              type="password"
              className="p-4 sm:p-5 focus-visible:ring-0 focus-visible:border-blue-400"
            />
            {errors.confirmPassword && <div className="text-red-400">{errors.confirmPassword.message}</div>}
          </div>
          <div className="w-full flex items-center justify-center pt-2">
            <Button type="submit" className="w-full p-4 sm:p-5 md:p-6 text-base sm:text-lg bg-[#83a0fd] hover:bg-[#9bb3ff] disabled:bg-[#95a4c9]">
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </div>
        </div>
      </form>
    </AuthCard>
  );
}
