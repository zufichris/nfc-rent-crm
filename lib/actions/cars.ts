"use server"

import { revalidatePath } from "next/cache"
import type { GetCarsFilter } from "@/types/car"
import { CarService, carsService } from "../services/car";
import { promisify } from "util";
import { CarFormSchema } from "@/components/cars/car-form/schema";
import { z } from "zod";


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

export async function createCar(data: z.infer<typeof CarFormSchema>) {
    const res = await carsService.create(data)
    if (res.success) {
        revalidatePath(`/fleet-management/vehicles`)
    }
    console.log(res)
    return res
}

export async function updateCar(id: string, data: Partial<z.infer<typeof CarFormSchema>>) {
    const res = await carsService.update({
        ...data,
        id
    })
    if (res.success) {
        revalidatePath(`/fleet-management/vehicles/${id}`)
        revalidatePath("/fleet-management/vehicles")
    }
    return res
}

export async function deleteCar(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    revalidatePath("/cars")

    return { success: true }
}

