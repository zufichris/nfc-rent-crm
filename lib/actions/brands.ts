'use server'

import { GetBrandsFilters, GetBrandsResponse, IBrand } from "@/types/brand"
import { brandsService } from "../services/brand"

export async function getBrandById(id: string) {
    const res = await brandsService.getBrandById(id)
    return res
}
export async function getBrands(filters?: GetBrandsFilters): Promise<GetBrandsResponse> {
    const res = await brandsService.getBrands(filters)
    return res
}

export async function deleteBrand(id: string) {
    const data = await brandsService.getBrandById(id)
    return data
}
export async function updateBrand(brand: Partial<IBrand>) {
    const data = await brandsService.getBrandById(brand.id!)
    return data
}
export async function createBrand(brand: Partial<IBrand>) {
    const data = await brandsService.getBrandById(brand.id!)
    return data
}
