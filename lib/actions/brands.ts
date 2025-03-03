'use server'

import { brandsService } from "../services/brand"

export async function getBrandById(id: number) {
    const res = await brandsService.getBrandById(id)
    return res
}
export async function getBrands(query?: string) {
    const res = await brandsService.getBrands(query)
    return res
}