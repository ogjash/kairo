"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/auth-client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ChevronDownIcon, Cog, LogOut } from "lucide-react"

import Avatar from "boring-avatars";

export function SpaceSwitcher({ spaces }: { spaces: any[] }) {
  const router = useRouter()
  const [activeSpace, setActiveSpace] = React.useState(spaces?.[0] || null)

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5 cursor-pointer">
              <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-sm">
                {activeSpace?.avatarUrl ? (
                  <img src={activeSpace.avatarUrl} alt={activeSpace.name} className="h-full w-full object-cover" />
                ) : (
                  <Avatar name={activeSpace?.id || "myspace"} colors={["#0a0310", "#49007e", "#ff005b", "#ff7d10", "#ffb238"]} variant="marble" square size={80}/>
                )}
              </div>
              <span className="truncate font-medium">{activeSpace?.name || "My Space"}</span>
              <ChevronDownIcon className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            {spaces.map((space) => (
              <DropdownMenuItem 
                key={space.id} 
                className="gap-2 p-2 cursor-pointer"
                onClick={() => setActiveSpace(space)}
              >
                <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-sm">
                  {space.avatarUrl ? (
                    <img src={space.avatarUrl} alt={space.name} className="h-full w-full object-cover" />
                  ) : (
                    <Avatar name={space.id} colors={["#0a0310", "#49007e", "#ff005b", "#ff7d10", "#ffb238"]} variant="marble" square size={80}/>
                  )}
                </div>
                {space.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
              <Cog className="size-4 text-sidebar-foreground/50"/>
              Settings
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="gap-2 p-2 cursor-pointer" 
              onClick={handleSignOut}
            >
              <LogOut className="size-4 text-sidebar-foreground/50"/>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}