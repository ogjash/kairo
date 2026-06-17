"use client"

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"; 
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner"; 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AuthCard } from "./auth-card";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { getUserSpaces } from "@/lib/dashboard/space-actions";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export function SignInForm() {

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
      await authClient.signIn.email({
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
      toast.error("No spaces found");
      return;
    }

    toast.success("Signed in successfully");
    
    router.push(`/s/${defaultSpace.id}`);
  };

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
        <div className="flex flex-col gap-4 sm:gap-6">
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
              type="password"
              placeholder="Must have at least 8 characters"
              className="p-4 sm:p-5 focus-visible:ring-0 focus-visible:border-blue-400"
            />
            {errors.password && <div className="text-red-400">{errors.password.message}</div>}
          </div>
          <div className="w-full flex items-center justify-center">
            <Button disabled={isSubmitting} type="submit" className="w-full p-4 sm:p-5 md:p-6 text-base sm:text-lg bg-[#83a0fd] hover:bg-[#9bb3ff] disabled:bg-[#95a4c9]">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </div>
      </form>
    </AuthCard>
  );
}
