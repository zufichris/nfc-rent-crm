import { GetModelsFilters, GetModelsResponse, IModel } from "@/types/model";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { request, stringifyFilters } from "@/utils/functions";

export class ModelsService extends BaseService {
    constructor(private readonly basePath: string) {
        super()
    }

    async getModelById(id: string): Promise<IResponse<IModel>> {
        try {
            const res = await request<IResponse<IModel>>(`${this.basePath}/${id}`)
            return res
        } catch (error) {
            return this.handleError({})
        }
    }

    async getModels(filters?: GetModelsFilters): Promise<GetModelsResponse> {
        try {
            const query = stringifyFilters(filters ?? {})

            const res = await request<IResponsePaginated<IModel>>(`${this.basePath}?${query}`)

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

export const modelsService = new ModelsService('/api/v1/cars/models')