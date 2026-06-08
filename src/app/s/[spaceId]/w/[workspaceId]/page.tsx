import { notFound } from "next/navigation"
import Link from "next/link"
import { db } from "@/lib/db"
import { workspaces } from "@/lib/db/schema/workspaces"
import { eq, and } from "drizzle-orm"
import PageHeader from "@/components/dashboard/page-header"
import { TbNotebook } from "react-icons/tb"

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ spaceId: string; workspaceId: string }>
}) {
  const { spaceId, workspaceId } = await params

  const workspace = await db.query.workspaces.findFirst({
    where: and(
      eq(workspaces.id, workspaceId),
      eq(workspaces.spaceId, spaceId)
    ),
    with: {
      notebooks: {
        orderBy: (notebooks, { desc }) => [desc(notebooks.createdAt)],
      },
    },
  })

  if (!workspace) notFound()

  return (
    <div>
      <PageHeader title={workspace.name} />

      <div className="mt-10">
        {workspace.notebooks.length === 0 ? (
          <p className="text-muted-foreground">
            No notebooks in this workspace yet. Use the + button in the sidebar
            to create one.
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {workspace.notebooks.map((notebook) => (
              <li key={notebook.id}>
                <Link
                  href={`/s/${spaceId}/w/${workspaceId}/n/${notebook.id}`}
                  className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/50"
                >
                  <TbNotebook
                    className="size-5 shrink-0"
                    style={{ color: notebook.color ?? "#94a3b8" }}
                  />
                  <span className="font-medium">{notebook.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
