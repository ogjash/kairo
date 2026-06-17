import { AppSidebar } from "@/components/dashboard/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/dashboard/inset-header"

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { spaces } from "@/lib/db/schema/spaces";
import { eq } from "drizzle-orm";

export default async function SpaceLayout({ 
  children,
  params
 }: { 
  children: React.ReactNode
  params: Promise<{ spaceId: string }>
}) {

  const { spaceId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if(!session){
    redirect("/sign-in");
  }

  const space = await db.query.spaces.findFirst({
    where: eq(spaces.id, spaceId),
  });

  if(!space || space.ownerId !== session.user.id){
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar spaceId={spaceId} />

      <Header />
      
      <SidebarInset className="mt-12">
        <div className="flex-1 overflow-y-auto py-6 sm:py-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-sidebar/70">
          {children}
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}