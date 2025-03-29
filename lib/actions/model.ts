'use server'
import { GetModelsFilters, GetModelsResponse, IModel } from "@/types/model"
import { modelsService } from "../services/model"
import { CarModelFormSchema } from "@/components/models/model-form/schema"
import { z } from "zod"



export async function getModelById(id: string) {
    const res = await modelsService.getModelById(id)
    return res
}

export async function getModels(filters?: GetModelsFilters): Promise<GetModelsResponse> {
    const res = await modelsService.getModels(filters)
    return res
}

export async function deleteModel(id: string) {
    const data = await modelsService.getModelById(id)

    return data
}

export async function updateModel(id: string, model: z.infer<typeof CarModelFormSchema>) {
    const data = await modelsService.update(id, model)
    return data
}

export async function createModel(data: z.infer<typeof CarModelFormSchema>) {
    const res = await modelsService.create(data)
    return res
}