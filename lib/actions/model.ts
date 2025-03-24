'use server'
import { GetModelsFilters, GetModelsResponse, IModel } from "@/types/model"
import { modelsService } from "../services/model"



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

export async function updateModel(model: Partial<IModel>) {
    const data = await modelsService.getModelById(model.id!)

    return data
}

export async function createModel(model: Partial<IModel>) {
    const data = await modelsService.getModelById(model.id!)
    return data
}