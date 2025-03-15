"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Car, CarIcon, Fuel, Gauge, Heart, Share2, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ICar } from "@/types/car"

interface CarCardProps {
    car: ICar
    className?: string
    onFavorite?: (car: ICar) => void
    onShare?: (car: ICar) => void
    renderCarStatus?: (car: ICar) => React.ReactNode
}

export function CarCard({
    car,
    className = "",
    onFavorite,
    onShare,
    renderCarStatus = (car) => <Badge className="bg-primary/90 hover:bg-primary">{car.condition}</Badge>,
}: Readonly<CarCardProps>) {
    const [isFavorite, setIsFavorite] = useState(false)

    const primaryImage = car.media?.find((m) => m.type === "image" && m.position === 0)?.url || car.media?.[0]?.url

    const formattedMileage = car.mileage.toLocaleString()
    const formattedPrice = "Price on request"

    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        if (onFavorite) onFavorite(car)
    }

    const handleShare = () => {
        if (onShare) onShare(car)
    }

    return (
        <Card className={cn("overflow-hidden group hover:shadow-md transition-all duration-300", className)}>
            <div className="relative">
                <Avatar className="relative h-44 w-full rounded-none">
                    <AvatarImage
                        src={primaryImage}
                        alt={`${car.year} ${car.name} ${car.model}`}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <AvatarFallback className="rounded-none bg-muted h-44">
                        <CarIcon className="h-12 w-12 text-muted-foreground/50" />
                    </AvatarFallback>
                </Avatar>

                {/* Status badges */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">{renderCarStatus(car)}</div>

                {/* Action buttons */}
                <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={handleShare}
                        aria-label="Share this car"
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <CardHeader className="p-3 pb-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
                            {car.year} {car.name} {car.model}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                            {car.shortDescription || `${car.category} • ${car.transmission}`}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-medium text-sm">{formattedPrice}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                    <div className="flex items-center gap-1.5">
                        <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{formattedMileage} mi</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Fuel className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{car.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Car className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>
                            {car.doors}d • {car.seats} seats
                        </span>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-1.5 cursor-help">
                                    <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="truncate">{car.engineSpecs.horsepower || "N/A"} hp</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                                <p>Horsepower: {car.engineSpecs.horsepower || "Not specified"}</p>
                                {car.engineSpecs.torque && <p>Torque: {car.engineSpecs.torque}</p>}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>

            <Separator />

            <CardFooter className="p-3 pt-2 flex justify-between">
                <div className="flex items-center gap-2">
                    {car.color?.name && (
                        <div className="flex items-center gap-1.5">
                            <div
                                className="w-3 h-3 rounded-full border"
                                style={{ backgroundColor: car.color.code || "#ccc" }}
                                aria-hidden="true"
                            />
                            <span className="text-xs">{car.color.name}</span>
                        </div>
                    )}
                </div>
                <div className="flex gap-1">
                    {car.listingType.includes("Featured") && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0 h-5 font-normal">
                            Featured
                        </Badge>
                    )}
                    <Badge variant="outline" className="text-xs px-1.5 py-0 h-5 font-normal">
                        {car.category}
                    </Badge>
                </div>
            </CardFooter>
        </Card>
    )
}

