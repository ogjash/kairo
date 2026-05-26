"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard } from "./auth-card";

export function SignUpForm() {
  return (
    <AuthCard
      title="Welcome to Kairo"
      description="Enter your details below to create your account"
      footerText="Already have an account?"
      footerLink="/sign-in"
      footerLinkText="Sign in"
      oauthText="Sign up"
    >
      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="p-5"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="p-5"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              className="p-5"
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input 
              id="confirm-password" 
              type="password"
              className="p-5"
              required 
            />
          </div>
          <div className="w-full flex items-center justify-center pt-2">
            <Button type="submit" className="w-full p-6 text-lg">
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </AuthCard>
  );
}
