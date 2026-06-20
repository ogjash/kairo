"use client"

import { useState } from "react"

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

import { FaAngleRight, FaPlus } from "react-icons/fa6"
import { IoFolderOpenOutline } from "react-icons/io5"
import { TbNotebook } from "react-icons/tb"
import { FiInbox } from "react-icons/fi"
import Link from "next/link"

import { CreateWorkspaceDialog } from "./create-workspace-dialog"
import { CreateNotebookDialog } from "./create-notebook-dialog"


function WorkspaceIcon({ isDefault, color }: { isDefault: boolean; color: string }) {
  if (isDefault) {
    return <FiInbox className="size-4 shrink-0 text-sidebar-foreground/70" />
  }
  return <IoFolderOpenOutline className="size-4 shrink-0" style={{ color }} />
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
  spaceId,
  workspaces,
}: {
  spaceId: string
  workspaces: {
    id: string
    name: string
    isDefault: boolean
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
  const [workspaceDialogOpen, setWorkspaceDialogOpen] = useState(false)
  const [notebookDialogOpen, setNotebookDialogOpen] = useState(false)
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null)

  function openNotebookDialog(workspaceId: string) {
    setActiveWorkspaceId(workspaceId)
    setNotebookDialogOpen(true)
  }

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <Collapsible defaultOpen={true}>
            <SidebarMenuItem>
              <SidebarMenuButton className="group flex items-center gap-2 cursor-pointer">
                Workspaces
              </SidebarMenuButton>

              <SidebarMenuAction
                onClick={() => setWorkspaceDialogOpen(true)}
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
              {workspaces.map((workspace) => (
                <Collapsible key={workspace.id}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={workspace.url}>
                        <WorkspaceIcon
                          isDefault={workspace.isDefault}
                          color={workspace.color}
                        />
                        <span>{workspace.name}</span>
                      </Link>
                    </SidebarMenuButton>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction
                        className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                        showOnHover
                      >
                        <FaAngleRight />
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <SidebarMenuAction
                      showOnHover
                      onClick={() => openNotebookDialog(workspace.id)}
                    >
                      <FaPlus />
                    </SidebarMenuAction>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {workspace.notebooks.length === 0 ? (
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton className="italic !text-xs text-sidebar-foreground/50" aria-disabled>
                              No notebooks yet
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ) : (
                          workspace.notebooks.map((notebook) => (
                            <SidebarMenuSubItem key={notebook.id}>
                              <SidebarMenuSubButton asChild>
                                <Link href={notebook.url}>
                                  <NotebookIcon color={notebook.color} />
                                  <span>{notebook.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))
                        )}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>

      <CreateWorkspaceDialog
        open={workspaceDialogOpen}
        onOpenChange={setWorkspaceDialogOpen}
        spaceId={spaceId}
      />

      <CreateNotebookDialog
        open={notebookDialogOpen}
        onOpenChange={setNotebookDialogOpen}
        spaceId={spaceId}
        workspaceId={activeWorkspaceId}
      />
    </>
  )
}
