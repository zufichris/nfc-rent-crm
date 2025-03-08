"use client"
import { useState } from "react"
import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Upload, X } from "lucide-react"
import { Button } from "../ui/button"

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


interface ImageUploadProps {
    value?: string
    onChange: (value: string) => void
    placeholder?: string
    aspectRatio?: string
    className?: string
    disabled?: boolean
}

export function ImageUpload({
    value,
    onChange,
    placeholder = "Upload an image",
    aspectRatio = "1:1",
    className,
    disabled = false,
}: ImageUploadProps) {
    const [isHovering, setIsHovering] = useState(false)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(file.name)}`
            onChange(imageUrl)
        }
    }

    const handleRemove = () => {
        onChange("")
    }

    const aspectRatioClass = aspectRatio === "16:9" ? "aspect-video" : "aspect-square"

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-md border border-input bg-background",
                aspectRatioClass,
                className,
            )}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {value ? (
                <>
                    <Image src={value || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
                    {isHovering && !disabled && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <Button type="button" variant="destructive" size="sm" onClick={handleRemove}>
                                <X className="mr-2 h-4 w-4" />
                                Remove
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <label
                    htmlFor="image-upload"
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center"
                >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{placeholder}</p>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={disabled}
                    />
                </label>
            )}
        </div>
    )
}

