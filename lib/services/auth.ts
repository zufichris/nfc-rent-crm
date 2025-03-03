import { generateFakeUser } from "@/mock.data";
import { BaseService, IResponse } from "@/types/shared";
import { IUser } from "@/types/user";
import { request } from "@/utils/functions";
import { promisify } from "util";

export class AuthService extends BaseService {
    constructor(private readonly basePath: string) {
        super()
    }

    async getLoggedInUser(): Promise<IResponse<IUser>> {
        try {
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

    async login(data: {
        email?: string;
        password?: string;
        idToken?: string;
        deviceName: string;
        location: string;
    }): Promise<IResponse<IUser & { accessToken: string }>> {
        try {
            const res = await request<IResponse<IUser & { accessToken: string }>>(`${this.basePath}/login`, {
                method: this.methods.POST,
                body: JSON.stringify({ ...data, loginType: "email" })
            })
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


export const authService = new AuthService("/auth")