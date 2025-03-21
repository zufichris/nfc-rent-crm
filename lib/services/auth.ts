import { generateFakeUser } from "@/mock.data";
import { BaseService, IResponse } from "@/types/shared";
import { IUser } from "@/types/user";
import { request } from "@/utils/functions";
import { promisify } from "util";
import { getToken } from "../actions/auth";

export class AuthService extends BaseService {
    constructor(private readonly basePath: string) {
        super()
    }

    async getLoggedInUser(): Promise<IResponse<IUser>> {
        try {
            await promisify(setTimeout)(10)
            const token = await getToken("access_token")
            if (!token)
                throw Error("Invalid Token")
            return ({
                success: true,
                data: generateFakeUser(),
                message: 'User  Retrieved'
            })
        } catch (error) {
            return this.handleError({})
        }
    }

    async login(data: any): Promise<IResponse<IUser & { accessToken: string }>> {
        try {
            const res = await request<IResponse<IUser & { accessToken: string }>>(`${this.basePath}/login`, {
                method: this.methods.POST,
                body: JSON.stringify({ ...data })
            })
            console.log(res)
            return res
        } catch (error: unknown) {
            return this.handleError({})
        }
    }

    async logout(data: {
        userId: string;
        deviceName: string;
        location: string;
    }): Promise<IResponse<IUser & { accessToken: string }>> {
        try {
            const res = await request<IResponse<IUser & { accessToken: string }>>(`${this.basePath}/logout`, {
                method: this.methods.POST,
                body: JSON.stringify(data)
            })
            return res
        } catch (error: unknown) {
            return this.handleError({})
        }
    }
}


export const authService = new AuthService("/api/v1/auth")