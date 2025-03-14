import ErrorPage from '@/app/[locale]/error'
import { StatCard } from '@/components/misc/stat-card'
import { Package, Activity, Trash2, ShieldBan } from 'lucide-react'
import React from 'react'
import { GetBookingsFilters, GetBookingsResponse } from '@/types/bookings'
import { getBookings } from '@/lib/actions/bookings'
import { BookingsListTable } from '@/components/bookings/bookings-table/table'
import { PageShell } from '@/components/layout/page-shell'
import { headers } from 'next/headers'

export default async function BookingListPage({ searchParams }: Readonly<{ searchParams: Promise<GetBookingsFilters> }>) {
    const search = await searchParams
    const res: GetBookingsResponse = await getBookings(search)
    if (!res.success) {
        return <ErrorPage error={{
            cause: res.message,
            message: res.message,
            name: "Bookings",
            status: res.status
        }} />
    }
    const { data: bookings, limit, page, total, activeCount, cancelledCount, completedCount } = res

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title='Total'
                    subtitle='Total Number Of Bookings'
                    icon={<Package />}
                    variant='info'
                    value={total}
                />
                <StatCard
                    title='Completed'
                    subtitle='Completed Bookings'
                    icon={<ShieldBan />}
                    variant='success'
                    value={completedCount}
                />
                <StatCard
                    title='Pending'
                    subtitle='Pending Bookings'
                    icon={<Activity />}
                    variant='warning'
                    value={activeCount}
                />
                <StatCard
                    title='Cancelled'
                    subtitle='Number of Cancelled Bookings'
                    icon={<Trash2 />}
                    variant="destructive"
                    value={cancelledCount}
                />
            </div>
            <BookingsListTable activeFilters={search} limit={limit} page={page} total={total} bookings={bookings} />
        </>
    )
}