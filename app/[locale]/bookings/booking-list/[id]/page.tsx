import { BookingDetails } from '@/components/bookings/booking-details'
import { getBookingById } from '@/lib/actions/bookings'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function BookingDetailsPage() {
    const res = await getBookingById(2)
    if (!res.success) {
        return notFound()
    }

    return (
        <BookingDetails booking={res.data} />
    )
}
