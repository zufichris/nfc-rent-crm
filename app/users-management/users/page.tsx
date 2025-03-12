import ErrorPage from '@/app/error'
import { StatCard } from '@/components/misc/stat-card'
import { UserTable } from '@/components/user/user-table/table'
import { getUsers } from '@/lib/actions/user'
import { GetUsersFilters, GetUsersResponse } from '@/types/user'
import { Activity, ShieldCheck, Users, UserX } from 'lucide-react'
import React from 'react'
export default async function CustomerListPage({ searchParams }: Readonly<{ searchParams: Promise<GetUsersFilters> }>) {
  const search = await searchParams
  const res: GetUsersResponse = await getUsers(search)
  if (!res.success) {
    return <ErrorPage error={{
      cause: res.message,
      message: res.message,
      name: "users",
      status: res.status
    }} />
  }
  const { data: users, limit, page, total, activeCount, verifiedCount, deletedCount } = res

  return <React.Fragment>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title='Total'
        subtitle='Total Number Of Users'
        icon={<Users />}
        variant='info'
        value={total}
      />
      <StatCard
        title='Verified'
        subtitle='Users with verified Emails'
        icon={<ShieldCheck />}
        variant='success'
        value={verifiedCount}
      />
      <StatCard
        title='Active'
        subtitle='Active Users'
        icon={<Activity />}
        variant='default'
        value={activeCount}
      />
      <StatCard
        title='Deleted'
        subtitle='Number of Deleted Accounts'
        icon={<UserX />}
        variant="destructive"
        value={deletedCount}
      />
    </div>
    <UserTable activeFilters={search} limit={limit} page={page} total={total} users={users} />
  </React.Fragment>
}
