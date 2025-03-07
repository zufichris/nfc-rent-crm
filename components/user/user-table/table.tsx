"use client";
import { DataTable } from "../../misc/table/data-table";
import { GetUsersFilters, IUser } from "@/types/user";
import { DataTableFilter } from "../../misc/table/filter";
import { ActionTypes, UserActionsModal } from "./actions-modals";
import { useState } from "react";
import { UserTableColumns } from "./columns";
import { useRouter } from "next/navigation";

type UserTableProps = Readonly<{
    users: IUser[];
    total: number;
    page: number;
    limit: number;
    activeFilters?: Omit<GetUsersFilters, "limit" | "page">
}>;




const userFilters: Partial<Omit<DataTableFilter, 'key'> & { key: keyof GetUsersFilters }>[] = [
    { key: 'isActive', name: 'Show Only Active', type: 'boolean' },
    {
        key: 'roles',
        name: 'Roles',
        type: 'select',
        options: [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
        ]
    },
    { key: 'isDeleted', name: 'Show Deleted', type: 'boolean' },
    { key: 'createdAt', name: 'Created At', type: 'date' },
    { key: 'updatedAt', name: 'Updated At', type: 'date' },
    { key: 'search', name: 'Search', type: 'text' }
];

export function UserTable({
    users = [],
    total = 0,
    page = 1,
    limit = 9,
    activeFilters = {}
}: UserTableProps) {
    const router = useRouter()
    const [selectedUser, setSelectedUser] = useState<IUser>()
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [type, setType] = useState<ActionTypes>()
    return (
        <>
            <DataTable
                total={total}
                title="Users Management"
                name="User"
                limit={limit}
                page={page}
                items={users}
                nameField="fullName"
                idField="id"
                columns={UserTableColumns}
                filters={userFilters as DataTableFilter[]}
                activeFilters={activeFilters}
                setSelectedItems={setSelectedUsers}
                selectedItems={selectedUsers ?? []}
                onEdit={(user) => {
                    setSelectedUser(user)
                    setType("edit")
                }}
                onAdd={() => {
                    setType("create")

                }}
                onView={(user) => {
                    setSelectedUser(user)
                    setType("view")
                }}
                onDelete={(user) => {
                    setSelectedUser(user)
                    setType("delete")
                }}
                onFiltersChange={(filters) => {
                    const search = new URLSearchParams(filters)
                    router.push(`?${search.toString()}`)
                }}
                onBulkDelete={(items) => {
                    setSelectedUsers(items)
                    setType("bulk delete")
                }}
            />
            <UserActionsModal isOpen={type !== undefined} type={type} selectedUsers={selectedUsers} user={selectedUser} onClose={() => setType(undefined)} onSuccess={() => {
                setType(undefined)
                setSelectedUser(undefined)
                setSelectedUsers([])
            }} />
        </>
    );
}
