"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Image, ImageUpload } from "@/components/misc/image"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
    CarCategory,
    CarInspectionStatus,
    CarListingType,
    CarStatus,
    FuelType,
    type ICarMedia,
    TransmissionType,
    CarCondition,
    CarDocumentType,
} from "@/types/car"
import { CarModelsSelect } from "@/components/models/models-select"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CarPricingUnit, Currencies, type RentalPricingDto } from "@/types/pricing"
import { CarFeaturesSelect } from "@/components/feature/car-features-input"
import { Languages, type Locale } from "@/types/language"
import { Badge } from "@/components/ui/badge"
import type { CarFormReturnType } from "."
import { MediaType } from "@/types/media"
import type { CarRentalPricingSchema, CarTranslationsSchema } from "./schema"
import type { z } from "zod"
import { ColorInput } from "@/components/misc/color-input"
import { TagInput } from "@/components/misc/tag"
import { Path } from "react-hook-form"

export function CarFormSteps({ currentStep, form }: Readonly<{ form: CarFormReturnType; currentStep: number }>) {
    const steps: Record<number, React.JSX.Element> = {
        0: <BasicDetails form={form} />,
        1: <Specifications form={form} />,
        2: <Media form={form} />,
        3: <Documents form={form} />,
        4: <Owner form={form} />,
        5: <FeaturesAndPricing form={form} />,
        6: <Translation form={form} />,
        7: <Review form={form} />,
    }
    return steps[currentStep]
}

