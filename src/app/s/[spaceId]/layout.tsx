import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { NavActions } from "@/components/dashboard/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Header from "@/components/dashboard/header"

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
  params: {spaceId: string}
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
      <AppSidebar />

      <Header />
      

      <SidebarInset className="md:peer-data-[variant=inset]:mt-12">
        <header className="flex h-14 shrink-0 items-center gap-2 px-4 mt-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">
                  Dashboard Overview
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center absolute right-4 pointer-events-auto gap-2">
            <SidebarTrigger className="text-sidebar-foreground md:hidden" />
            <NavActions />
        </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}