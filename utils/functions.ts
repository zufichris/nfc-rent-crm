import { env } from "@/config/env";

export async function request<T>(path: string, init?: RequestInit, baseUrl?: string): Promise<T> {
    try {
        const url = new URL(path, baseUrl ?? env.apiUrl).toString();
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'GET',
            ...(init ?? {}),
        });
        console.log(res)

        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }
        const result: T = await res.json();
        return result;
    } catch (error: unknown) {
        throw error;
    }
}