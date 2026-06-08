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
import { FaAngleRight, FaPlus } from "react-icons/fa6"
import { TbNotebook } from "react-icons/tb"

function NotebookIcon({ color }: { color?: string | null }) {
  return (
    <TbNotebook
      className="size-4 shrink-0"
      style={{ color: color ?? "#94a3b8" }}
    />
  )
}

export function NavStarred({
  starred,
}: {
  starred: {
    id: string
    name: string
    url: string
    color?: string | null
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

            <SidebarMenuAction
                className="right-6 flex items-center text-sidebar-accent-foreground/50 hover:text-sidebar-accent-foreground"
                showOnHover
              >
              <FaPlus />
            </SidebarMenuAction>

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

          {starred.length === 0 ? (
            <SidebarMenuItem>
              <SidebarMenuButton className="italic text-xs text-sidebar-foreground/50" disabled>
                Star notebooks to keep them close
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
              starred.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} title={item.name}>
                      <NotebookIcon color={item.color}/>
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
              ))
            )}
            
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}
