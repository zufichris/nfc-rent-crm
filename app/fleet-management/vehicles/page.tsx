import { CarListTable } from '@/components/cars/car-table/table'
import React from 'react'
const mockCars: any[] = [
    {
        id: "1",
        name: "Tesla Model S",
        brand: "Tesla",
        model: "Model S",
        year: 2022,
        price: 89990,
        status: "Available",
        imageUrl: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-01-15T12:00:00Z",
    },
    {
        id: "2",
        name: "BMW X5",
        brand: "BMW",
        model: "X5",
        year: 2021,
        price: 62500,
        status: "Sold",
        imageUrl: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-02-20T14:30:00Z",
    },
    {
        id: "3",
        name: "Toyota Camry",
        brand: "Toyota",
        model: "Camry",
        year: 2023,
        price: 28500,
        status: "Pending",
        imageUrl: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-03-10T09:15:00Z",
    },
    {
        id: "4",
        name: "Honda Civic",
        brand: "Honda",
        model: "Civic",
        year: 2022,
        price: 24500,
        status: "Available",
        imageUrl: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-04-05T16:45:00Z",
    },
    {
        id: "5",
        name: "Ford Mustang",
        brand: "Ford",
        model: "Mustang",
        year: 2021,
        price: 45000,
        status: "Maintenance",
        imageUrl: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-05-12T11:20:00Z",
    },
]
export default function CarsPage() {
    return (
        <CarListTable cars={mockCars} limit={mockCars.length} page={1} total={mockCars.length} />
    )
}
