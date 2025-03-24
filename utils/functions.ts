import { env } from "@/config/env";
import { Currencies } from "@/types/pricing";

export async function request<T>(path: string, init?: RequestInit, baseUrl: string | undefined = env.apiUrl): Promise<T> {
  try {
    const url = new URL(path, baseUrl).toString();
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-device-name": "Itel",
        "x-device-location": "Obang",
      },
      method: 'GET',
      ...(init ?? {}),
    });
    const result: T = await res.json();
    return result;
  } catch (error: unknown) {
    throw error;
  }
}

export function stringifyFilters(filters: Record<string, unknown>): string {
  const stringifiedFilters = Object.entries(filters ?? {}).reduce((acc, [key, value]) => {
    if (value) {
      return ({
        ...acc,
        [key]: String(value)
      })
    } else {
      return acc
    }
  }, {})
  const query = new URLSearchParams(stringifiedFilters).toString()
  return query
}

export function generateSlug(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
  return slug
}

export function getCurrencySymbol(currency: string) {
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