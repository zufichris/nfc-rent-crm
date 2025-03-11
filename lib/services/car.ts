import { generateFakeCar } from "@/mock.data";
import { GetCarsFilter, GetCarsResponse, ICar } from "@/types/car";
import { BaseService, IResponse} from "@/types/shared";
import { promisify } from "util";

export class CarService extends BaseService {
    car: ICar = generateFakeCar()
    cars: ICar[] = Array.from({ length: 20 }).map(x => generateFakeCar())
    constructor(private readonly basePath: string) {
        super()
    }

    async getCarById(id: number): Promise<IResponse<ICar>> {
        try {
            // const res = await request<IResponse<ICar>>(`${this.basePath}/${id}`)
            // return res
            await promisify(setTimeout)(100)
            return ({
                success: true,
                message: "Car Retrieved",
                data: this.car
            })
        } catch (error) {
            return this.handleError({})
        }
    }
    async getCars(filters?: GetCarsFilter): Promise<GetCarsResponse> {
        try {
            // const res = await request<IResponsePaginated<ICar>>(`${this.basePath}?${query}`)
            // return res
            await promisify(setTimeout)(100)

            return ({
                success: true,
                message: "Cars Retrieved",
                data: this.cars,
                limit: this.cars.length,
                page: 1,
                total: this.cars.length,
                activeCount: this.cars.filter(x => x.isActive).length,
                deletedCount: this.cars.filter(x => x.isDeleted).length,
            })
        } catch (error) {
            return this.handleError({})
        }
    }

}

export const carsService = new CarService('/cars')