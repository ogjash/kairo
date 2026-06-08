import PageHeader from "@/components/dashboard/page-header"

export function PlaceholderPage({
  title,
  description = "Coming soon.",
}: {
  title: string
  description?: string
}) {
  return (
    <div>
      <PageHeader title={title} />
      <p className="mt-10 text-muted-foreground">{description}</p>
    </div>
  )
}
