"use server"

import { revalidatePath } from "next/cache"
import type { GetCarsFilter } from "@/types/car"
import { carsService } from "../services/car";
import { promisify } from "util";


export async function getCars({
    page = 1,
    limit = 10,
    ...filters
}: GetCarsFilter) {
    const res = await carsService.getCars({ page, limit, ...filters })
    return res
}

export async function getCar(id: string) {
    const res = await carsService.getCarById(id)
    return res
}

export async function createCar(data: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    revalidatePath("/cars")

    return { success: true, id: "new-car-id" }
}

export async function updateCar(id: string, data: any) {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    revalidatePath(`/cars/${id}`)
    revalidatePath("/cars")

    return { success: true }
}

export async function deleteCar(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    revalidatePath("/cars")

    return { success: true }
}

