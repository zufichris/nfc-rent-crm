import { ModelTable } from "@/components/models/model-table/table"
import { StatCard } from "@/components/misc/stat-card"
import { Car, CheckCircle, Trash2, Building } from "lucide-react"
import type { IModel, IBrand } from "@/types/brand"

export default async function ModelsListPage({ params }: Readonly<{ params: Promise<{ search: Record<string, string> }> }>) {
    const { search } = await params
    const brands: IBrand[] = [
        {
            id: "1",
            name: "Ferrari",
            code: "ferrari",
            slug: "ferrari",
            logo: "/placeholder.svg?height=30&width=30",
            isActive: true,
            isDeleted: false,
            createdAt: "2023-01-01",
            metadata: {
                title: "Ferrari",
                description: "Italian luxury sports car manufacturer",
                tags: ["luxury", "sports", "italian"],
            },
        },
        {
            id: "2",
            name: "Lamborghini",
            code: "lamborghini",
            slug: "lamborghini",
            logo: "/placeholder.svg?height=30&width=30",
            isActive: true,
            isDeleted: false,
            createdAt: "2023-01-15",
            metadata: {
                title: "Lamborghini",
                description: "Italian luxury sports car manufacturer",
                tags: ["luxury", "sports", "italian"],
            },
        },
        {
            id: "3",
            name: "Tesla",
            code: "tesla",
            slug: "tesla",
            logo: "/placeholder.svg?height=30&width=30",
            isActive: true,
            isDeleted: false,
            createdAt: "2023-02-01",
            metadata: {
                title: "Tesla",
                description: "American electric vehicle manufacturer",
                tags: ["electric", "luxury", "american"],
            },
        },
        {
            id: "4",
            name: "Rolls-Royce",
            code: "rolls-royce",
            slug: "rolls-royce",
            logo: "/placeholder.svg?height=30&width=30",
            isActive: true,
            isDeleted: false,
            createdAt: "2023-02-15",
            metadata: {
                title: "Rolls-Royce",
                description: "British luxury automobile maker",
                tags: ["luxury", "british"],
            },
        },
    ]

    const models: IModel[] = [
        {
            id: "1",
            name: "488 GTB",
            code: "488-gtb",
            slug: "488-gtb",
            brand: brands[0],
            shortDescription: "Mid-engine sports car manufactured by Ferrari.",
            description:
                "The Ferrari 488 GTB is a mid-engine sports car produced by the Italian automobile manufacturer Ferrari. The car replaced the 458, and was the first mid-engine Ferrari to use a turbocharged V8 since the F40.",
            metadata: {
                title: "Ferrari 488 GTB",
                description: "Mid-engine sports car by Ferrari",
                tags: ["sports", "v8", "turbo"],
            },
            isActive: true,
            isDeleted: false,
            createdAt: "2023-01-05",
        },
        {
            id: "2",
            name: "Huracán",
            code: "huracan",
            slug: "huracan",
            brand: brands[1],
            shortDescription: "V10 sports car manufactured by Lamborghini.",
            description:
                "The Lamborghini Huracán is a sports car manufactured by Italian automotive manufacturer Lamborghini. The Huracán replaced the Gallardo, Lamborghini's best-selling model, in 2014.",
            metadata: {
                title: "Lamborghini Huracán",
                description: "V10 sports car by Lamborghini",
                tags: ["sports", "v10", "awd"],
            },
            isActive: true,
            isDeleted: false,
            createdAt: "2023-01-20",
        },
        {
            id: "3",
            name: "Model S",
            code: "model-s",
            slug: "model-s",
            brand: brands[2],
            shortDescription: "All-electric five-door liftback sedan by Tesla.",
            description:
                "The Tesla Model S is an all-electric five-door liftback sedan produced by Tesla, Inc. The Model S features a dual-motor, all-wheel drive layout.",
            metadata: {
                title: "Tesla Model S",
                description: "All-electric sedan by Tesla",
                tags: ["electric", "sedan", "luxury"],
            },
            isActive: true,
            isDeleted: false,
            createdAt: "2023-02-05",
        },
        {
            id: "4",
            name: "Phantom",
            code: "phantom",
            slug: "phantom",
            brand: brands[3],
            shortDescription: "Full-sized luxury saloon manufactured by Rolls-Royce.",
            description:
                "The Rolls-Royce Phantom is a full-sized luxury saloon manufactured by Rolls-Royce Motor Cars. It is the eighth and current generation of the Rolls-Royce Phantom, and the second launched by Rolls-Royce under BMW ownership.",
            metadata: {
                title: "Rolls-Royce Phantom",
                description: "Luxury saloon by Rolls-Royce",
                tags: ["luxury", "saloon", "v12"],
            },
            isActive: true,
            isDeleted: false,
            createdAt: "2023-02-20",
        },
    ]

    const totalModels = models.length
    const activeModels = models.filter((model) => model.isActive).length
    const totalBrands = brands.length
    const deletedModels = models.filter((model) => model.isDeleted).length

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Models" subtitle="All Car Models" icon={<Car />} variant="info" value={totalModels} />
                <StatCard
                    title="Active Models"
                    subtitle="Currently Active"
                    icon={<CheckCircle />}
                    variant="success"
                    value={activeModels}
                />
                <StatCard
                    title="Brands"
                    subtitle="Associated Brands"
                    icon={<Building />}
                    variant="default"
                    value={totalBrands}
                />
                <StatCard
                    title="Deleted Models"
                    subtitle="Removed Models"
                    icon={<Trash2 />}
                    variant="destructive"
                    value={deletedModels}
                />
            </div>
            <ModelTable
                models={models}
                brands={brands}
                total={models.length}
                page={1}
                limit={10}
                activeFilters={search}
            />
        </>
    )
}

