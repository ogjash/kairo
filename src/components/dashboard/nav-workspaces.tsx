"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
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
import { IoMdFolderOpen } from "react-icons/io"
import { TbNotebook } from "react-icons/tb";


function WorkspaceFolder({ color }: { color: string }) {
  return <IoMdFolderOpen className="size-4 shrink-0" style={{ color }} />
}
function NotebookIcon({ color }: { color?: string | null }) {
  return (
    <TbNotebook
      className="size-4 shrink-0"
      style={{ color: color ?? "#94a3b8" }}
    />
  )
}

export function NavWorkspaces({
  workspaces,
}: {
  workspaces: {
    id: string
    name: string
    color: string
    url: string
    notebooks: {
      id: string
      name: string
      url: string
      color?: string | null
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

          {workspaces.length === 0 ? (
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/50" disabled>
                No workspaces yet
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
              workspaces.map((workspace) => (
                <Collapsible key={workspace.id}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href={workspace.url}>
                        <WorkspaceFolder color={workspace.color}/>
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
                          <SidebarMenuSubItem key={notebook.id}>
                            <SidebarMenuSubButton asChild>
                              <a href={notebook.url}>
                                <NotebookIcon color={notebook.color} />
                                <span>{notebook.name}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))
            )}
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}
