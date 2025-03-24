import { GetFeaturesFilters, GetFeaturesResponse, IFeature } from "@/types/feature";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { request, stringifyFilters } from "@/utils/functions";

export class FeaturesService extends BaseService {
    constructor(private readonly basePath: string) {
        super()
    }

    async getFeatureById(id: string): Promise<IResponse<IFeature>> {
        try {
            const res = await request<IResponse<IFeature>>(`${this.basePath}/${id}`)
            return res
        } catch (error) {
            return this.handleError({})
        }
    }

    async getFeatures(filters?: GetFeaturesFilters): Promise<GetFeaturesResponse> {
        try {
            const query = stringifyFilters(filters ?? {})

            const res = await request<IResponsePaginated<IFeature>>(`${this.basePath}?${query}`)

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

export const featuresService = new FeaturesService('/api/v1/cars/features')