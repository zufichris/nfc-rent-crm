'use server'

import { GetBrandsFilters, GetBrandsResponse, IBrand } from "@/types/brand"
import { brandsService } from "../services/brand"

export async function getBrandById(id: number) {
    const res = await brandsService.getBrandById(id)
    return res
}
export async function getBrands(filters?: GetBrandsFilters): Promise<GetBrandsResponse> {
    const res = await brandsService.getBrands(filters)
    return res
}

export async function deleteBrand(id: string | number) {
    const data = await brandsService.getBrandById(Number(id))
    return data
}
export async function updateBrand(brand: Partial<IBrand>) {
    const data = await brandsService.getBrandById(Number(1))
    return data
}
export async function createBrand(brand: Partial<IBrand>) {
    const data = await brandsService.getBrandById(1)
    return data
}
