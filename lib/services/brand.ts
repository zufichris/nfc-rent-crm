import { generateFakeBrand } from "@/mock.data";
import { GetBrandsFilters, GetBrandsResponse, IBrand } from "@/types/brand";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { request } from "@/utils/functions";
import { promisify } from "util";

export class BrandsService extends BaseService {
    brand: IBrand = generateFakeBrand()
    brands: IBrand[] = Array.from({ length: 20 }).map(x => generateFakeBrand())
    constructor(private readonly basePath: string) {
        super()
    }

    async getBrandById(id: number): Promise<IResponse<IBrand>> {
        try {
            // const res = await request<IResponse<IBrand>>(`${this.basePath}/${id}`)
            // return res
            await promisify(setTimeout)(10)
            return ({
                success: true,
                message: "Brand Retrieved",
                data: this.brand
            })
        } catch (error) {
            return this.handleError({})
        }
    }
    async getBrands(filters?: GetBrandsFilters): Promise<GetBrandsResponse> {
        try {
            // const res = await request<IResponsePaginated<IBrand>>(`${this.basePath}?${query}`)
            // return res
            await promisify(setTimeout)(10)

            return ({
                success: true,
                message: "Brands Retrieved",
                data: this.brands,
                limit: this.brands.length,
                page: 1,
                total: this.brands.length,
                activeCount: this.brands.filter(x => x.isActive).length,
                deletedCount: this.brands.filter(x => x.isDeleted).length,
            })
        } catch (error) {
            return this.handleError({})
        }
    }

}

export const brandsService = new BrandsService('/brands')