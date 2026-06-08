import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { workspaces } from "@/lib/db/schema/workspaces"
import { notebooks } from "@/lib/db/schema/notebooks"
import { eq, and } from "drizzle-orm"
import PageHeader from "@/components/dashboard/page-header"

export default async function NotebookPage({
  params,
}: {
  params: Promise<{
    spaceId: string
    workspaceId: string
    notebookId: string
  }>
}) {
  const { spaceId, workspaceId, notebookId } = await params

  const notebook = await db.query.notebooks.findFirst({
    where: eq(notebooks.id, notebookId),
    with: {
      workspace: true,
    },
  })

  if (
    !notebook ||
    notebook.workspaceId !== workspaceId ||
    notebook.workspace.spaceId !== spaceId
  ) {
    notFound()
  }

  return (
    <div>
      <PageHeader title={notebook.name} />
      <p className="mt-10 text-muted-foreground">
        Upload documents and start taking notes here.
      </p>
    </div>
  )
}
