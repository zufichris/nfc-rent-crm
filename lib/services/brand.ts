import { generateFakeBrand } from "@/mock.data";
import { GetBrandsFilters, GetBrandsResponse, IBrand } from "@/types/brand";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { request, stringifyFilters } from "@/utils/functions";

export class BrandsService extends BaseService {
    brand: IBrand = generateFakeBrand()
    brands: IBrand[] = Array.from({ length: 20 }).map(x => generateFakeBrand())
    constructor(private readonly basePath: string) {
        super()
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