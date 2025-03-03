'use server'
import { userService } from "../services/user"

export async function getUserById(id: number) {
    const res = await userService.getUserById(id)
    return res
}


export async function getUsers(query?: string) {
    const res = await userService.getUsers(query)
    return res
}