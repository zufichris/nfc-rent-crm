'use server'

import { generateFakeBrand } from "@/mock.data"
import { promisify } from "util"

export async function generateBrandSuggestions(data?: any) {
    await promisify(setTimeout)(1000)
    return generateFakeBrand() as any
}