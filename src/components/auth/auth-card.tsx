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
    <Card className="dark rounded-3xl sm:rounded-4xl ring-0 w-full max-w-xl bg-gray-700/30 backdrop-blur-sm border border-gray-500/40 p-5 sm:p-10 md:p-16 lg:p-20">
      <CardHeader className="p-0">
        <CardTitle className="flex justify-center text-xl sm:text-2xl font-semibold">{title}</CardTitle>
        <CardDescription className="flex justify-center py-2 text-center text-sm sm:text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 mt-4 sm:mt-6">
        {children}
        
        <span className="flex items-center justify-center text-muted-foreground my-4 sm:my-6">or</span>
        
        <div className="flex flex-col gap-2">
          <Button type="button" onClick={() => signIn("google")} className="w-full bg-transparent hover:bg-border border border-border text-foreground p-4 sm:p-5 gap-2 sm:gap-3 text-sm sm:text-base">
            <FcGoogle className="size-6"/>
            {oauthText} with Google
          </Button>
          <Button type="button" onClick={() => signIn("github")} className="w-full bg-transparent hover:bg-border border border-border text-foreground p-4 sm:p-5 gap-2 sm:gap-3 text-sm sm:text-base">
            <FaGithub className="size-6"/>
            {oauthText} with Github
          </Button>
        </div>

        <div className="mt-4 sm:mt-6 text-center text-sm text-muted-foreground">
          {footerText}{" "}
          <Link href={footerLink} className="underline underline-offset-4 hover:text-foreground">
            {footerLinkText}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
