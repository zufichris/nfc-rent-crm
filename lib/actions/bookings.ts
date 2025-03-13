'use server'

import { GetBookingsResponse, GetBookingsFilters, IBooking } from "@/types/bookings"
import { bookingService } from "../services/bookings"

export async function getBookingById(id: number|string) {
    const res = await bookingService.getBookingById(id as number)
    return res
}
export async function getBookings(filters?: GetBookingsFilters): Promise<GetBookingsResponse> {
    const res = await bookingService.getBookings(filters)
    return res
}

export async function deleteBooking(id: string | number) {
    const data = await bookingService.getBookingById(Number(id))
    return data
}
export async function updateBooking(booking: Partial<IBooking>) {
    const data = await bookingService.getBookingById(Number(1))
    return data
}
export async function createBooking(booking: Partial<IBooking>) {
    const data = await bookingService.getBookingById(1)
    return data
}
