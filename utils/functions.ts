import { env } from "@/config/env";

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
    try {
        const url = new URL(path, env.apiUrl).toString();
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'GET',
            ...(init ?? {}),
        });

        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }
        const result: T = await res.json();
        return result;
    } catch (error: unknown) {
        throw error;
    }
}