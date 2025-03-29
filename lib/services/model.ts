import { CarModelFormSchema } from "@/components/models/model-form/schema";
import { GetModelsFilters, GetModelsResponse, IModel } from "@/types/model";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { request, stringifyFilters } from "@/utils/functions";
import { z } from "zod";

export class ModelsService extends BaseService {
    constructor(private readonly basePath: string) {
        super()
    }
    async create(data: Record<string, unknown>) {
        try {
            const valid = this.validate<z.infer<typeof CarModelFormSchema>>(CarModelFormSchema, data)
            if (!valid.error) {
                if (valid.data?.translations?.length) {
                    valid.data.translations = valid.data?.translations.map(t => ({
                        ...t,
                        metaTags: t.metaTags.join(",")
                    })) as any
                }
                const res = await request<IResponse<IModel>>(`${this.basePath}`, {
                    method: this.methods.POST,
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
    async update(modelId: string, data: Record<string, unknown>) {
        try {
            const valid = this.validate<z.infer<typeof CarModelFormSchema>>(CarModelFormSchema, data)
            if (!valid.error) {
                if (valid.data?.translations?.length) {
                    valid.data.translations = valid.data?.translations.map(t => ({
                        ...t,
                        metaTags: t.metaTags.join(",")
                    })) as any
                }
                const res = await request<IResponse<IModel>>(`${this.basePath}/${modelId}`, {
                    method: this.methods.PATCH,
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