import { PageShell } from "@/components/layout/page-shell"
import { StatCardSkeleton } from "@/components/misc/stat-card"
import { TableSkeleton } from "@/components/misc/table/table-skeleton"



export default function Loading() {
  return (
     <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      <TableSkeleton />
    </div>
  )
}

