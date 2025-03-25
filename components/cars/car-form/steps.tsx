import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Image, ImageUpload } from "@/components/misc/image"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CarCategory, CarInspectionStatus, CarListingType, CarStatus, CarTranslationDTO, FuelType, ICarMedia, TransmissionType, CarCondition, CarDocumentType, CarHistoryRecordType } from "@/types/car"
import { CarModelsSelect } from "@/components/models/models-select"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CarPricingUnit, Currencies, RentalPricingDto } from "@/types/pricing"
import { CarFeaturesSelect } from "@/components/feature/car-features-input"
import { Languages, Locale } from "@/types/language"
import { Badge } from "@/components/ui/badge"
import { CarFormReturnType } from "."



export function CarFormSteps({ currentStep, form }: Readonly<{ form: CarFormReturnType, currentStep: number }>) {
    switch (currentStep) {
        case 0:
            return <BasicDetails form={form} />
        case 1:
            return <Specifications form={form} />
        case 2:
            return <Media form={form} />
        case 3:
            return <FeaturesAndPricing form={form} />
        case 4:
            return (
                <Translation form={form} />
            )
        case 5:
            return <Review form={form} car={form.getValues()} />
        default:
            return null
    }
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
                        name="model"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Model*</FormLabel>
                                <FormControl>
                                    <CarModelsSelect onChange={(modelId) => {
                                        field.onChange(modelId)
                                    }} />
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
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
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
                                        {Object.entries(CarCategory).map(([key, value]) => (
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
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
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
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
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
                                <div className="space-y-2">
                                    {Object.entries(CarListingType).map(([key, value]) => (
                                        <div key={key} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`listing-${value}`}
                                                checked={field.value?.includes(value)}
                                                onCheckedChange={(checked) => {
                                                    const currentValues = field.value || []
                                                    const newValues = checked
                                                        ? [...currentValues, value]
                                                        : currentValues.filter((v) => v !== value)
                                                    field.onChange(newValues)
                                                }}
                                            />
                                            <Label htmlFor={`listing-${value}`}>{value.replace(/_/g, " ")}</Label>
                                        </div>
                                    ))}
                                </div>
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
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
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
                </div>

                <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                            <div className="space-y-1">
                                <FormLabel>Active</FormLabel>
                                <FormDescription>Car will be visible on the site</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
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
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
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
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
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
                                            onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)}
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
                                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
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
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {form.watch("fuelType") === "ELECTRIC" ||
                        form.watch("fuelType") === "HYBRID" ||
                        form.watch("fuelType") === "PLUG_IN_HYBRID" ? (
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
                                                onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)}
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
                                                onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ) : null}
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
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
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
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
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
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
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
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
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
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
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
                                        <Input type="date" {...field} />
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
                                    <Input type="date" {...field} />
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
    const [mediaItems, setMediaItems] = useState<ICarMedia[]>(form.getValues("media") || [])

    const addMediaItem = () => {
        const newMedia = [
            ...mediaItems,
            {
                url: "",
                type: "IMAGE",
                isThumbnail: mediaItems.length === 0,
                title: "",
                description: "",
                position: mediaItems.length,
            },
        ]
        setMediaItems(newMedia as any)
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

function FeaturesAndPricing({ form }: Readonly<{ form: CarFormReturnType }>) {
    const [pricingItems, setPricingItems] = useState<RentalPricingDto[]>(
        (form.getValues("rentalPricings")?.map(item => ({
            ...item,
            duration: typeof item.duration === 'string' ? parseInt(item.duration) : item.duration
        })) as RentalPricingDto[]) || [{ duration: 1, unit: "DAY", price: 0, currency: Currencies.USD }]
    )

    const addPricingItem = () => {
        const newPricing = [...pricingItems, { duration: 1, unit: CarPricingUnit.DAY, price: 0, currency: Currencies.USD }]
        setPricingItems(newPricing)
        form.setValue("rentalPricings", newPricing as any)
    }

    const removePricingItem = (index: number) => {
        const newPricing = [...pricingItems]
        newPricing.splice(index, 1)
        setPricingItems(newPricing)
        form.setValue("rentalPricings", newPricing as any)
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
                                                    onChange={(e) => {
                                                        const value = e.target.value ? Number.parseInt(e.target.value) : undefined
                                                        field.onChange(value)
                                                        const newPricing = [...pricingItems]
                                                        newPricing[index].duration = value
                                                        setPricingItems(newPricing)
                                                    }}
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
                                                    onChange={(e) => {
                                                        const value = e.target.value ? Number.parseFloat(e.target.value) : undefined
                                                        field.onChange(value)
                                                        const newPricing = [...pricingItems]
                                                        newPricing[index].price = value
                                                        setPricingItems(newPricing)
                                                    }}
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
                                                    <SelectItem value="USD">USD</SelectItem>
                                                    <SelectItem value="EUR">EUR</SelectItem>
                                                    <SelectItem value="GBP">GBP</SelectItem>
                                                    <SelectItem value="JPY">JPY</SelectItem>
                                                    <SelectItem value="AED">AED</SelectItem>
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
        </div>
    )
}

function Translation({
    form,
}: Readonly<{ form: CarFormReturnType; }>) {
    const [activeLocale, setActiveLocale] = useState<Locale>("en")
    const translations: CarTranslationDTO[] = form.getValues("translations") || []
    const mainTranslation = translations.find((t: CarTranslationDTO) => t.locale === "en") || {
        name: "",
        shortDescription: "",
        description: "",
        locale: "en",
        color: {
            name: "",
            code: ""
        },
        interiorColor: {
            name: "",
            code: ""
        },
        metaTags: [],
        metaTitle: "",
        metaDescription: ""
    }
    const [isTranslating, setIsTranslating] = useState(false)

    useEffect(() => {
        const currentTranslations = form.getValues("translations") || []
        const locales = Languages.map((lang) => lang.code)

        const missingLocales = locales.filter((locale) => !currentTranslations.some((t: CarTranslationDTO) => t.locale === locale))

        if (missingLocales.length > 0) {
            const newTranslations = [...currentTranslations]

            missingLocales.forEach((locale) => {
                newTranslations.push({
                    name: "",
                    shortDescription: "",
                    description: "",
                    locale,
                })
            })

            form.setValue("translations", newTranslations)
        }
    }, [form])

    function syncWithMainContent() {
        const mainName = mainTranslation.name
        const mainDescription = mainTranslation.description ?? ""
        const mainShortDescription = mainTranslation.shortDescription ?? ""

        const currentTranslations = form.getValues("translations") || []
        const updatedTranslations = currentTranslations.map((t: CarTranslationDTO) =>
            t.locale === activeLocale
                ? { ...t, name: mainName, description: mainDescription, shortDescription: mainShortDescription }
                : t,
        )

        form.setValue("translations", updatedTranslations)
        toast.success(`Updated ${Languages.find((l) => l.code === activeLocale)?.name} translation`)
    }

    // async function handleAutoTranslate() {
    //     if (activeLocale === "en") {
    //         toast.error("Cannot translate to the source language")
    //         return
    //     }

    //     const sourceContent = {
    //         name: mainTranslation.name,
    //         shortDescription: mainTranslation.shortDescription,
    //         description: mainTranslation.description,
    //     }

    //     if (!sourceContent.name || !sourceContent.shortDescription) {
    //         toast.error("Missing source content. Please complete the English translation first.")
    //         return
    //     }

    //     setIsTranslating(true)
    //     try {
    //         toast.promise(
    //             translateContent(sourceContent, "en", activeLocale).then((translatedContent) => {
    //                 const currentTranslations = form.getValues("translations") || []
    //                 const updatedTranslations = currentTranslations.map((t) =>
    //                     t.locale === activeLocale
    //                         ? {
    //                             ...t,
    //                             name: translatedContent.name ?? t.name,
    //                             description: translatedContent.description ?? t.description,
    //                             shortDescription: translatedContent.shortDescription ?? t.shortDescription,
    //                         }
    //                         : t,
    //                 )

    //                 form.setValue("translations", updatedTranslations)
    //             }),
    //             {
    //                 loading: `Translating to ${Languages.find((l) => l.code === activeLocale)?.name}...`,
    //                 success: `Translated to ${Languages.find((l) => l.code === activeLocale)?.name}`,
    //                 error: "Translation failed",
    //             },
    //         )
    //     } catch (error) {
    //         console.error("Translation error:", error)
    //     } finally {
    //         setIsTranslating(false)
    //     }
    // }

    // async function translateAllLanguages() {
    //     const sourceContent = {
    //         name: mainTranslation.name,
    //         shortDescription: mainTranslation.shortDescription,
    //         description: mainTranslation.description,
    //     }

    //     if (!sourceContent.name || !sourceContent.shortDescription) {
    //         toast.error("Missing source content. Please complete the English translation first.")
    //         return
    //     }

    //     setIsTranslating(true)
    //     try {
    //         const targetLanguages = Languages.filter((lang) => lang.code !== "en").map((lang) => lang.code)

    //         toast.promise(
    //             Promise.all(
    //                 targetLanguages.map(async (locale) => {
    //                     const translatedContent = await translateContent(sourceContent, "en", locale)
    //                     return { locale, content: translatedContent }
    //                 }),
    //             ).then((results) => {
    //                 const currentTranslations = form.getValues("translations") || []

    //                 const updatedTranslations = currentTranslations.map((translation) => {
    //                     const result = results.find((r) => r.locale === translation.locale)
    //                     if (result) {
    //                         return {
    //                             ...translation,
    //                             name: result.content.name ?? translation.name,
    //                             description: result.content.description ?? translation.description,
    //                             shortDescription: result.content.shortDescription ?? translation.shortDescription,
    //                         }
    //                     }
    //                     return translation
    //                 })

    //                 form.setValue("translations", updatedTranslations)
    //             }),
    //             {
    //                 loading: "Translating to all languages...",
    //                 success: "All translations completed",
    //                 error: "Some translations failed",
    //             },
    //         )
    //     } catch (error) {
    //         console.error("Translation error:", error)
    //     } finally {
    //         setIsTranslating(false)
    //     }
    // }

    return (
        <Card>
            <CardContent className="pt-6 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-medium">Translations</h3>
                    {/* <Button type="button" variant="outline" size="sm" onClick={translateAllLanguages} disabled={isTranslating}>
                        {isTranslating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4" />}
                        Translate All Languages
                    </Button> */}
                </div>

                <div className="border rounded-lg p-4 bg-muted/20">
                    <h4 className="font-medium mb-4">English (Source Language)</h4>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="translations.0.name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name (English)*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter car name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="translations.0.shortDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short Description (English)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter short description" className="resize-none h-32" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="translations.0.description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Description (English)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter full description" className="min-h-[200px] resize-y" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Tabs defaultValue="fr" value={activeLocale} onValueChange={(value) => setActiveLocale(value as Locale)}>
                    <TabsList className="mb-6 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {Languages.filter((lang) => lang.code !== "en").map(({ code, name }) => (
                            <TabsTrigger key={code} value={code} className="flex-1">
                                {name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {Languages.filter((lang) => lang.code !== "en").map(({ code, name }) => (
                        <TabsContent key={code} value={code} className="space-y-6">
                            <div className="flex justify-end gap-3">
                                {/* <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAutoTranslate}
                                    disabled={isTranslating}
                                >
                                    {isTranslating ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Sparkles className="mr-2 h-4 w-4" />
                                    )}
                                    Auto Translate
                                </Button> */}
                                <Button type="button" variant="outline" size="sm" onClick={syncWithMainContent}>
                                    Copy from English
                                </Button>
                            </div>

                            {translations
                                .filter((t) => t.locale === code)
                                .map((translation, idx) => (
                                    <div key={idx} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name={`translations.${translations.findIndex((t) => t.locale === code)}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name ({name})</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={`Car name in ${name}`} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`translations.${translations.findIndex((t) => t.locale === code)}.shortDescription`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Short Description ({name})</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder={`Short description in ${name}`}
                                                            className="resize-none h-32"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`translations.${translations.findIndex((t) => t.locale === code)}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Description ({name})</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder={`Full description in ${name}`}
                                                            className="min-h-[200px] resize-y"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ))}
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}

function Review({ form, car }: Readonly<{ form: CarFormReturnType; car?: any }>) {
    const formValues = form.getValues()
    const mainTranslation = formValues.translations?.find((t: CarTranslationDTO) => t.locale === "en")

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
                                        <p className="text-sm">{mainTranslation?.name}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">VIN</Label>
                                        <p className="text-sm">{formValues.vin}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Model</Label>
                                        <p className="text-sm">{formValues.model}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Year</Label>
                                        <p className="text-sm">{formValues.year}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Category</Label>
                                        <p className="text-sm capitalize">{formValues.category?.toLowerCase().replace(/_/g, " ")}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Status</Label>
                                        <p className="text-sm capitalize">{formValues.currentStatus?.toLowerCase().replace(/_/g, " ")}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Listing Type</Label>
                                        <Badge variant="secondary" className="capitalize">
                                            {formValues.listingType.replace(/_/g, " ").toLowerCase()}
                                        </Badge>
                                    </div>
                                    <div>
                                        <Label className="font-medium text-sm">Mileage</Label>
                                        <p className="text-sm">{formValues.mileage} km</p>
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
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Engine Type</Label>
                                                <p className="text-sm">{formValues.engineSpecs?.type}</p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Horsepower</Label>
                                                <p className="text-sm">{formValues.engineSpecs?.horsepower} HP</p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Torque</Label>
                                                <p className="text-sm">{formValues.engineSpecs?.torque} Nm</p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Acceleration (0-100 km/h)</Label>
                                                <p className="text-sm">{formValues.engineSpecs?.acceleration}s</p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Top Speed</Label>
                                                <p className="text-sm">{formValues.engineSpecs?.topSpeed} km/h</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="font-medium text-sm">Dimensions</Label>
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Length</Label>
                                                <p className="text-sm">{formValues.dimensions?.length} mm</p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Width</Label>
                                                <p className="text-sm">{formValues.dimensions?.width} mm</p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Height</Label>
                                                <p className="text-sm">{formValues.dimensions?.height} mm</p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Weight</Label>
                                                <p className="text-sm">{formValues.dimensions?.weight} kg</p>
                                            </div>
                                            <div>
                                                <Label className="text-xs text-muted-foreground">Cargo Capacity</Label>
                                                <p className="text-sm">{formValues.dimensions?.cargoCapacity} L</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                <p className="text-sm">No features added</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="font-medium text-sm">Rental Pricing</Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                            {formValues.rentalPricings?.map((pricing: RentalPricingDto, index: number) => (
                                                <div key={index} className="border rounded-md p-3">
                                                    <div className="text-lg font-bold">
                                                        {pricing.price} {pricing.currency}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {pricing.duration && `${pricing.duration} `}
                                                        {pricing.unit && pricing.unit.toLowerCase()}
                                                        {pricing.duration && pricing.duration > 1 ? "s" : ""}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="media">
                            <AccordionTrigger>Media</AccordionTrigger>
                            <AccordionContent>
                                {formValues.media && formValues.media.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {formValues.media.map((media: ICarMedia, index: number) => (
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
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm">No images added</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="translations">
                            <AccordionTrigger>Translations</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    {formValues.translations?.map((translation: CarTranslationDTO) => (
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
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            {car && (
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <h3 className="text-lg font-medium">Information</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Created</span>
                                <span className="text-sm">{new Date(car.createdAt).toLocaleDateString()}</span>
                            </div>
                            {car.updatedAt && (
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Last updated</span>
                                    <span className="text-sm">{new Date(car.updatedAt).toLocaleDateString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">ID</span>
                                <span className="text-sm font-mono">{car.id}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}