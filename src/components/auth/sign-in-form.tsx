"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"; 
import { zodResolver } from '@hookform/resolvers/zod'; 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AuthCard } from "./auth-card";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export function SignInForm() {

  const { 
    register,
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormFields>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
  }

  return (
    <AuthCard
      title="Welcome back to Kairo"
      description="Enter your email below to Sign In to your account"
      footerText="Don't have an account?"
      footerLink="/sign-up"
      footerLinkText="Sign up"
      oauthText="Sign In"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="your@email.com"
              className="p-5"
            />
            {errors.email && <div className="text-red-400">{errors.email.message}</div>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-muted-foreground"
              >
                Forgot your password?
              </Link>
            </div>
            <Input 
              {...register("password")}
              id="password" 
              type="password"
              placeholder="Must have at least 8 characters"
              className="p-5"
            />
            {errors.password && <div className="text-red-400">{errors.password.message}</div>}
          </div>
          <div className="w-full flex items-center justify-center">
            <Button disabled={isSubmitting} type="submit" className="w-full p-6 text-lg bg-[#71B2FF] hover:bg-[#5b8ac6] disabled:bg-[#43618b]">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </div>
      </form>
    </AuthCard>
  );
}
