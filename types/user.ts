export interface IUser {
    fullName: string
    email: string
    phone?: string
    photo?: string
    googleId?: string
    password?: string
    emailVerified: boolean
    phoneVerified: boolean
    roles: string[];
    id: string;
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt?: string
    deletedAt?: string
}



