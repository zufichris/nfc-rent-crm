import { generateFakeBrand } from "@/mock.data";
import { IBrand } from "@/types/brand";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { request } from "@/utils/functions";

export class BrandsService extends BaseService {
    constructor(private readonly basePath: string) {
        super()
    }

    async getBrandById(id: number): Promise<IResponse<IBrand>> {
        try {
            // const res = await request<IResponse<IBrand>>(`${this.basePath}/${id}`)
            // return res
            return ({
                success: true,
                message: "Brand Retrieved",
                data: generateFakeBrand()
            })
        } catch (error) {
            return this.handleError({})
        }
    }
    async getBrands(query?: string): Promise<IResponsePaginated<IBrand>> {
        try {
            // const res = await request<IResponsePaginated<IBrand>>(`${this.basePath}?${query}`)
            // return res
            return ({
                success: true,
                message: "Brands Retrieved",
                data: Array.from({ length: 10 }).map(x => generateFakeBrand()),
                limit: 10,
                page: 1,
                total: 10
            })
        } catch (error) {
            return this.handleError({})
        }
    }

}

export const brandsService = new BrandsService('/brands')