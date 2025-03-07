'use server'
import { GetUsersFilters, IUser } from "@/types/user"
import { userService } from "../services/user"

export async function getUserById(id: number) {
    const res = await userService.getUserById(id)
    return res
}


export async function getUsers(filters?: GetUsersFilters) {
    const queryObj: Record<string, string> = { limit: '10', page: '1', sortBy: "asc", sortField: "createdAt" }

    Object.keys(filters ?? {}).forEach(([key, val]) => {
        if (val) {
            queryObj[key] = val.toString()
        }
    })
    const query = new URLSearchParams(queryObj).toString()
    const res = await userService.getUsers(query)
    return res
}

export async function deleteUser(userId: string) {
    const res = await userService.getUsers()
    return res
}
export async function updateUser(user: Partial<IUser>) {
    const res = await userService.getUsers()
    return res
}
export async function createUser(user: Partial<IUser>) {
    const res = await userService.getUsers()
    return res
} 