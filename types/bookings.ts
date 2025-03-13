import { ICar } from "./car";
import { IPayment } from "./payment";
import {
    DateFilter,
    IBaseEntity,
    IBaseFilters,
    IResponsePaginated,
    NumberFilter,
} from "./shared";
import { IDriver, IUser } from "./user";

export enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export interface IAddon extends IBaseEntity {
    name: string;
    description: string;
    priceOptions: {
        type: "per_rental" | "per_day";
        amount: number;
        currency: string;
    }[];
    isRequired: boolean;
    availableForCars: ICar[];
    bookings: IBooking[];
}

export interface IBooking extends IBaseEntity {
    user: IUser;
    driver: IDriver;
    car: ICar;
    pickupDate: Date;
    returnDate: Date;
    totalAmount: number;
    status: BookingStatus;
    payment: IPayment;
    selectedAddons?: IAddon[];
    cancellationReason?: string;
    priceBreakdown?: Record<string, any>;
}

export type GetBookingsFilters = Partial<
    {
        user?: string[];
        driver?: string[];
        car?: string[];
        pickupDate?: DateFilter;
        returnDate?: DateFilter;
        totalAmount?: NumberFilter;
        status?: string[];
    } & IBaseFilters
>;

export type GetBookingsResponse = IResponsePaginated<IBooking> & {
    activeCount?: number;
    completedCount?: number;
    cancelledCount?: number
};
