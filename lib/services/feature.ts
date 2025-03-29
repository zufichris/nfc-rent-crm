import { CarFeatureFormSchema } from "@/components/feature/features-form/schema";
import { GetFeaturesFilters, GetFeaturesResponse, IFeature } from "@/types/feature";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { request, stringifyFilters } from "@/utils/functions";

export class FeaturesService extends BaseService {
    constructor(private readonly basePath: string) {
        super()
    }
    async create(data: Record<string, unknown>) {
        try {
            const valid = this.validate(CarFeatureFormSchema ,data)
            if (!valid.error) {
                const res = await request<IResponse<IFeature>>(`${this.basePath}`, {
                    method: this.methods.POST,
                    body: JSON.stringify(data)
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
    async update(featureId:string,data: Record<string, unknown>) {
        try {
            const valid = this.validate(CarFeatureFormSchema,data)
            if (!valid.error) {
                const res = await request<IResponse<IFeature>>(`${this.basePath}/${featureId}`, {
                    method: this.methods.PATCH,
                    body: JSON.stringify(data)
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