"use client"
import { useState } from "react"
import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export interface ImageProps extends Omit<NextImageProps, "src" | "onError" | "onLoad"> {
    fallbackSrc?: string
    fallbackAlt?: string
    showSkeleton?: boolean
    aspectRatio?: "square" | "video" | "portrait" | "auto"
    containerClassName?: string
    src?: string | null
}

export function Image({
    src = null,
    alt,
    fallbackSrc = "/placeholder.svg",
    fallbackAlt = "Image placeholder",
    showSkeleton = true,
    aspectRatio = "auto",
    className,
    containerClassName,
    fill = true,
    width,
    height,
    ...props
}: Readonly<ImageProps>) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    const placeholderWidth = width ?? 100
    const placeholderHeight = height ?? 100

    const formattedFallbackSrc = fallbackSrc === "/placeholder.svg"
        ? `${fallbackSrc}?height=${placeholderHeight}&width=${placeholderWidth}`
        : fallbackSrc

    const aspectRatioClasses = {
        square: "aspect-square",
        video: "aspect-video",
        portrait: "aspect-[3/4]",
        auto: "",
    }


    return (
        <div
            className={cn(
                "relative overflow-hidden",
                aspectRatio !== "auto" && aspectRatioClasses[aspectRatio],
                containerClassName,
            )}
        >
            {showSkeleton && isLoading && !error && <Skeleton className={cn("absolute inset-0 z-10", className)} />}

            <NextImage
                src={error ? formattedFallbackSrc : (src ?? formattedFallbackSrc)}
                alt={error ? fallbackAlt : alt}
                fill={fill}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                className={cn(
                    "transition-opacity duration-300",
                    isLoading && "opacity-0",
                    !isLoading && "opacity-100",
                    className,
                )}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false)
                    setError(true)
                }}
                {...props}
            />
        </div>
    )
}

