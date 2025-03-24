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

    async getCarById(id: string): Promise<IResponse<ICar>> {
        try {
            console.log(this.car)
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

}

export const carsService = new CarService('/api/v1/cars')