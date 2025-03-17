import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EmployeeDetailLoading() {
  return (
    <div className="space-y-6">
      {/* Header with back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href="/employees">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Personal info */}
        <div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Skeleton className="h-32 w-32 rounded-full mb-4" />
                <Skeleton className="h-6 w-48 mb-2" />
                <div className="flex items-center gap-2 mt-1">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-4 w-32 mt-1" />
              </div>

              <div className="space-y-4">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <div className="w-full">
                        <Skeleton className="h-5 w-full max-w-[200px]" />
                        <Skeleton className="h-3 w-20 mt-1" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <div className="w-full">
                        <Skeleton className="h-5 w-full max-w-[200px]" />
                        <Skeleton className="h-3 w-20 mt-1" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle and right columns */}
        <div className="md:col-span-2">
          <Tabs defaultValue="performance">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-24 w-24 rounded-full" />
                      <div>
                        <Skeleton className="h-6 w-32 mb-2" />
                        <div className="flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Skeleton key={i} className="h-5 w-5 mr-1" />
                            ))}
                        </div>
                        <Skeleton className="h-4 w-20 mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="p-3 border rounded-lg">
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-6 w-16 mb-1" />
                            <Skeleton className="h-2 w-full" />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Skeleton className="h-5 w-48 mb-3" />
                    <div className="space-y-4">
                      {Array(2)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="flex gap-4 p-4 border rounded-lg">
                            <Skeleton className="h-9 w-9 rounded-full" />
                            <div className="w-full">
                              <Skeleton className="h-5 w-48 mb-1" />
                              <Skeleton className="h-4 w-32 mb-1" />
                              <Skeleton className="h-4 w-full max-w-[300px]" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="hidden">
              {/* Hidden content for loading state */}
            </TabsContent>

            <TabsContent value="qualifications" className="hidden">
              {/* Hidden content for loading state */}
            </TabsContent>

            <TabsContent value="employment" className="hidden">
              {/* Hidden content for loading state */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

