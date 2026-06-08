import Link from "next/link"
import PageHeader from "@/components/dashboard/page-header"
import { getAllNotebooksInSpace } from "@/lib/dashboard/sidebar-actions"
import { TbNotebook } from "react-icons/tb"

export default async function AllNotebooksPage({
  params,
}: {
  params: Promise<{ spaceId: string }>
}) {
  const { spaceId } = await params
  const notebooks = await getAllNotebooksInSpace(spaceId)

  return (
    <div>
      <PageHeader title="All Notebooks" />

      <div className="mt-10">
        {notebooks.length === 0 ? (
          <p className="text-muted-foreground">
            No notebooks yet. Create one from a workspace in the sidebar.
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {notebooks.map((notebook) => (
              <li key={notebook.id}>
                <Link
                  href={`/s/${spaceId}/w/${notebook.workspaceId}/n/${notebook.id}`}
                  className="flex flex-col gap-1 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <TbNotebook
                      className="size-5 shrink-0"
                      style={{ color: notebook.color ?? "#94a3b8" }}
                    />
                    <span className="font-medium">{notebook.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground pl-8">
                    {notebook.workspaceName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
