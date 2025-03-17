import { env } from "@/config/env";
import { Currencies } from "@/types/pricing";

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

export  function generateSlug(name: string) {
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
 return slug
    }

    export function getCurrencySymbol(currency:string) {
        switch (currency) {
          case Currencies.USD:
            return "$"
          case Currencies.EUR:
            return "€"
          case Currencies.ETH:
            return "Ξ"
          case Currencies.TRON:
            return "TRX"
          case Currencies.AED:
            return "د.إ"
          default:
            return ""
        }
      }