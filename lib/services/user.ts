import { generateFakeUser } from "@/mock.data";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { IUser } from "@/types/user";
import { request } from "@/utils/functions";
import { promisify } from "util";

export class UserService extends BaseService {
    constructor(private readonly basePath: string) {
        super()
    }
    async getUserById(id: number): Promise<IResponse<IUser>> {
        try {
            // const res = await request<IResponse<IUser>>(`/${this.basePath}/${id}`)
            // return res
            await promisify(setTimeout)(1500)
            return ({
                success: true,
                data: generateFakeUser(),
                message: 'User  Retrieved'
            })
        } catch (error) {
            return this.handleError({})
        }
    }
   
    async getUsers(query?: string): Promise<IResponsePaginated<IUser>> {
        try {
            // const res = await request<IResponsePaginated<IUser>>(`/${this.basePath}/users/?${query}`)
            // return res
            await promisify(setTimeout)(3000)
            return ({
                success: true,
                data: Array.from({ length: 10 }).map(u => generateFakeUser()),
                message: 'User  Retrieved',
                limit: 10,
                page: 1,
                total: 10
            })
        } catch (error) {
            return this.handleError({})
        }
    }
}

export const userService = new UserService("/users")