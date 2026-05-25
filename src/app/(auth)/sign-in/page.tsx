"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await authClient.signIn.email({
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

  const handleSocialSignIn = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <Card className="dark rounded-4xl ring-0 w-full max-w-xl bg-[#222838] p-20">
      <CardHeader>
        <CardTitle className="flex justify-center text-2xl">Welcome back to Kairo</CardTitle>
        <CardDescription className="flex justify-center px-auto py-3 text-center">
          Enter your email below to Sign In to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignIn}>
          <div className="flex flex-col gap-6">
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
                id="password" 
                type="password"
                className="p-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <Button type="submit" className="w-full p-6 text-lg" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
            <span className="flex items-center justify-center text-muted-foreground">or</span>
            <div className="flex flex-col gap-2">
              <Button type="button" onClick={() => handleSocialSignIn("google")} className="w-full bg-transparent border border-border text-foreground p-5">
                <FcGoogle className="size-6"/>
                Sign In with Google
              </Button>
              <Button type="button" onClick={() => handleSocialSignIn("github")} className="w-full bg-transparent border-border text-foreground p-5">
                <FaGithub className="size-6"/>
                Sign In with Github
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4 hover:text-foreground">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}