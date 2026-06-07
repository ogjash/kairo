"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/auth-client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FaChevronDown } from "react-icons/fa";
import { LuCog } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";

import Avatar from "boring-avatars";

type Space = {
  id: string
  name: string
  avatarUrl: string | null
  isDefault: boolean
}

export function SpaceSwitcher({ 
  spaces,
  currentSpaceId,
}: { 
  spaces: Space[]
  currentSpaceId: string
}) {
  const router = useRouter()
  const activeSpace = spaces.find((s) => s.id === currentSpaceId) ?? spaces[0] ?? null

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  }

  const handleAddSpace = async () => {
    console.log("Add new space");
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-2 cursor-pointer">
              <div className="flex items-center justify-center overflow-hidden rounded-sm">
                {activeSpace?.avatarUrl ? (
                  <img src={activeSpace.avatarUrl} alt={activeSpace.name} className="h-full w-full object-cover" />
                ) : (
                  <Avatar name={activeSpace?.id || "myspace"} colors={["#0a0310", "#49007e", "#ff005b", "#ff7d10", "#ffb238"]} variant="marble" square size={80}/>
                )}
              </div>
              <span className="truncate font-medium">{activeSpace?.name || "My Space"}</span>
              <FaChevronDown className="opacity-50" />
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
                className={`gap-2 p-2 cursor-pointer ${activeSpace?.id === space.id ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`}
                onClick={() => {
                  if (space.id !== currentSpaceId){
                    router.push(`/s/${space.id}`)
                  }
                }}
              >
                <div className="flex items-center justify-center overflow-hidden rounded-sm">
                  {space.avatarUrl ? (
                    <img src={space.avatarUrl} alt={space.name} className="h-full w-full object-cover" />
                  ) : (
                    <Avatar name={space.id} colors={["#0a0310", "#49007e", "#ff005b", "#ff7d10", "#ffb238"]} variant="marble" square size={80}/>
                  )}
                </div>
                {space.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem 
              className="gap-2 p-2 text-xs text-sidebar-foreground/50 cursor-pointer hover:bg-accent/50"
              onClick={handleAddSpace}
            >
              <FaPlus className="size-3 text-sidebar-foreground/50"/>
              Add Space
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
              <LuCog className="size-4 text-sidebar-foreground/50"/>
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              variant="destructive"
              className="gap-2 p-2 cursor-pointer" 
              onClick={handleSignOut}
            >
              <HiOutlineLogout className="size-4 text-sidebar-foreground/50"/>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}