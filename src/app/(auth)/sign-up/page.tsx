"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    setLoading(true);
    await authClient.signUp.email({
      name,
      email,
      password,
    }, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        setLoading(false);
      }
    });
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <Card className="dark rounded-4xl ring-0 w-full max-w-xl bg-[#222838] p-20">
      <CardHeader>
        <CardTitle className="flex justify-center text-2xl">Create an account</CardTitle>
        <CardDescription className="flex justify-center px-auto py-3 text-center">
          Enter your details below to create your Kairo account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="p-5"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                className="p-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input 
                id="confirm-password" 
                type="password"
                className="p-5"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>
            <div className="w-full flex items-center justify-center pt-2">
              <Button type="submit" className="w-full p-6 text-lg" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </div>
            <span className="flex items-center justify-center text-muted-foreground">or</span>
            <div className="flex flex-col gap-2">
              <Button type="button" onClick={() => handleSocialSignUp("google")} className="w-full bg-transparent border border-border text-foreground p-5">
                <FcGoogle className="size-6"/>
                Sign up with Google
              </Button>
              <Button type="button" onClick={() => handleSocialSignUp("github")} className="w-full bg-transparent border-border text-foreground p-5">
                <FaGithub className="size-6"/>
                Sign up with Github
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline underline-offset-4 hover:text-foreground">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}