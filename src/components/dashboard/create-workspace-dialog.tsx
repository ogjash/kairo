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
import { createWorkspace } from "@/lib/dashboard/workspace-actions"

interface CreateWorkspaceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  spaceId: string
  onSuccess?: () => void
}

export function CreateWorkspaceDialog({
  open,
  onOpenChange,
  spaceId,
  onSuccess,
}: CreateWorkspaceDialogProps) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [color, setColor] = useState(DEFAULT_COLORS[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  function resetForm() {
    setName("")
    setColor(DEFAULT_COLORS[0])
  }

  async function handleCreateWorkspace() {
    if (!name.trim()) return
    setIsSubmitting(true)
    try {
      const result = await createWorkspace(spaceId, name.trim(), color)
      if (result.success) {
        onOpenChange(false)
        resetForm()
        router.refresh()
        onSuccess?.()
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
  )
}
