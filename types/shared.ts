import { env } from "@/config/env";
import { z } from "zod";

export interface IBaseEntity {
    id: string;
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt?: string
    deletedAt?: string
}

export type NumberFilter = {
    min?: number
    max?: number
}

export type DateFilter = {
    start?: number | string | Date
    end?: number | string | Date
}

export type IBaseFilters = Partial<{
    sortBy: string,
    sortField: string,
    limit: number,
    page: number,
    search: string
    createdAt: string,
    updatedAt: string,
}>

type ResError = {
    status: number;
    message: string;
    success: false;
}

type ResSuccess<TData> = {
    success: true;
    message: string;
    data: TData;
}

type ResPaginated<Data = unknown> = {
    success: true;
    message: string;
    data: Data[];
    total: number;
    page: number;
    limit: number;
}

export type IResponse<Data = unknown> = ResSuccess<Data> | ResError

export type IResponsePaginated<TData = unknown> = ResPaginated<TData> | ResError

export type DateInputType = string | Date;
export type NonEmptyArray<T> = [T, ...T[]];
export class BaseService {
    methods = {
        POST: "POST",
        GET: "GET",
        PATCH: "PATCH",
        DELETE: "DELETE"
    }
    apiUrl = env.apiUrl
    validate<T=unknown>(schema: z.ZodSchema, data: unknown) {
        const valid = schema.safeParse(data)
        if (valid.success) {
            return { data: valid.data as T, error: undefined }
        }
        return { error: valid.error.message }
    }
    handleError({
        message = "An Unexpected Error Occurred",
        status = 500,
    }: {
        message?: string;
        status?: number;
    }): ResError {
        return { status, message, success: false };
    }
}
