"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

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
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "../ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { FaAngleRight, FaPlus } from "react-icons/fa6"
import { IoFolderOpenOutline } from "react-icons/io5"
import { TbNotebook } from "react-icons/tb"
import { FiInbox } from "react-icons/fi"
import { createWorkspace, createNotebook } from "@/lib/dashboard/workspace-actions"
import Link from "next/link"


const WORKSPACE_COLORS = ["#6366f1", "#ec4899", "#22c55e", "#f59e0b", "#06b6d4"]
const NOTEBOOK_COLORS = ["#94a3b8", "#6366f1", "#ec4899", "#22c55e", "#f59e0b"]

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

function ColorPicker({
  colors,
  value,
  onChange,
}: {
  colors: string[]
  value: string
  onChange: (color: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className="size-7 rounded-full border-2 transition-transform hover:scale-110"
          style={{
            backgroundColor: c,
            borderColor: value === c ? "var(--foreground)" : "transparent",
          }}
          aria-label={`Select color ${c}`}
        />
      ))}
    </div>
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
  const router = useRouter()
  const [workspaceDialogOpen, setWorkspaceDialogOpen] = useState(false)
  const [notebookDialogOpen, setNotebookDialogOpen] = useState(false)
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [color, setColor] = useState(WORKSPACE_COLORS[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  function resetForm() {
    setName("")
    setColor(WORKSPACE_COLORS[0])
    setActiveWorkspaceId(null)
  }

  async function handleCreateWorkspace() {
    if (!name.trim()) return
    setIsSubmitting(true)
    try {
      const result = await createWorkspace(spaceId, name.trim(), color)
      if (result.success) {
        setWorkspaceDialogOpen(false)
        resetForm()
        router.refresh()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  function openNotebookDialog(workspaceId: string) {
    setActiveWorkspaceId(workspaceId)
    setName("")
    setColor(NOTEBOOK_COLORS[0])
    setNotebookDialogOpen(true)
  }

  async function handleCreateNotebook() {
    if (!name.trim() || !activeWorkspaceId) return
    setIsSubmitting(true)
    try {
      const result = await createNotebook(
        spaceId,
        activeWorkspaceId,
        name.trim(),
        color
      )
      if (result.success && result.notebook) {
        setNotebookDialogOpen(false)
        resetForm()
        router.refresh()
        router.push(
          `/s/${spaceId}/w/${activeWorkspaceId}/n/${result.notebook.id}`
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <Collapsible>
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
                            <SidebarMenuSubButton className="pointer-events-none text-sidebar-foreground/50 italic text-xs">
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

      <Dialog open={workspaceDialogOpen} onOpenChange={setWorkspaceDialogOpen}>
        <DialogContent className="w-full sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>New workspace</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 px-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="workspace-name">Name</Label>
              <Input
                id="workspace-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Computer Science"
                onKeyDown={(e) => e.key === "Enter" && handleCreateWorkspace()}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Color</Label>
              <ColorPicker
                colors={WORKSPACE_COLORS}
                value={color}
                onChange={setColor}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateWorkspace}
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? "Creating…" : "Create workspace"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={notebookDialogOpen} onOpenChange={setNotebookDialogOpen}>
        <DialogContent className="w-full sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>New notebook</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 px-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="notebook-name">Name</Label>
              <Input
                id="notebook-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Organic Chemistry"
                onKeyDown={(e) => e.key === "Enter" && handleCreateNotebook()}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Color</Label>
              <ColorPicker
                colors={NOTEBOOK_COLORS}
                value={color}
                onChange={setColor}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateNotebook}
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? "Creating…" : "Create notebook"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
