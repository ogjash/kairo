"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"

import { MoreHorizontalIcon, StarOffIcon, LinkIcon, ArrowUpRightIcon, Trash2Icon } from "lucide-react"
import { FaAngleRight } from "react-icons/fa6"

export function NavStarred({
  starred,
}: {
  starred: {
    id: string
    name: string
    url: string
    emoji: string
  }[]
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        <Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton className="group flex items-center gap-2 cursor-pointer">
              Starred
            </SidebarMenuButton>

            <CollapsibleTrigger asChild>
              <SidebarMenuAction
                className="right-1 flex items-center text-sidebar-accent-foreground/50 hover:text-sidebar-accent-foreground data-[state=open]:rotate-90"
                showOnHover
              >
                <FaAngleRight />
              </SidebarMenuAction>
            </CollapsibleTrigger>
          </SidebarMenuItem>
          <CollapsibleContent>
            
              {starred.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} title={item.name}>
                      <span>{item.emoji}</span>
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction
                        showOnHover
                        className="aria-expanded:bg-muted"
                      >
                        <MoreHorizontalIcon />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 rounded-lg"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem>
                        <StarOffIcon className="text-muted-foreground" />
                        <span>Unstar</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LinkIcon className="text-muted-foreground" />
                        <span>Copy Link</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ArrowUpRightIcon className="text-muted-foreground" />
                        <span>Open in New Tab</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2Icon className="text-muted-foreground" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <MoreHorizontalIcon
                  />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}
