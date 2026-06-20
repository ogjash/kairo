"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ColorPicker, DEFAULT_COLORS } from "./color-picker"
import { createNotebook } from "@/lib/dashboard/workspace-actions"

interface CreateNotebookDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  spaceId: string
  workspaceId: string | null
  onSuccess?: (notebookId: string, workspaceId: string) => void
}

export function CreateNotebookDialog({
  open,
  onOpenChange,
  spaceId,
  workspaceId,
  onSuccess,
}: CreateNotebookDialogProps) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [color, setColor] = useState(DEFAULT_COLORS[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  function resetForm() {
    setName("")
    setColor(DEFAULT_COLORS[0])
  }

  async function handleCreateNotebook() {
    if (!name.trim() || !workspaceId) return
    setIsSubmitting(true)
    try {
      const result = await createNotebook(
        spaceId,
        workspaceId,
        name.trim(),
        color
      )
      if (result.success && result.notebook) {
        onOpenChange(false)
        resetForm()
        router.refresh()
        if (onSuccess) {
          onSuccess(result.notebook.id, workspaceId)
        } else {
          router.push(
            `/s/${spaceId}/w/${workspaceId}/n/${result.notebook.id}`
          )
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val)
      if (!val) resetForm()
    }}>
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
  )
}
