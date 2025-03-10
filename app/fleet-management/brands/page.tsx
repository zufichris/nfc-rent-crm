import ErrorPage from '@/app/error'
import { StatCard } from '@/components/misc/stat-card'
import { BrandListTable } from '@/components/brands/brand-table/table'
import { getBrands } from '@/lib/actions/brands'
import { GetBrandsFilters, GetBrandsResponse } from '@/types/brand'
import { Package, Activity, Trash2, ShieldBan } from 'lucide-react'
import React from 'react'

export default async function BrandListPage({ searchParams }: Readonly<{ searchParams: Promise<GetBrandsFilters> }>) {
  const search = await searchParams
  const res: GetBrandsResponse = await getBrands(search)
  if (!res.success) {
    return <ErrorPage error={{
      cause: res.message,
      message: res.message,
      name: "brands",
      status: res.status
    }} />
  }
  const { data: brands, limit, page, total, activeCount, deletedCount } = res

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title='Total'
          subtitle='Total Number Of Brands'
          icon={<Package />}
          variant='info'
          value={total}
        />
        <StatCard
          title='Inactive'
          subtitle='Brands with Verified Info'
          icon={<ShieldBan />}
          variant='secondary'
          value={total - (activeCount ?? 0)}
        />
        <StatCard
          title='Active'
          subtitle='Active Brands'
          icon={<Activity />}
          variant='success'
          value={activeCount}
        />
        <StatCard
          title='Deleted'
          subtitle='Number of Deleted Brands'
          icon={<Trash2 />}
          variant="destructive"
          value={deletedCount}
        />
      </div>
      <BrandListTable activeFilters={search} limit={limit} page={page} total={total} brands={brands} />
    </>
  )
}