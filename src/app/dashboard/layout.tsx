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

export default function SpaceLayout({ 
  children,
  params
 }: { 
  children: React.ReactNode
  params: {spaceId: string}
}) {
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