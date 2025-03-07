'use server'

import { cookies, headers } from "next/headers";
import { authService } from "../services/auth";
import { userAgent } from "next/server";
import { redirect } from "next/navigation";
import { request } from "@/utils/functions";


export async function getLoggedInUser() {
    const res = await authService.getLoggedInUser()
    return res
}

export async function login(data: {
    email?: string;
    password?: string;
}) {
    const userAgent = await getUserAgent()
    const res = await authService.login({ ...data, ...userAgent })
    if (res.success) {
        await setCookie("access_token", res.data.accessToken)
    }
    return res
}



export async function logout() {
    const loggedIn = await getLoggedInUser()
    const cookieStore = await cookies()
    cookieStore.delete("access_token")
    if (loggedIn.success) {
        const userAgent = await getUserAgent()
        await authService.logout({ userId: loggedIn.data.id, ...userAgent })
    }
    redirect("/signin")
}

export async function getUserAgent() {
    const headersList = await headers()
    const agent = userAgent({ headers: headersList })
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    let location = 'unknown';
    try {
        const data = await request<{ city: string, country_name: string }>(`/${ip}/json/`, undefined, "https://ipapi.co");
        location = data?.city ? `${data.city}, ${data.country_name}` : "unknown"

    } catch (error) {
        console.error('Failed to fetch location:', error);
    }
    return { location, deviceName: `${agent.device.vendor} ${agent.device.vendor}`, idToken: agent.ua }
}

export async function setCookie(key: "access_token", value: string) {
    const cookieStore = await cookies()
    cookieStore.set(key, value)
}

export async function getToken(key: "access_token") {
    const cookieStore = await cookies()
    const value = cookieStore.get(key)?.value
    return value
}