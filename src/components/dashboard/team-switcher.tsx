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

export function TeamSwitcher() {
  const router = useRouter()


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
              <div className="flex items-center justify-center overflow-hidden rounded-sm">
                <Avatar name="Juliette Gordon" colors={["#0a0310", "#49007e", "#ff005b", "#ff7d10", "#ffb238"]} variant="marble"  square size={80}/>
              </div>
              <span className="truncate font-medium">My Space</span>
              <ChevronDownIcon className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
              <Cog className="text-sidebar-foreground/50"/>
              Settings
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="gap-2 p-2 cursor-pointer" 
              onClick={handleSignOut}
            >
              <LogOut className="text-sidebar-foreground/50"/>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}