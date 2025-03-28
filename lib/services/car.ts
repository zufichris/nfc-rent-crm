import { CarFormSchema } from "@/components/cars/car-form/schema";
import { generateFakeCar } from "@/mock.data";
import { GetCarsFilter, GetCarsResponse, ICar } from "@/types/car";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { request } from "@/utils/functions";
export class CarService extends BaseService {
    car: ICar = generateFakeCar()
    cars: ICar[] = Array.from({ length: 20 }).map(x => generateFakeCar())
    constructor(private readonly basePath: string) {
        super()
    }
    validateCarFormData(data: unknown) {
        const valid = CarFormSchema.safeParse(data)
        if (valid.success) {
            return { data: valid.data, error: undefined }
        }
        return { error: valid.error.message }

    }

    async getCarById(id: string): Promise<IResponse<ICar>> {
        try {
            const res = await request<IResponse<ICar>>(`${this.basePath}/${id}`)
            return res
        } catch (error) {
            return this.handleError({})
        }
    }
    async getCars(filters?: GetCarsFilter): Promise<GetCarsResponse> {
        try {
            const stringifiedFilters = Object.entries(filters ?? {}).reduce((acc, [key, value]) => ({
                ...acc,
                [key]: String(value)
            }), {})
            const query = new URLSearchParams(stringifiedFilters).toString()
            const res = await request<IResponsePaginated<ICar>>(`${this.basePath}?${query}`)
            return ({
                ...res,
                activeCount: res.success ? res.data.filter(x => x.isActive).length : 0,
                deletedCount: res.success ? res.data.filter(x => x.isDeleted).length : 0,
            })
        } catch (error) {
            return this.handleError({})
        }
    }
    async create(data: Record<string, unknown>) {
        try {
            const valid = this.validateCarFormData(data)
            if (!valid.error) {
                const res = await request<IResponse<ICar>>(`${this.basePath}`, {
                    method: "POST",
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
    async update(data: Record<string, unknown>) {
        try {
            const valid = this.validateCarFormData(data)
            if (!valid.error) {
                const res = await request<IResponse<ICar>>(`${this.basePath}`, {
                    method: "PUT",
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
}

export const carsService = new CarService('/api/v1/cars')