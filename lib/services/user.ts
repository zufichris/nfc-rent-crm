import { generateFakeUser } from "@/mock.data";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { GetUsersResponse, IUser } from "@/types/user";
import { request } from "@/utils/functions";
import { promisify } from "util";

export class UserService extends BaseService {
    private readonly user: IUser = generateFakeUser()
    private readonly users: IUser[] = Array.from({ length: 20 }).map(x => generateFakeUser())
    constructor(private readonly basePath: string) {
        super()
    }
    async getUserById(id: number): Promise<IResponse<IUser>> {
        try {
            // const res = await request<IResponse<IUser>>(`/${this.basePath}/${id}`)
            // return res
            await promisify(setTimeout)(5)
            return ({
                success: true,
                data: this.user,
                message: 'User  Retrieved'
            })
        } catch (error) {
            return this.handleError({})
        }
    }

    async getUsers(query?: string): Promise<GetUsersResponse> {
        try {
            // const res = await request<IResponsePaginated<IUser>>(`/${this.basePath}/users/?${query}`)
            // return res
            await promisify(setTimeout)(10)
            return ({
                success: true,
                message: 'User  Retrieved',
                limit: this.users.length,
                page: 1,
                total: this.users.length,
                activeCount: this.users.filter(x => x.isActive).length,
                verifiedCount: this.users.filter(x => x.emailVerified).length,
                deletedCount:this.users.filter(x => x.isDeleted).length,
                data: this.users
            })
        } catch (error) {
            return this.handleError({})
        }
    }
}

export const userService = new UserService("/users")