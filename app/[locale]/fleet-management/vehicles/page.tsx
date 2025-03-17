import { CarListTable } from "@/components/cars/car-table/table"
import { getCars } from "@/lib/actions/cars"
import { GetCarsFilter } from "@/types/car"
import { StatCard } from "@/components/misc/stat-card"
import ErrorPage from "@/app/[locale]/error"
import { Activity, CarIcon, Check, Trash2 } from "lucide-react"

export const metadata = {
  title: 'Fleet Management | NFC Car Rental CRM',
  description: 'Manage your vehicle fleet inventory, track active and inactive cars, and monitor fleet statistics.',
  keywords: 'fleet management, car rental, vehicle inventory, automotive CRM',
  openGraph: {
    title: 'Fleet Management Dashboard',
    description: 'Comprehensive vehicle fleet management system for car rental businesses',
    type: 'website',
  }
}

export default async function CarsPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<GetCarsFilter>
}>) {
  const search = await searchParams

  const res = await getCars(search)

  if (!res.success) {
    return <ErrorPage error={{
      cause: res.message,
      message: res.message,
      name: "cars",
      status: res.status
    }} />
  }
  const { data: cars, limit = 10, page = 1, total, activeCount, deletedCount } = res

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title='Total'
          subtitle='Total Number Of Cars'
          icon={<CarIcon />}
          variant='info'
          value={total}
        />
        <StatCard
          title='Inactive'
          subtitle='Sold Cars'
          icon={<Check />}
          variant='secondary'
          value={total - (activeCount ?? 0)}
        />
        <StatCard
          title='Active'
          subtitle='Active Cars'
          icon={<Activity />}
          variant='success'
          value={activeCount}
        />
        <StatCard
          title='Deleted'
          subtitle='Number of Deleted Cars'
          icon={<Trash2 />}
          variant="destructive"
          value={deletedCount}
        />
      </div>
      <CarListTable activeFilters={search} limit={limit} page={page} total={total} cars={cars} />
    </>
  )
}
