"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TablePagination({
  page,
  limit,
  total,
  onPageChange,
}: Readonly<{
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
}>) {
  const totalPages = Math.ceil(total / limit)
  const startItem = (page - 1) * limit + 1
  const endItem = Math.min(page * limit, total)

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    onPageChange(newPage)
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of middle pages
      let startPage = Math.max(2, page - 1)
      let endPage = Math.min(totalPages - 1, page + 1)

      // Adjust if we're near the beginning
      if (page <= 3) {
        endPage = 4
      }

      // Adjust if we're near the end
      if (page >= totalPages - 2) {
        startPage = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("ellipsis-start")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{total > 0 ? startItem : 0}</span> to{" "}
        <span className="font-medium">{endItem}</span> of <span className="font-medium">{total}</span> entries
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className="h-8 w-8"
        >
          <ChevronsLeft className="h-4 w-4" />
          <span className="sr-only">First page</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((pageNum, i) =>
            pageNum === "ellipsis-start" || pageNum === "ellipsis-end" ? (
              <span key={`ellipsis-${i}`} className="px-2">
                ...
              </span>
            ) : (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                size="icon"
                onClick={() => handlePageChange(Number(pageNum))}
                className="h-8 w-8"
              >
                {pageNum}
              </Button>
            ),
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className="h-8 w-8"
        >
          <ChevronsRight className="h-4 w-4" />
          <span className="sr-only">Last page</span>
        </Button>
      </div>
    </div>
  )
}

export function TableEntriesPerPageSelect({
  limit,
  onLimitChange,
}: Readonly<{
  limit: number
  onLimitChange: (limit: number) => void
}>) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Show</span>
      <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
        <SelectTrigger className="h-9 w-[70px]">
          <SelectValue placeholder={limit} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-sm text-muted-foreground whitespace-nowrap">entries</span>
    </div>
  )
}

