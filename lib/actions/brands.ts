'use server'
import { GetBrandsFilters, GetBrandsResponse, IBrand } from "@/types/brand"
import { brandsService } from "../services/brand"
import { BrandFormSchema } from "@/components/brands/brands-form/schema"
import { z } from "zod"

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
export async function updateBrand(brandId: string, data: Partial<IBrand>) {
    const res = await brandsService.update(brandId, data)
    return res
}
export async function createBrand(data: z.infer<typeof BrandFormSchema>) {
    const res = await brandsService.create(data)
    return res
}
