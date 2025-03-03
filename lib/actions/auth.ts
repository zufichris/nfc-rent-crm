'use server'

import { authService } from "../services/auth";


export async function getLoggedInUser() {
    const res = await authService.getLoggedInUser()
    return res
}

export async function login(data: {
    email?: string;
    password?: string;
    idToken?: string;
    deviceName: string;
    location: string;
}) {
    const res = await authService.login(data)
    return res
}

export async function logout(data: {
    userId: string;
    deviceName: string;
    location: string;
}) {
    const res = await authService.logout(data)
    return res
}