import { generateFakeBooking } from "@/mock.data";
import { BookingStatus, GetBookingsFilters, GetBookingsResponse, IBooking } from "@/types/bookings";
import { BaseService, IResponse, IResponsePaginated } from "@/types/shared";
import { request } from "@/utils/functions";
import { promisify } from "util";

export class BookingsService extends BaseService {
    booking: IBooking = generateFakeBooking()
    bookings: IBooking[] = Array.from({ length: 20 }).map(x => generateFakeBooking())
    constructor(private readonly basePath: string) {
        super()
    }

    async getBookingById(id: number): Promise<IResponse<IBooking>> {
        try {
            // const res = await request<IResponse<IBooking>>(`${this.basePath}/${id}`)
            // return res
            await promisify(setTimeout)(10)
            return ({
                success: true,
                message: "Booking Retrieved",
                data: this.booking
            })
        } catch (error) {
            return this.handleError({})
        }
    }
    async getBookings(filters?: GetBookingsFilters): Promise<GetBookingsResponse> {
        try {
            // const res = await request<IResponsePaginated<IBooking>>(`${this.basePath}?${query}`)
            // return res
            await promisify(setTimeout)(10)

            return ({
                success: true,
                message: "Bookings Retrieved",
                data: this.bookings,
                limit: this.bookings.length,
                page: 1,
                total: this.bookings.length,
                activeCount: this.bookings.filter(x => x.isActive).length,
                cancelledCount: this.bookings.filter(x => x.status === BookingStatus.CANCELLED).length,
                completedCount: this.bookings.filter(x => x.status === BookingStatus.COMPLETED).length,
            })
        } catch (error) {
            return this.handleError({})
        }
    }

}

export const bookingService = new BookingsService('/bookings')