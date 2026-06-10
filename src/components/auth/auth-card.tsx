"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth/auth-client";

const signIn = async (provider: "github" | "google") => {
  const data = await authClient.signIn.social({
    provider,
    callbackURL: "/dashboard"
  });
  return data;
};

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
  oauthText?: string;
}

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLink, 
  footerLinkText,
  oauthText,
}: AuthCardProps) {
  return (
    <Card className="dark rounded-4xl ring-0 w-full max-w-xl bg-[#252525] p-20">
      <CardHeader>
        <CardTitle className="flex justify-center text-2xl">{title}</CardTitle>
        <CardDescription className="flex justify-center px-auto py-3 text-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        
        <span className="flex items-center justify-center text-muted-foreground my-6">or</span>
        
        <div className="flex flex-col gap-2">
          <Button type="button" onClick={() => signIn("google")} className="w-full bg-transparent hover:bg-border border border-border text-foreground p-5">
            <FcGoogle className="size-6"/>
            {oauthText} with Google
          </Button>
          <Button type="button" onClick={() => signIn("github")} className="w-full bg-transparent hover:bg-border  border-border text-foreground p-5">
            <FaGithub className="size-6"/>
            {oauthText} with Github
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {footerText}{" "}
          <Link href={footerLink} className="underline underline-offset-4 hover:text-foreground">
            {footerLinkText}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
