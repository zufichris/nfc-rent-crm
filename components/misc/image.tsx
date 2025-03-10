"use client"
import { useEffect, useRef, useState } from "react"
import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageIcon, Upload, X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export interface ImageProps extends Omit<NextImageProps, "src" | "onError" | "onLoad"> {
    fallbackSrc?: string
    fallbackAlt?: string
    showSkeleton?: boolean
    aspectRatio?: "square" | "video" | "portrait" | "auto"
    containerClassName?: string
    src?: string | null
    onError?: () => void
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
    onError,
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
                    onError?.()
                }}
                {...props}
            />
        </div>
    )
}

type Safe =
    | Readonly<{
        multiple?: false
        onChange?: (value: string) => void
        value?: string
    }>
    | Readonly<{
        multiple: true
        value?: string[]
        onChange?: (value: string[]) => void
    }>

type ImageUploadProps = {
    id?: string
    placeholder?: string
    className?: string
    disabled?: boolean
    maxFileSize?: number // in MB
    aspectRatio?: number // width/height
    imageClassName?: string
} & Safe

export function ImageUpload({
    id = "image-upload",
    onChange,
    placeholder = "Upload an image",
    className,
    disabled = false,
    multiple,
    value,
    maxFileSize = 5,
    aspectRatio,
    imageClassName,
}: Readonly<ImageUploadProps>) {
    const isMultiple = multiple ?? false
    const [isHovering, setIsHovering] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const urlsRef = useRef<string[]>([])

    useEffect(() => {
        const currentUrls = isMultiple && Array.isArray(value) ? value : value ? [value as string] : []
        urlsRef.current = currentUrls
    }, [value, isMultiple])

    useEffect(() => {
        return () => {
            urlsRef.current.forEach((url) => {
                if (url.startsWith("blob:")) {
                    URL.revokeObjectURL(url)
                }
            })
        }
    }, [])

    const validateFile = (file: File): boolean => {
        if (file.size > maxFileSize * 1024 * 1024) {
            setError(`File size exceeds ${maxFileSize}MB limit`)
            return false
        }

        if (!file.type.startsWith("image/")) {
            setError("Only image files are allowed")
            return false
        }

        setError(null)
        return true
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return
        setError(null)

        if (isMultiple) {
            const files = Array.from(e.target.files).filter(validateFile)
            if (!files.length) return

            const urls = files.map((file) => URL.createObjectURL(file))
            const currentValue = Array.isArray(value) ? value : []
            onChange?.(currentValue.concat(urls) as any)
        } else {
            const file = e.target.files[0]
            if (!validateFile(file)) return

            if (typeof value === "string" && value.startsWith("blob:")) {
                URL.revokeObjectURL(value)
            }

            const url = URL.createObjectURL(file)
            onChange?.(url as any)
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsHovering(false)

        if (disabled || !e.dataTransfer.files.length) return
        setError(null)

        if (isMultiple) {
            const files = Array.from(e.dataTransfer.files).filter(validateFile)
            if (!files.length) return

            const urls = files.map((file) => URL.createObjectURL(file))
            const currentValue = Array.isArray(value) ? value : []
            onChange?.(currentValue.concat(urls) as any)
        } else {
            const file = e.dataTransfer.files[0]
            if (!validateFile(file)) return

            if (typeof value === "string" && value.startsWith("blob:")) {
                URL.revokeObjectURL(value)
            }

            const url = URL.createObjectURL(file)
            onChange?.(url as any)
        }
    }

    function handleRemove(urlToRemove: string, e?: React.MouseEvent) {
        e?.preventDefault()
        e?.stopPropagation()

        if (isMultiple && Array.isArray(value)) {
            onChange?.(value.filter((url) => url !== urlToRemove) as any)
        } else {
            onChange?.("" as any)
        }

        if (urlToRemove.startsWith("blob:")) {
            URL.revokeObjectURL(urlToRemove)
        }
    }

    const hasImages = isMultiple ? Array.isArray(value) && value.length > 0 : Boolean(value)

    return (
        <div className={cn("space-y-2", className)}>
            <div
                className={cn(
                    "relative border-2 border-dashed  rounded-lg p-4 transition-colors",
                    isHovering ? "border-primary" : "border-border",
                    disabled && "opacity-50 cursor-not-allowed",
                )}
                onDragOver={(e) => {
                    e.preventDefault()
                    if (!disabled) setIsHovering(true)
                }}
                onDragLeave={() => setIsHovering(false)}
                onDrop={handleDrop}
                aria-describedby={`${id}-description`}
            >
                <Input
                    type="file"
                    id={id}
                    ref={fileInputRef}
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={disabled}
                    accept="image/*"
                    multiple={isMultiple}
                    aria-invalid={!!error}
                />

                <Label
                    htmlFor={id}
                    className={cn(
                        "flex flex-col items-center justify-center cursor-pointer ",
                        disabled && "cursor-not-allowed",
                    )}
                >
                    {!hasImages ? (
                        <div className="flex flex-col items-center justify-center text-center p-4">
                            <div className="mb-2 rounded-full bg-muted p-2">
                                <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-medium">{placeholder}</p>
                            <p id={`${id}-description`} className="text-xs text-muted-foreground mt-1">
                                Drag and drop or click to browse
                            </p>
                            {maxFileSize && <p className="text-xs text-muted-foreground mt-1">Max file size: {maxFileSize}MB</p>}
                        </div>
                    ) : (
                        <div className={cn("w-full", isMultiple && "grid grid-cols-2 md:grid-cols-3 gap-4")}>
                            {isMultiple && Array.isArray(value) ? (
                                value.map((url, index) => (
                                    <div
                                        key={`${url}-${index}`}
                                        className="relative group aspect-square rounded-md overflow-hidden border"
                                    >
                                        <NextImage fill onError={() => handleRemove(url)} src={url} alt={`Uploaded image ${index + 1}`} className={cn("object-cover transition-opacity", imageClassName)} />

                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={(e) => handleRemove(url, e)}
                                                className="h-8 w-8"
                                                aria-label={`Remove image ${index + 1}`}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="relative group w-full">
                                    <div
                                        className={cn(
                                            "relative rounded-md overflow-hidden border",
                                            aspectRatio ? "w-full" : "aspect-video w-full",
                                        )}
                                        style={aspectRatio ? { aspectRatio: `${aspectRatio}` } : undefined}
                                    >
                                        <NextImage fill onError={() => handleRemove(value as string)} src={value as any} alt={`Uploaded image`} className={cn("object-cover transition-opacity", imageClassName)} />
                                        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={(e) => handleRemove(value as string, e)}
                                                className="h-8 w-8"
                                                aria-label="Remove image"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Label>
            </div>

            {error && <p className="text-sm text-destructive mt-1">{error}</p>}

            {isMultiple && Array.isArray(value) && value.length > 0 && (
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        {value.length} {value.length === 1 ? "image" : "images"} uploaded
                    </p>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={disabled}
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Add more
                    </Button>
                </div>
            )}
        </div>
    )
}