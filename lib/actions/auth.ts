'use server'

import { cookies, headers } from "next/headers";
import { authService } from "../services/auth";
import { userAgent } from "next/server";
import { redirect } from "next/navigation";
import { request } from "@/utils/functions";
import { userService } from "../services/user";
import { revalidatePath } from "next/cache";


export async function getLoggedInUser() {
    const res = await userService.getUserById(1)
    return res
}

export async function login(data: {
    email: string;
    password: string;
}) {
    const res = await authService.login(data)
    if (res.success && res.data.accessToken) {
        await setCookie("access_token", res.data.accessToken.value)
        await setCookie("refresh_token", res.data.refreshToken.value)
        revalidatePath("/", "layout")
    }
    return res
}

export async function requestOtp(email: string) {
    const res = await authService.requestOtp(email)
    return res
}
export async function verifyOtp(data: {
    email: string;
    code: string;
    token: string;
}) {
    const res = await authService.verifyOtp(data)
    if (res.success && res.data.accessToken) {
        await setCookie("access_token", res.data.accessToken.value)
        await setCookie("refresh_token", res.data.refreshToken.value)
        revalidatePath("/", "layout")
    }
    return res
}

export async function logout() {
    const loggedIn = await getLoggedInUser()
    const cookieStore = await cookies()
    cookieStore.delete("access_token")
    cookieStore.delete("refresh_token")
    if (loggedIn.success) {
        const userAgent = await getUserAgent()
        await authService.logout({ userId: loggedIn.data.id, ...userAgent })
    }
    redirect("/signin")
}

export async function getUserAgent() {
    // const headersList = await headers()
    // const agent = userAgent({ headers: headersList })
    // const ip = headersList.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    let location = 'unknown';
    // try {
    //     const data = await request<{ city: string, country_name: string }>(`/${ip}/json/`, undefined, "https://ipapi.co");
    //     location = data?.city ? `${data.city}, ${data.country_name}` : "unknown"

    // } catch (error) {
    //     console.error('Failed to fetch location:', error);
    // }
    return ({ location, deviceName: `${"agent.device.vendor"} ${"agent.device.vendor"}`, idToken: "agent.ua" })
}

export async function setCookie(key: "access_token"|"refresh_token", value: string) {
    const cookieStore = await cookies()
    cookieStore.set(key, value)
}

export async function getToken(key: "access_token") {
    const cookieStore = await cookies()
    const value = cookieStore.get(key)?.value
    return value
}