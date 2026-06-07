"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon, PlusIcon, MoreHorizontalIcon } from "lucide-react"
import { FaAngleRight } from "react-icons/fa6"

export function NavWorkspaces({
  workspaces,
}: {
  workspaces: {
    id: string
    name: string
    emoji: React.ReactNode
    notebooks: {
      id: string
      name: string
      url: string
      emoji: React.ReactNode
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton className="group flex items-center gap-2 cursor-pointer">
              Workspaces
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
              {workspaces.map((workspace) => (
                <Collapsible key={workspace.name}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <span>{workspace.emoji}</span>
                        <span>{workspace.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction
                        className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                        showOnHover
                      >
                        <ChevronRightIcon />
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <SidebarMenuAction showOnHover>
                      <PlusIcon
                      />
                    </SidebarMenuAction>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {workspace.notebooks.map((notebook) => (
                          <SidebarMenuSubItem key={notebook.name}>
                            <SidebarMenuSubButton asChild>
                              <a href="#">
                                <span>{notebook.emoji}</span>
                                <span>{notebook.name}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
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
