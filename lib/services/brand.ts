import { BrandFormSchema } from "@/components/brands/brands-form/schema";
import { GetBrandsFilters, GetBrandsResponse, IBrand } from "@/types/brand";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { request, stringifyFilters } from "@/utils/functions";
import { z } from "zod";

export class BrandsService extends BaseService {
    constructor(private readonly basePath: string) {
        super()
    }
    async create(data: Record<string, unknown>) {
        try {
            const valid = this.validate<z.infer<typeof BrandFormSchema>>(BrandFormSchema,data)
            if (!valid.error) {
                if(valid.data?.translations?.length){
                    valid.data.translations=valid.data?.translations.map(t=>({
                    ...t,
                    metaTags:t.metaTags.join(",")
                })) as any
                }
                const res = await request<IResponse<IBrand>>(`${this.basePath}`, {
                    method: "POST",
                    body: JSON.stringify(valid.data)
                })
                return res
            } else {
                return this.handleError({
                    message: valid.error,
                    status: 400
                })
            }
        } catch (error) {
            return this.handleError({})
        }
    }
    async update(brandId:string,data: Record<string, unknown>) {
        try {
            const valid = this.validate<z.infer<typeof BrandFormSchema>>(BrandFormSchema,data)
            if (!valid.error) {
                if(valid.data?.translations?.length){
                    valid.data.translations=valid.data?.translations.map(t=>({
                    ...t,
                    metaTags:t.metaTags.join(",")
                })) as any
                }
                const res = await request<IResponse<IBrand>>(`${this.basePath}/${brandId}`, {
                    method: "PUT",
                    body: JSON.stringify(valid.data)
                })
                return res
            } else {
                return this.handleError({
                    message: valid.error,
                    status: 400
                })
            }
        } catch (error) {
            return this.handleError({})
        }
    }

    async getBrandById(id: string): Promise<IResponse<IBrand>> {
        try {
            const res = await request<IResponse<IBrand>>(`${this.basePath}/${id}`)
            return res
        } catch (error) {
            return this.handleError({})
        }
    }
    async getBrands(filters?: GetBrandsFilters): Promise<GetBrandsResponse> {
        try {
            const query = stringifyFilters(filters ?? {})

            const res = await request<IResponsePaginated<IBrand>>(`${this.basePath}?${query}`)

            return ({
                ...res,
                activeCount: res.success ? res.data.filter(x => x.isActive).length : 0,
                deletedCount: res.success ? res.data.filter(x => x.isDeleted).length : 0,
            })
        } catch (error) {
            return this.handleError({})
        }
    }


}

export const brandsService = new BrandsService('/api/v1/cars/brands')