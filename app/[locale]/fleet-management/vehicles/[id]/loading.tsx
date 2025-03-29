import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CarDetailsLoading() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/cars">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3 space-y-6">
          <Card className="w-full">
            <CardHeader className="relative pb-0">
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-64 rounded" />
                  <Skeleton className="h-4 w-96 max-w-full rounded" />
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <Skeleton className="h-9 w-20 rounded" />
                  <Skeleton className="h-9 w-24 rounded" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Skeleton className="h-6 w-24 rounded" />
                <Skeleton className="h-6 w-32 rounded" />
                <Skeleton className="h-6 w-28 rounded" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded" />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