function BasicDetails({ form }: Readonly<{ form: CarFormReturnType }>) {
    return (
        <Card>
            <CardContent className="pt-6 space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="vin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>VIN*</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter vehicle identification number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="blockchainId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Blockchain ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter blockchain identifier" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Model*</FormLabel>
                                <FormControl>
                                    <CarModelsSelect
                                        onChange={(modelId) => {
                                            field.onChange(modelId)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Year*</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter year"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category*</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(CarCategory).map((value) => (
                                            <SelectItem key={value} value={value}>
                                                {value.replace("_"," ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="metaverseAssetId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Metaverse Asset ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter metaverse asset ID" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="fuelType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fuel Type*</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select fuel type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(FuelType).map(([key, value]) => (
                                            <SelectItem key={key} value={value}>
                                                {value.replace(/_/g, " ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="transmission"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Transmission*</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select transmission" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(TransmissionType).map(([key, value]) => (
                                            <SelectItem key={key} value={value}>
                                                {value.replace(/_/g, " ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="doors"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Doors*</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter number of doors"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="seats"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Seats*</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter number of seats"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="currentStatus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Status*</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(CarStatus).map(([key, value]) => (
                                            <SelectItem key={key} value={value}>
                                                {value.replace(/_/g, " ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="listingType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Listing Type*</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Listing Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(CarListingType).map((value) => (
                                            <SelectItem key={value} value={value}>
                                                {value.replace("_"," ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="mileage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mileage (km)*</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter mileage"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="condition"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Condition*</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select condition" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(CarCondition).map(([key, value]) => (
                                            <SelectItem key={key} value={value}>
                                                {value.replace(/_/g, " ")}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="acquisitionDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Acquisition Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...(field as any)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

function Specifications({ form }: Readonly<{ form: CarFormReturnType }>) {
    return (
        <div className="space-y-8">
            <Card>
                <CardContent className="pt-6 space-y-6">
                    <h3 className="text-lg font-medium">Engine Specifications</h3>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="engineSpecs.type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Engine Type*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter engine type" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="engineSpecs.horsepower"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Horsepower (HP)*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter horsepower"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="engineSpecs.torque"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Torque (Nm)*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter torque"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="engineSpecs.displacement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Displacement (cc)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter displacement"
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="engineSpecs.acceleration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Acceleration (0-100 km/h in seconds)*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter acceleration"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="engineSpecs.topSpeed"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Top Speed (km/h)*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter top speed"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="engineSpecs.batteryCapacity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Battery Capacity (kWh)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter battery capacity"
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="engineSpecs.range"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Range (km)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter range"
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="engineSpecs.size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size (L)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter engine size"
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="fuelTankSize"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fuel Tank Size (L)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter fuel tank size"
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6 space-y-6">
                    <h3 className="text-lg font-medium">Dimensions</h3>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="dimensions.length"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Length (mm)*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter length"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dimensions.width"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Width (mm)*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter width"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="dimensions.height"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Height (mm)*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter height"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dimensions.weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weight (kg)*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter weight"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="dimensions.cargoCapacity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cargo Capacity (L)*</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter cargo capacity"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6 space-y-6">
                    <h3 className="text-lg font-medium">Inspection Details</h3>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="inspectionStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Inspection Status*</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.entries(CarInspectionStatus).map(([key, value]) => (
                                                <SelectItem key={key} value={value}>
                                                    {value.replace(/_/g, " ")}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastInspectionDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Inspection Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...(field as any)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="nextInspectionDueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Next Inspection Due Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...(field as any)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

function Media({ form }: Readonly<{ form: CarFormReturnType }>) {
    const [mediaItems, setMediaItems] = useState<ICarMedia[]>(
        form.getValues("media")?.map((m, i) => ({
            isThumbnail: m.isThumbnail ?? false,
            type: (m.type as MediaType) ?? MediaType.IMAGE,
            url: m.url ?? "#",
            position: m.position ?? i,
            description: m.description ?? "",
            title: m.title ?? "",
        })) ?? [],
    )

    const addMediaItem = () => {
        const newMedia = [
            ...mediaItems,
            {
                url: "",
                type: MediaType.IMAGE,
                isThumbnail: mediaItems.length === 0,
                title: "",
                description: "",
                position: mediaItems.length,
            },
        ]
        setMediaItems(newMedia)
        form.setValue("media", newMedia)
    }

    const removeMediaItem = (index: number) => {
        const newMedia = [...mediaItems]
        newMedia.splice(index, 1)
        if (mediaItems[index].isThumbnail && newMedia.length > 0) {
            newMedia[0].isThumbnail = true
        }
        setMediaItems(newMedia)
        form.setValue("media", newMedia)
    }

    const setAsThumbnail = (index: number) => {
        const newMedia = mediaItems.map((item, i) => ({
            ...item,
            isThumbnail: i === index,
        }))
        setMediaItems(newMedia)
        form.setValue("media", newMedia)
    }

    return (
        <Card>
            <CardContent className="pt-6 space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Car Images</h3>
                    <Button type="button" variant="outline" onClick={addMediaItem}>
                        Add Image
                    </Button>
                </div>

                {mediaItems.length === 0 ? (
                    <div className="text-center p-8 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">No images added yet. Click "Add Image" to upload car images.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {mediaItems.map((media, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-medium">Image {index + 1}</h4>
                                    <div className="flex gap-2">
                                        {!media.isThumbnail && (
                                            <Button type="button" variant="outline" size="sm" onClick={() => setAsThumbnail(index)}>
                                                Set as Thumbnail
                                            </Button>
                                        )}
                                        <Button type="button" variant="destructive" size="sm" onClick={() => removeMediaItem(index)}>
                                            Remove
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name={`media.${index}.url`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Image URL*</FormLabel>
                                                    <FormControl>
                                                        <ImageUpload
                                                            id={`media-${index}-upload`}
                                                            value={field.value}
                                                            onChange={(url) => {
                                                                field.onChange(url)
                                                                const newMedia = [...mediaItems]
                                                                newMedia[index].url = url
                                                                setMediaItems(newMedia)
                                                            }}
                                                            placeholder="Upload image"
                                                            aspectRatio={16 / 9}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name={`media.${index}.title`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter image title"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e)
                                                                const newMedia = [...mediaItems]
                                                                newMedia[index].title = e.target.value
                                                                setMediaItems(newMedia)
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`media.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Enter image description"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e)
                                                                const newMedia = [...mediaItems]
                                                                newMedia[index].description = e.target.value
                                                                setMediaItems(newMedia)
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex items-center space-x-2 pt-2">
                                            <Checkbox
                                                id={`thumbnail-${index}`}
                                                checked={media.isThumbnail}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setAsThumbnail(index)
                                                    }
                                                }}
                                                disabled={media.isThumbnail}
                                            />
                                            <Label htmlFor={`thumbnail-${index}`} className={media.isThumbnail ? "font-bold" : ""}>
                                                {media.isThumbnail ? "Primary Thumbnail" : "Set as thumbnail"}
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

function Documents({ form }: Readonly<{ form: CarFormReturnType }>) {
    const [documents, setDocuments] = useState<any[]>(form.getValues("documents") || [])

    const addDocument = () => {
        const newDoc = {
            type: "",
            title: "",
            fileUrl: "",
            issueDate: new Date(),
            expiryDate: undefined,
            isVerified: false,
            verificationDate: undefined,
        }
        const newDocs = [...documents, newDoc]
        setDocuments(newDocs)
        form.setValue("documents", newDocs)
    }

    const removeDocument = (index: number) => {
        const newDocs = [...documents]
        newDocs.splice(index, 1)
        setDocuments(newDocs)
        form.setValue("documents", newDocs)
    }

    return (
        <Card>
            <CardContent className="pt-6 space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Car Documents</h3>
                    <Button type="button" variant="outline" onClick={addDocument}>
                        Add Document
                    </Button>
                </div>

                {documents.length === 0 ? (
                    <div className="text-center p-8 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">
                            No documents added yet. Click "Add Document" to upload car documents.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {documents.map((doc, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-medium">Document {index + 1}</h4>
                                    <Button type="button" variant="destructive" size="sm" onClick={() => removeDocument(index)}>
                                        Remove
                                    </Button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name={`documents.${index}.type`}
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Document type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(CarDocumentType).map(dt => (
                                                        <SelectItem value={dt}>{dt}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`documents.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter document title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name={`documents.${index}.fileUrl`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>File URL*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter document URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name={`documents.${index}.issueDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Issue Date*</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...(field as any)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`documents.${index}.expiryDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Expiry Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...(field as any)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name={`documents.${index}.isVerified`}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>Document is verified</FormLabel>
                                                    <FormDescription>Check if this document has been verified</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {form.watch(`documents.${index}.isVerified`) && (
                                        <FormField
                                            control={form.control}
                                            name={`documents.${index}.verificationDate`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Verification Date</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...(field as any)} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

function Owner({ form }: Readonly<{ form: CarFormReturnType }>) {
    return (
        <Card>
            <CardContent className="pt-6 space-y-8">
                <h3 className="text-lg font-medium">Ownership Details</h3>

                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="owner.ownerId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Owner ID*</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter owner identifier" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="owner.ownerType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Owner Type*</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select owner type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="User">User</SelectItem>
                                        <SelectItem value="Company">Company</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="owner.percentage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ownership Percentage*</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter ownership percentage"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="owner.nftId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>NFT ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter NFT identifier" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="owner.acquiredDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Acquired Date*</FormLabel>
                                <FormControl>
                                    <Input type="date" {...(field as any)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="owner.transferDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Transfer Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...(field as any)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="owner.status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ownership Status*</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Transferred">Transferred</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}

function FeaturesAndPricing({ form }: Readonly<{ form: CarFormReturnType }>) {
    const [pricingItems, setPricingItems] = useState<z.infer<typeof CarRentalPricingSchema>>(
        form.getValues("rentalPricings")?.map((p) => ({
            currency: (p.currency as Currencies) ?? Currencies.USD,
            duration: Number(p.duration) ?? 0,
            unit: p.unit ?? CarPricingUnit.DAY,
            price: p.price ?? 0,
            mileageLimit: p.mileageLimit ?? 0,
        })) ?? [],
    )

    const addPricingItem = () => {
        const newPricing = [
            ...pricingItems,
            {
                currency: Currencies.USD,
                duration: 1,
                price: 0,
                unit: CarPricingUnit.DAY,
                mileageLimit: 0,
            },
        ]
        setPricingItems(newPricing)
        form.setValue("rentalPricings", newPricing)
    }

    const removePricingItem = (index: number) => {
        const newPricing = [...pricingItems]
        newPricing.splice(index, 1)
        setPricingItems(newPricing)
        form.setValue("rentalPricings", newPricing)
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardContent className="pt-6 space-y-6">
                    <h3 className="text-lg font-medium">Features</h3>

                    <FormField
                        control={form.control}
                        name="features"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Car Features</FormLabel>
                                <FormControl>
                                    <CarFeaturesSelect onChange={field.onChange} />
                                </FormControl>
                                <FormDescription>
                                    Add features like "Leather Seats", "Panoramic Roof", "Navigation System", etc.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Rental Pricing</h3>
                        <Button type="button" variant="outline" onClick={addPricingItem}>
                            Add Pricing Option
                        </Button>
                    </div>

                    {pricingItems.map((pricing, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium">Pricing Option {index + 1}</h4>
                                {pricingItems.length > 1 && (
                                    <Button type="button" variant="destructive" size="sm" onClick={() => removePricingItem(index)}>
                                        Remove
                                    </Button>
                                )}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name={`rentalPricings.${index}.duration`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter duration"
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`rentalPricings.${index}.unit`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unit</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                    const newPricing = [...pricingItems]
                                                    newPricing[index].unit = value as any
                                                    setPricingItems(newPricing)
                                                }}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select unit" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.entries(CarPricingUnit).map(([key, value]) => (
                                                        <SelectItem key={key} value={value}>
                                                            {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name={`rentalPricings.${index}.price`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter price"
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`rentalPricings.${index}.currency`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Currency</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                    const newPricing = [...pricingItems]
                                                    newPricing[index].currency = value as any
                                                    setPricingItems(newPricing)
                                                }}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select currency" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(Currencies).map((v) => (
                                                        <SelectItem key={v} value={v}>
                                                            {v}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-6 space-y-6">
                    <h3 className="text-lg font-medium">Security Deposit</h3>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="securityDeposit.amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deposit Amount*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter deposit amount"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="securityDeposit.currency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Currency*</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select currency" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(Currencies).map((v) => (
                                                <SelectItem key={v} value={v}>
                                                    {v}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


function Translation({ form }: Readonly<{ form: CarFormReturnType }>) {
    const [activeLocale, setActiveLocale] = useState<Locale>("en");
    const [isInitialized, setIsInitialized] = useState(false);

    const orderedLanguages = useMemo(() => 
        [...Languages].sort((a, b) => a.code === "en" ? -1 : b.code === "en" ? 1 : 0)
    , []);

    useEffect(() => {
        if (isInitialized) return;

        const currentTranslations = form.getValues("translations") || [];
        const defaultStructure = orderedLanguages.map(lang => ({
            locale: lang.code,
            name: "",
            color: { name: "White", code: "#FFFFFF" },
            interiorColor: { name: "White", code: "#000000" },
            shortDescription: "",
            description: "",
            metaTitle: "",
            metaDescription: "",
            metaTags: [],
        }));

        const merged = defaultStructure.map(def => {
            const existing = currentTranslations.find(t => t.locale === def.locale);
            return existing ? { ...def, ...existing } : def;
        });

        form.setValue("translations", merged);
        setIsInitialized(true);
    }, [form, isInitialized, orderedLanguages]);

    const translations = form.watch("translations") || [];

    const handleSyncTranslation = (targetLocale: Locale) => {
        const englishTranslation = translations.find(t => t.locale === "en");
        if (!englishTranslation) return;

        form.setValue("translations", translations.map(t => 
            t.locale === targetLocale ? { ...englishTranslation, locale: targetLocale } : t
        ));
        toast.success(`Copied from English to ${Languages.find(l => l.code === targetLocale)?.name}`);
    };


    function TextSection({ form, locale, index }: { 
        form: CarFormReturnType, 
        locale: Locale,
        index: number
    }) {
        return (
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name={`translations.${index}.name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name ({locale})</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={`Car name in ${locale}`}
                                    {...field}
                                    value={field.value as string}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
    
                <FormField
                    control={form.control}
                    name={`translations.${index}.shortDescription`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description ({locale})</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={`Short description in ${locale}`}
                                    className="h-32 resize-none"
                                    {...field}
                                    value={field.value as string}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
    
                <FormField
                    control={form.control}
                    name={`translations.${index}.description`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Description ({locale})</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={`Full description in ${locale}`}
                                    className="min-h-[200px] resize-y"
                                    {...field}
                                    value={field.value as string}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        );
    }
    
    function ColorSection({ form, index, locale }: { 
        form: CarFormReturnType, 
        index: number, 
        locale: Locale 
    }) {
        return (
            <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium">Color Information</h4>
                
                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name={`translations.${index}.color.name`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color Name ({locale})</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={`Color name in ${locale}`}
                                        {...field}
                                        value={field.value as string}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
    
                    <FormField
                        control={form.control}
                        name={`translations.${index}.color.code`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color Code</FormLabel>
                                <FormControl>
                                    <ColorInput 
                                        value={field.value as string} 
                                        onChange={field.onChange} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
    
                <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name={`translations.${index}.interiorColor.name`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Interior Color Name ({locale})</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={`Interior color name in ${locale}`}
                                        {...field}
                                        value={field.value as string}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
    
                    <FormField
                        control={form.control}
                        name={`translations.${index}.interiorColor.code`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Interior Color Code</FormLabel>
                                <FormControl>
                                    <ColorInput 
                                        value={field.value as string} 
                                        onChange={field.onChange} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        );
    }
    
    function SeoSection({ form, index, locale }: { 
        form: CarFormReturnType, 
        index: number, 
        locale: Locale 
    }) {
        return (
            <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium">SEO Metadata</h4>
    
                <FormField
                    control={form.control}
                    name={`translations.${index}.metaTitle`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Meta Title ({locale})</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={`Meta title in ${locale}`}
                                    {...field}
                                    value={field.value as string}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
    
                <FormField
                    control={form.control}
                    name={`translations.${index}.metaDescription`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Meta Description ({locale})</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={`Meta description in ${locale}`}
                                    className="h-20 resize-none"
                                    {...field}
                                    value={field.value as string}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
    
                <FormField
                    control={form.control}
                    name={`translations.${index}.metaTags`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Meta Tags ({locale})</FormLabel>
                            <FormControl>
                                <TagInput
                                    placeholder={`Meta tags in ${locale} (comma separated)`}
                                    tags={field.value as string[]}
                                    setTags={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>
                                Separate tags with commas (e.g. luxury, sedan, rental)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        );
    }
    return (
        <Card>
            <CardContent className="pt-6 space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Translations</h3>
                </div>

                <Tabs value={activeLocale} onValueChange={v => setActiveLocale(v as Locale)}>
                    <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {orderedLanguages.map((lang) => (
                            translations.some(t => t.locale === lang.code) && (
                                <TabsTrigger key={lang.code} value={lang.code}>
                                    {lang.name}
                                </TabsTrigger>
                            )
                        ))}
                    </TabsList>

                    {orderedLanguages.map((lang, index) => {
                        const translation = translations.find(t => t.locale === lang.code);
                        if (!translation) return null;

                        return (
                            <TabsContent key={lang.code} value={lang.code} className="space-y-6">
                                <div className="flex justify-end gap-3">
                                    {lang.code !== "en" && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSyncTranslation(lang.code)}
                                        >
                                            Copy from English
                                        </Button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <TextSection form={form} locale={lang.code} index={index} />
                                    <ColorSection form={form} locale={lang.code} index={index} />
                                    <SeoSection form={form} locale={lang.code} index={index} />
                                </div>
                            </TabsContent>
                        );
                    })}
                </Tabs>
            </CardContent>
        </Card>
    );
}



function Review({ form }: Readonly<{ form: CarFormReturnType, }>) {
    const formValues = form.getValues()
    const mainTranslation = formValues.translations?.find((t) => t.locale === "en")
    return (
        <div className="space-y-8">
            <Card>
                <CardContent className="pt-6 space-y-6">
                    <h3 className="text-lg font-medium">Review Your Car</h3>
                    <Accordion type="single" collapsible defaultValue="basic" className="space-y-4">
                        <AccordionItem value="basic">
                            <AccordionTrigger>Basic Information</AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <Label className="font-medium text-sm">Name</Label>
                                        <p className="text-sm">{mainTranslation?.name || "Not provided"}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">VIN</Label>
                                        <p className="text-sm">{formValues.vin || "Not provided"}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Blockchain ID</Label>
                                        <p className="text-sm">{formValues.blockchainId || "Not provided"}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Model</Label>
                                        <p className="text-sm">{formValues.model || "Not provided"}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Year</Label>
                                        <p className="text-sm">{formValues.year || "Not provided"}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Category</Label>
                                        <p className="text-sm capitalize">
                                            {formValues.category?.toLowerCase().replace(/_/g, " ") || "Not provided"}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Metaverse Asset ID</Label>
                                        <p className="text-sm">{formValues.metaverseAssetId || "Not provided"}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Status</Label>
                                        <p className="text-sm capitalize">
                                            {formValues.currentStatus?.toLowerCase().replace(/_/g, " ") || "Not provided"}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Listing Type</Label>
                                        <Badge variant="secondary" className="capitalize">
                                            {formValues.listingType?.replace(/_/g, " ").toLowerCase() || "Not provided"}
                                        </Badge>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Mileage</Label>
                                        <p className="text-sm">{formValues.mileage ? `${formValues.mileage} km` : "Not provided"}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Condition</Label>
                                        <p className="text-sm capitalize">
                                            {formValues.condition?.toLowerCase().replace(/_/g, " ") || "Not provided"}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Acquisition Date</Label>
                                        <p className="text-sm">
                                            {formValues.acquisitionDate
                                                ? new Date(formValues.acquisitionDate).toLocaleDateString()
                                                : "Not provided"}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Fuel Type</Label>
                                        <p className="text-sm capitalize">
                                            {formValues.fuelType?.toLowerCase().replace(/_/g, " ") || "Not provided"}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Transmission</Label>
                                        <p className="text-sm capitalize">
                                            {formValues.transmission?.toLowerCase().replace(/_/g, " ") || "Not provided"}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Doors</Label>
                                        <p className="text-sm">{formValues.doors || "Not provided"}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Seats</Label>
                                        <p className="text-sm">{formValues.seats || "Not provided"}</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="specs">
                            <AccordionTrigger>Specifications</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-6">
                                    <div>
                                        <Label className="font-medium text-sm">Engine Specifications</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Engine Type</Label>
                                                <p className="text-sm">{formValues.engineSpecs?.type || "Not provided"}</p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Horsepower</Label>
                                                <p className="text-sm">
                                                    {formValues.engineSpecs?.horsepower
                                                        ? `${formValues.engineSpecs.horsepower} HP`
                                                        : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Torque</Label>
                                                <p className="text-sm">
                                                    {formValues.engineSpecs?.torque ? `${formValues.engineSpecs.torque} Nm` : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Displacement</Label>
                                                <p className="text-sm">
                                                    {formValues.engineSpecs?.displacement
                                                        ? `${formValues.engineSpecs.displacement} cc`
                                                        : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Acceleration (0-100 km/h)</Label>
                                                <p className="text-sm">
                                                    {formValues.engineSpecs?.acceleration
                                                        ? `${formValues.engineSpecs.acceleration}s`
                                                        : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Top Speed</Label>
                                                <p className="text-sm">
                                                    {formValues.engineSpecs?.topSpeed
                                                        ? `${formValues.engineSpecs.topSpeed} km/h`
                                                        : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Battery Capacity</Label>
                                                <p className="text-sm">
                                                    {formValues.engineSpecs?.batteryCapacity
                                                        ? `${formValues.engineSpecs.batteryCapacity} kWh`
                                                        : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Range</Label>
                                                <p className="text-sm">
                                                    {formValues.engineSpecs?.range ? `${formValues.engineSpecs.range} km` : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Engine Size</Label>
                                                <p className="text-sm">
                                                    {formValues.engineSpecs?.size ? `${formValues.engineSpecs.size} L` : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Fuel Tank Size</Label>
                                                <p className="text-sm">
                                                    {formValues.fuelTankSize ? `${formValues.fuelTankSize} L` : "Not provided"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="font-medium text-sm">Dimensions</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Length</Label>
                                                <p className="text-sm">
                                                    {formValues.dimensions?.length ? `${formValues.dimensions.length} mm` : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Width</Label>
                                                <p className="text-sm">
                                                    {formValues.dimensions?.width ? `${formValues.dimensions.width} mm` : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Height</Label>
                                                <p className="text-sm">
                                                    {formValues.dimensions?.height ? `${formValues.dimensions.height} mm` : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Weight</Label>
                                                <p className="text-sm">
                                                    {formValues.dimensions?.weight ? `${formValues.dimensions.weight} kg` : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Cargo Capacity</Label>
                                                <p className="text-sm">
                                                    {formValues.dimensions?.cargoCapacity
                                                        ? `${formValues.dimensions.cargoCapacity} L`
                                                        : "Not provided"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="font-medium text-sm">Inspection Details</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Inspection Status</Label>
                                                <p className="text-sm capitalize">
                                                    {formValues.inspectionStatus?.toLowerCase().replace(/_/g, " ") || "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Last Inspection Date</Label>
                                                <p className="text-sm">
                                                    {formValues.lastInspectionDate
                                                        ? new Date(formValues.lastInspectionDate).toLocaleDateString()
                                                        : "Not provided"}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Next Inspection Due Date</Label>
                                                <p className="text-sm">
                                                    {formValues.nextInspectionDueDate
                                                        ? new Date(formValues.nextInspectionDueDate).toLocaleDateString()
                                                        : "Not provided"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="documents">
                            <AccordionTrigger>Documents</AccordionTrigger>
                            <AccordionContent>
                                {formValues.documents && formValues.documents.length > 0 ? (
                                    <div className="space-y-4">
                                        {formValues.documents.map((doc, index) => (
                                            <div key={index} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h4 className="font-medium">{doc.title || `Document ${index + 1}`}</h4>
                                                    {doc.isVerified && (
                                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                            Verified
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label className="text-xs text-muted-foreground">Type</Label>
                                                        <p className="text-sm">{doc.type || "Not specified"}</p>
                                                    </div>
                                                    <div>
                                                        <Label className="text-xs text-muted-foreground">File</Label>
                                                        <p className="text-sm truncate">
                                                            <a
                                                                href={doc.fileUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-primary hover:underline"
                                                            >
                                                                View Document
                                                            </a>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Label className="text-xs text-muted-foreground">Issue Date</Label>
                                                        <p className="text-sm">
                                                            {doc.issueDate ? new Date(doc.issueDate).toLocaleDateString() : "Not specified"}
                                                        </p>
                                                    </div>
                                                    {doc.expiryDate && (
                                                        <div>
                                                            <Label className="text-xs text-muted-foreground">Expiry Date</Label>
                                                            <p className="text-sm">{new Date(doc.expiryDate).toLocaleDateString()}</p>
                                                        </div>
                                                    )}
                                                    {doc.isVerified && doc.verificationDate && (
                                                        <div>
                                                            <Label className="text-xs text-muted-foreground">Verification Date</Label>
                                                            <p className="text-sm">{new Date(doc.verificationDate).toLocaleDateString()}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No documents added</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="owner">
                            <AccordionTrigger>Ownership Details</AccordionTrigger>
                            <AccordionContent>
                                {formValues.owner ? (
                                    <div className="border rounded-lg p-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Owner ID</Label>
                                                <p className="text-sm">{formValues.owner.ownerId || "Not specified"}</p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Owner Type</Label>
                                                <p className="text-sm">{formValues.owner.ownerType || "Not specified"}</p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Ownership Percentage</Label>
                                                <p className="text-sm">
                                                    {formValues.owner.percentage ? `${formValues.owner.percentage}%` : "Not specified"}
                                                </p>
                                            </div>
                                            {formValues.owner.nftId && (
                                                <div>
                                                    <Label className="text-xs text-muted-foreground">NFT ID</Label>
                                                    <p className="text-sm">{formValues.owner.nftId}</p>
                                                </div>
                                            )}
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Acquired Date</Label>
                                                <p className="text-sm">
                                                    {formValues.owner.acquiredDate
                                                        ? new Date(formValues.owner.acquiredDate).toLocaleDateString()
                                                        : "Not specified"}
                                                </p>
                                            </div>
                                            {formValues.owner.transferDate && (
                                                <div>
                                                    <Label className="text-xs text-muted-foreground">Transfer Date</Label>
                                                    <p className="text-sm">{new Date(formValues.owner.transferDate).toLocaleDateString()}</p>
                                                </div>
                                            )}
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Status</Label>
                                                <p className="text-sm">
                                                    <Badge
                                                        variant={
                                                            formValues.owner.status === "Active"
                                                                ? "success"
                                                                : formValues.owner.status === "Pending"
                                                                    ? "warning"
                                                                    : "secondary"
                                                        }
                                                    >
                                                        {formValues.owner.status || "Not specified"}
                                                    </Badge>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No ownership details provided</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="features">
                            <AccordionTrigger>Features & Pricing</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-6">
                                    <div>
                                        <Label className="font-medium text-sm">Features</Label>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {formValues.features?.length ? (
                                                formValues.features.map((feature: string, index: number) => (
                                                    <Badge key={index} variant="outline">
                                                        {feature}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <p className="text-sm text-muted-foreground">No features added</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="font-medium text-sm">Rental Pricing</Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                            {formValues.rentalPricings?.length ? (
                                                formValues.rentalPricings.map((pricing, index) => (
                                                    <div key={index} className="border rounded-md p-3">
                                                        <div className="text-lg font-bold">
                                                            {pricing.price} {pricing.currency}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {pricing.duration && `${pricing.duration} `}
                                                            {pricing.unit && pricing.unit.toLowerCase()}
                                                            {pricing.duration && pricing.duration > 1 ? "s" : ""}
                                                        </div>
                                                        {pricing.mileageLimit > 0 && (
                                                            <div className="text-sm mt-1">Mileage limit: {pricing.mileageLimit} km</div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-muted-foreground">No pricing options added</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="font-medium text-sm">Security Deposit</Label>
                                        {formValues.securityDeposit?.amount ? (
                                            <div className="border rounded-md p-3 mt-2 inline-block">
                                                <div className="text-lg font-bold">
                                                    {formValues.securityDeposit.amount} {formValues.securityDeposit.currency}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-muted-foreground mt-1">No security deposit specified</p>
                                        )}
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="media">
                            <AccordionTrigger>Media</AccordionTrigger>
                            <AccordionContent>
                                {formValues.media && formValues.media.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {formValues.media.map((media, index) => (
                                            <div key={index} className="relative">
                                                <div className="aspect-square rounded-md overflow-hidden">
                                                    <Image
                                                        src={media.url || "/placeholder.svg"}
                                                        alt={media.title || `Car image ${index + 1}`}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                {media.isThumbnail && (
                                                    <Badge className="absolute top-2 right-2" variant="secondary">
                                                        Thumbnail
                                                    </Badge>
                                                )}
                                                {media.title && <p className="text-sm mt-1 font-medium truncate">{media.title}</p>}
                                                {media.description && (
                                                    <p className="text-xs text-muted-foreground truncate">{media.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No images added</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="translations">
                            <AccordionTrigger>Translations</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    {formValues.translations?.map((translation) => (
                                        <div key={translation.locale} className="border rounded-md p-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs uppercase">
                                                    {translation.locale}
                                                </span>
                                                <span className="text-sm font-medium">
                                                    {Languages.find((l) => l.code === translation.locale)?.name}
                                                </span>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label className="text-xs text-muted-foreground">Name</Label>
                                                    <p className="text-sm">{translation.name || "Not provided"}</p>
                                                </div>
                                                <div>
                                                    <Label className="text-xs text-muted-foreground">Short Description</Label>
                                                    <p className="text-sm">{translation.shortDescription || "Not provided"}</p>
                                                </div>
                                                <div>
                                                    <Label className="text-xs text-muted-foreground">Description</Label>
                                                    <p className="text-sm line-clamp-2">{translation.description || "Not provided"}</p>
                                                </div>

                                                {(translation.color?.name || translation.interiorColor?.name) && (
                                                    <div className="pt-2 border-t mt-2">
                                                        <Label className="text-xs text-muted-foreground font-medium">Colors</Label>
                                                        <div className="grid grid-cols-2 gap-4 mt-1">
                                                            {translation.color?.name && (
                                                                <div>
                                                                    <Label className="text-xs text-muted-foreground">Exterior Color</Label>
                                                                    <div className="flex items-center gap-2">
                                                                        {translation.color.code && (
                                                                            <div
                                                                                className="w-4 h-4 rounded-full border"
                                                                                style={{ backgroundColor: translation.color.code }}
                                                                            />
                                                                        )}
                                                                        <p className="text-sm">{translation.color.name}</p>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {translation.interiorColor?.name && (
                                                                <div>
                                                                    <Label className="text-xs text-muted-foreground">Interior Color</Label>
                                                                    <div className="flex items-center gap-2">
                                                                        {translation.interiorColor.code && (
                                                                            <div
                                                                                className="w-4 h-4 rounded-full border"
                                                                                style={{ backgroundColor: translation.interiorColor.code }}
                                                                            />
                                                                        )}
                                                                        <p className="text-sm">{translation.interiorColor.name}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {(translation.metaTitle || translation.metaDescription || translation.metaTags) && (
                                                    <div className="pt-2 border-t mt-2">
                                                        <Label className="text-xs text-muted-foreground font-medium">SEO Metadata</Label>
                                                        {translation.metaTitle && (
                                                            <div className="mt-1">
                                                                <Label className="text-xs text-muted-foreground">Meta Title</Label>
                                                                <p className="text-sm">{translation.metaTitle}</p>
                                                            </div>
                                                        )}
                                                        {translation.metaDescription && (
                                                            <div className="mt-1">
                                                                <Label className="text-xs text-muted-foreground">Meta Description</Label>
                                                                <p className="text-sm line-clamp-2">{translation.metaDescription}</p>
                                                            </div>
                                                        )}
                                                        {translation.metaTags && (
                                                            <div className="mt-1">
                                                                <Label className="text-xs text-muted-foreground">Meta Tags</Label>
                                                                <div className="flex flex-wrap gap-1 mt-1">
                                                                    {translation.metaTags.map((tag, i) => (
                                                                        <Badge key={i} variant="outline" className="text-xs">
                                                                            {tag.trim()}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
