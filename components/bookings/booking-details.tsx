"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
    ArrowLeft,
    Calendar,
    Car,
    CheckCircle,
    CreditCard,
    Download,
    Edit,
    MapPin,
    Package,
    Printer,
    User,
    FileText,
    Upload,
    Clock,
    Shield,
    AlertCircle,
    ChevronRight,
    MessageSquare,
    History,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

import Link from "next/link"
import { BookingStatus, type IBooking } from "@/types/bookings"
import type { Variant } from "../theme/variants"

const StatusBadge = ({ status }: { status: BookingStatus }) => {
    let variant: Variant = "default"
    const text = status
    let icon = null

    switch (status) {
        case BookingStatus.PENDING:
            variant = "warning"
            icon = <Clock className="h-3 w-3 mr-1" />
            break
        case BookingStatus.CONFIRMED:
            variant = "info"
            icon = <CheckCircle className="h-3 w-3 mr-1" />
            break
        case BookingStatus.ACTIVE:
            variant = "outline"
            icon = <Car className="h-3 w-3 mr-1" />
            break
        case BookingStatus.COMPLETED:
            variant = "success"
            icon = <CheckCircle className="h-3 w-3 mr-1" />
            break
        case BookingStatus.CANCELLED:
            variant = "destructive"
            icon = <AlertCircle className="h-3 w-3 mr-1" />
            break
        default:
            variant = "default"
            break
    }

    return (
        <Badge variant={variant} className="flex items-center gap-1 px-2 py-1">
            {icon}
            {text}
        </Badge>
    )
}

export function BookingDetails({ booking }: Readonly<{ booking: IBooking }>) {

    if (!booking) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Booking not found</h2>
                <p className="text-muted-foreground mb-6">The requested booking could not be found or has been deleted.</p>
                <Button asChild>
                    <Link href="/bookings">Return to Bookings</Link>
                </Button>
            </div>
        )
    }



    const calculateDuration = () => {
        if (booking?.pickupDate && booking?.returnDate) {
            return Math.ceil(
                (new Date(booking.returnDate).getTime() - new Date(booking.pickupDate).getTime()) / (1000 * 60 * 60 * 24),
            )
        }
        return 0
    }

    const calculateProgress = () => {
        if (booking?.status !== BookingStatus.ACTIVE || !booking?.pickupDate || !booking?.returnDate) {
            return 0
        }

        const now = new Date().getTime()
        const start = new Date(booking.pickupDate).getTime()
        const end = new Date(booking.returnDate).getTime()

        if (now < start) return 0
        if (now > end) return 100

        return Math.round(((now - start) / (end - start)) * 100)
    }
    function renderTabs(booking: IBooking) {
        const tabs = ["overview", "customer", "vehicle", "payment", "documents"]
        const [activeTab, setActiveTab] = useState("overview")
        return (
            <Tabs  defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-5 md:inline-flex">
                    {tabs.map(tab => (
                        <TabsTrigger key={tab} className="capitalize" value={tab}>{tab}</TabsTrigger>
                    ))}
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Customer Card */}
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                    <User className="w-5 h-5 mr-2" />
                                    Customer
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center mb-4">
                                    <Avatar className="h-10 w-10 mr-3">
                                        <AvatarImage
                                            src={booking?.driver?.user?.photo}
                                            alt={`${booking?.driver?.firstName} ${booking?.driver?.lastName}`}
                                        />
                                        <AvatarFallback>{booking?.driver?.firstName?.charAt(0) || "D"}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">
                                            {booking?.driver?.firstName} {booking?.driver?.lastName}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{booking?.driver?.email || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Phone:</span>
                                        <span>{booking?.driver?.phoneNumber || "N/A"}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Country:</span>
                                        <span>{booking?.driver?.country || "N/A"}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Driver Type:</span>
                                        <span>{booking?.driver?.driverType || "N/A"}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link href={`/customers/${booking?.driver?.user?.id || booking.user.id}`}>
                                        View Customer <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Vehicle Card */}
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                    <Car className="w-5 h-5 mr-2" />
                                    Vehicle
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center mb-4">
                                    <div className="h-16 w-24 rounded-md overflow-hidden mr-3">
                                        <img
                                            src={booking?.car?.media?.[0]?.url || "/placeholder.svg?height=80&width=120"}
                                            alt={booking?.car?.name || "Vehicle"}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">{booking?.car?.name || "N/A"}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking?.car?.year} {booking?.car?.model || ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Category:</span>
                                        <span>{booking?.car?.category?.replace(/_/g, " ") || "N/A"}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Transmission:</span>
                                        <span>{booking?.car?.transmission || "N/A"}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Fuel Type:</span>
                                        <span>{booking?.car?.fuelType || "N/A"}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link href={`/cars/${booking?.car?.id || ""}`}>
                                        View Vehicle <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Payment Card */}
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2" />
                                    Payment
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Total Amount:</span>
                                        <span className="font-medium">${booking?.totalAmount?.toLocaleString() || "0"}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Payment Status:</span>
                                        <Badge
                                            variant={
                                                booking?.payment?.status === "PAID"
                                                    ? "success"
                                                    : booking?.payment?.status === "REFUNDED"
                                                        ? "destructive"
                                                        : "outline"
                                            }
                                        >
                                            {booking?.payment?.status || "N/A"}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Payment Method:</span>
                                        <span>{booking?.payment?.paymentMethod || "N/A"}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Transaction ID:</span>
                                        <span className="truncate">{booking?.payment?.transactionId || "N/A"}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Paid On:</span>
                                        <span>
                                            {booking?.payment?.paidAt ? format(new Date(booking.payment.paidAt), "PPP") : "Not paid yet"}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link href={`/payments/${booking?.payment?.id || ""}`}>
                                        View Payment <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Booking Details Card */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Booking Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-medium">Pickup</h3>
                                            <div className="p-3 bg-muted rounded-md">
                                                <p className="font-medium">
                                                    {booking?.pickupDate
                                                        ? format(new Date(booking.pickupDate), "EEEE, MMMM d, yyyy 'at' p")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-medium">Return</h3>
                                            <div className="p-3 bg-muted rounded-md">
                                                <p className="font-medium">
                                                    {booking?.returnDate
                                                        ? format(new Date(booking.returnDate), "EEEE, MMMM d, yyyy 'at' p")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium">Duration</h3>
                                        <p>{calculateDuration() > 0 ? `${calculateDuration()} days` : "N/A"}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium">Pickup & Return Location</h3>
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                            <p>Dubai International Airport, Terminal 3, Arrivals Hall</p>
                                        </div>
                                    </div>

                                    {booking.status === BookingStatus.ACTIVE && (
                                        <div className="mt-2 p-3 bg-primary/10 rounded-md">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Shield className="w-4 h-4 text-primary" />
                                                <h3 className="text-sm font-medium">Insurance Coverage</h3>
                                            </div>
                                            <p className="text-sm">This booking includes comprehensive insurance with a $500 deductible.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Addons & Pricing Card */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                    <Package className="w-5 h-5 mr-2" />
                                    Addons & Pricing
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {booking?.selectedAddons ? (
                                        booking?.selectedAddons?.map((addon) => (
                                            <div key={addon.id} className="flex justify-between">
                                                <div>
                                                    <p className="font-medium">{addon.name || "N/A"}</p>
                                                    <p className="text-sm text-muted-foreground">{addon.description || ""}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">
                                                        {addon.priceOptions?.[0]?.amount
                                                            ? `$${addon.priceOptions[0].amount.toLocaleString()}`
                                                            : "N/A"}
                                                        <span className="text-sm text-muted-foreground">
                                                            {addon.priceOptions?.[0]?.type === "per_day" ? "/day" : "/rental"}
                                                        </span>
                                                    </p>
                                                    {addon.isRequired && (
                                                        <Badge variant="outline" className="text-xs">
                                                            Required
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No addons selected for this booking</p>
                                    )}
                                    <Separator />
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Base Fee:</span>
                                            <span>${booking?.priceBreakdown?.baseFee?.toLocaleString() || "0"}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Addons:</span>
                                            <span>${booking?.priceBreakdown?.addons?.toLocaleString() || "0"}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Tax:</span>
                                            <span>${booking?.priceBreakdown?.tax?.toLocaleString() || "0"}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between font-medium">
                                            <span>Total:</span>
                                            <span>${booking?.totalAmount?.toLocaleString() || "0"}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Customer Tab */}
                <TabsContent value="customer" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Information</CardTitle>
                            <CardDescription>Personal details and documents of the customer</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">Personal Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Full Name</p>
                                                <p>
                                                    {booking?.driver?.firstName} {booking?.driver?.lastName}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Email</p>
                                                <p>{booking?.driver?.email || "N/A"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Phone</p>
                                                <p>{booking?.driver?.phoneNumber || "N/A"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Date of Birth</p>
                                                <p>
                                                    {booking?.driver?.dateOfBirth
                                                        ? format(new Date(booking.driver.dateOfBirth), "MMMM d, yyyy")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Country</p>
                                                <p>{booking?.driver?.country || "N/A"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Driver Type</p>
                                                <p>{booking?.driver?.driverType || "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium">ID Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">ID Number</p>
                                                <p>{booking?.driver?.idNumber || "N/A"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">ID Expiry Date</p>
                                                <p>
                                                    {booking?.driver?.idExpiryDate
                                                        ? format(new Date(booking.driver.idExpiryDate), "MMMM d, yyyy")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="space-y-2">
                                                <p className="text-sm text-muted-foreground">ID Front</p>
                                                <div className="border rounded-md overflow-hidden">
                                                    <img
                                                        src={booking?.driver?.idFrontImage || "/placeholder.svg?height=200&width=320"}
                                                        alt="ID Front"
                                                        className="w-full h-auto"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-sm text-muted-foreground">ID Back</p>
                                                <div className="border rounded-md overflow-hidden">
                                                    <img
                                                        src={booking?.driver?.idBackImage || "/placeholder.svg?height=200&width=320"}
                                                        alt="ID Back"
                                                        className="w-full h-auto"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">License Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">License Number</p>
                                                <p>{booking?.driver?.licenseNumber || "N/A"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Issue Date</p>
                                                <p>
                                                    {booking?.driver?.licenseIssueDate
                                                        ? format(new Date(booking.driver.licenseIssueDate), "MMMM d, yyyy")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Expiry Date</p>
                                                <p>
                                                    {booking?.driver?.licenseExpiryDate
                                                        ? format(new Date(booking.driver.licenseExpiryDate), "MMMM d, yyyy")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="space-y-2">
                                                <p className="text-sm text-muted-foreground">License Front</p>
                                                <div className="border rounded-md overflow-hidden">
                                                    <img
                                                        src={booking?.driver?.licenseFrontImage || "/placeholder.svg?height=200&width=320"}
                                                        alt="License Front"
                                                        className="w-full h-auto"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-sm text-muted-foreground">License Back</p>
                                                <div className="border rounded-md overflow-hidden">
                                                    <img
                                                        src={booking?.driver?.licenseBackImage || "/placeholder.svg?height=200&width=320"}
                                                        alt="License Back"
                                                        className="w-full h-auto"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium">Passport Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Passport Number</p>
                                                <p>{booking?.driver?.passportNumber || "N/A"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Issue Date</p>
                                                <p>
                                                    {booking?.driver?.passportIssueDate
                                                        ? format(new Date(booking.driver.passportIssueDate), "MMMM d, yyyy")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Expiry Date</p>
                                                <p>
                                                    {booking?.driver?.passportExpiryDate
                                                        ? format(new Date(booking.driver.passportExpiryDate), "MMMM d, yyyy")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="space-y-2">
                                                <p className="text-sm text-muted-foreground">Passport</p>
                                                <div className="border rounded-md overflow-hidden">
                                                    <img
                                                        src={booking?.driver?.passportFrontImage || "/placeholder.svg?height=200&width=320"}
                                                        alt="Passport"
                                                        className="w-full h-auto"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Vehicle Tab */}
                <TabsContent value="vehicle" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Vehicle Information</CardTitle>
                            <CardDescription>Details about the rented vehicle</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                                        <img
                                            src={booking?.car?.media?.[0]?.url || "/placeholder.svg?height=300&width=500"}
                                            alt={booking?.car?.name || "Vehicle"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {booking?.car?.media?.slice(1, 4).map((media, index) => (
                                            <div key={index} className="aspect-video rounded-lg overflow-hidden">
                                                <img
                                                    src={media.url || "/placeholder.svg?height=100&width=150"}
                                                    alt={media.title || "Vehicle Image"}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold">{booking?.car?.name || "N/A"}</h3>
                                        <p className="text-muted-foreground">
                                            {booking?.car?.year} {booking?.car?.model || ""}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Category</p>
                                            <p>{booking?.car?.category?.replace(/_/g, " ") || "N/A"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Fuel Type</p>
                                            <p>{booking?.car?.fuelType || "N/A"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Transmission</p>
                                            <p>{booking?.car?.transmission || "N/A"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Doors</p>
                                            <p>{booking?.car?.doors || "N/A"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Seats</p>
                                            <p>{booking?.car?.seats || "N/A"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Mileage</p>
                                            <p>{booking?.car?.mileage?.toLocaleString() || "0"} km</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">VIN</p>
                                            <p className="truncate">{booking?.car?.vin || "N/A"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Condition</p>
                                            <p>{booking?.car?.condition || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Engine Specifications</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Engine Type</p>
                                            <p>{booking?.car?.engineSpecs?.type || "N/A"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Horsepower</p>
                                            <p>{booking?.car?.engineSpecs?.horsepower || "N/A"} hp</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Torque</p>
                                            <p>{booking?.car?.engineSpecs?.torque || "N/A"} Nm</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Acceleration (0-100 km/h)</p>
                                            <p>{booking?.car?.engineSpecs?.acceleration || "N/A"} seconds</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Top Speed</p>
                                            <p>{booking?.car?.engineSpecs?.topSpeed || "N/A"} km/h</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Features</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {booking?.car?.features?.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-primary" />
                                                <span>{feature}</span>
                                            </div>
                                        )) || <p className="text-muted-foreground">No features listed</p>}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Payment Tab */}
                <TabsContent value="payment" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Information</CardTitle>
                            <CardDescription>Details about the payment for this booking</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">Payment Details</h3>
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Amount</p>
                                                <p className="text-xl font-semibold">${booking?.payment?.amount?.toLocaleString() || "0"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Currency</p>
                                                <p>{booking?.payment?.currency || "N/A"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Status</p>
                                                <Badge
                                                    variant={
                                                        booking?.payment?.status === "PAID"
                                                            ? "success"
                                                            : booking?.payment?.status === "REFUNDED"
                                                                ? "destructive"
                                                                : "outline"
                                                    }
                                                >
                                                    {booking?.payment?.status || "N/A"}
                                                </Badge>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Payment Method</p>
                                                <p>{booking?.payment?.paymentMethod || "N/A"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Transaction ID</p>
                                                <p className="truncate">{booking?.payment?.transactionId || "N/A"}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Paid On</p>
                                                <p>
                                                    {booking?.payment?.paidAt ? format(new Date(booking.payment.paidAt), "PPP") : "Not paid yet"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {booking?.payment?.paymentMetadata && (
                                        <div>
                                            <h3 className="text-lg font-medium">Payment Method Details</h3>
                                            <div className="grid grid-cols-2 gap-4 mt-2">
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground">Card Type</p>
                                                    <p>{booking.payment.paymentMetadata.cardBrand || "N/A"}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground">Card Number</p>
                                                    <p>**** **** **** {booking.payment.paymentMetadata.cardLast4 || "N/A"}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-muted-foreground">Expiry</p>
                                                    <p>
                                                        {booking.payment.paymentMetadata.cardExpMonth || "N/A"}/
                                                        {booking.payment.paymentMetadata.cardExpYear || "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">Price Breakdown</h3>
                                        <div className="mt-4 p-4 border rounded-lg space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Base Fee</span>
                                                <span>${booking?.priceBreakdown?.baseFee?.toLocaleString() || "0"}</span>
                                            </div>
                                            {booking?.selectedAddons?.map((addon) => (
                                                <div key={addon.id} className="flex justify-between">
                                                    <span className="text-muted-foreground">{addon.name || "N/A"}</span>
                                                    <span>
                                                        {addon.priceOptions?.[0]?.amount
                                                            ? `$${addon.priceOptions[0].amount.toLocaleString()}`
                                                            : "N/A"}
                                                        {addon.priceOptions?.[0]?.type === "per_day" && booking?.pickupDate && booking?.returnDate
                                                            ? ` × ${calculateDuration()} days`
                                                            : ""}
                                                    </span>
                                                </div>
                                            ))}
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Tax</span>
                                                <span>${booking?.priceBreakdown?.tax?.toLocaleString() || "0"}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between font-semibold">
                                                <span>Total</span>
                                                <span>${booking?.totalAmount?.toLocaleString() || "0"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium">Payment Actions</h3>
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            <Button variant="outline">Issue Refund</Button>
                                            <Button variant="outline">Send Receipt</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Booking Documents</CardTitle>
                            <CardDescription>Rental agreement and other documents</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Placeholder documents; in a real app, these could be dynamic */}
                                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-md">
                                            <FileText className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Rental Agreement</p>
                                            <p className="text-sm text-muted-foreground">
                                                PDF • 2.4 MB • Uploaded on {format(new Date(), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-2" />
                                            Download
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Printer className="h-4 w-4 mr-2" />
                                            Print
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-md">
                                            <FileText className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Insurance Certificate</p>
                                            <p className="text-sm text-muted-foreground">
                                                PDF • 1.8 MB • Uploaded on {format(new Date(), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-2" />
                                            Download
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Printer className="h-4 w-4 mr-2" />
                                            Print
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-md">
                                            <FileText className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Vehicle Inspection Report</p>
                                            <p className="text-sm text-muted-foreground">
                                                PDF • 3.2 MB • Uploaded on {format(new Date(), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-2" />
                                            Download
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Printer className="h-4 w-4 mr-2" />
                                            Print
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Button>
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload New Document
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        )
    }
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/bookings">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Booking #{booking.id}</h1>
                        <p className="text-muted-foreground">
                            Created on {booking.createdAt ? format(new Date(booking.createdAt), "PPP") : "N/A"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MessageSquare className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Contact Customer</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Printer className="mr-2 h-4 w-4" />
                                Print / Download
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                Print Booking
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Export Details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Status and Timeline */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <StatusBadge status={booking.status} />
                                <span className="text-sm text-muted-foreground">
                                    Last updated: {booking.updatedAt ? format(new Date(booking.updatedAt), "PPP 'at' p") : "N/A"}
                                </span>
                            </div>

                            {booking.status === BookingStatus.ACTIVE && (
                                <div className="w-full md:w-64 mt-2">
                                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                        <span>Pickup: {booking.pickupDate ? format(new Date(booking.pickupDate), "MMM d") : "N/A"}</span>
                                        <span>Return: {booking.returnDate ? format(new Date(booking.returnDate), "MMM d") : "N/A"}</span>
                                    </div>
                                    <Progress value={calculateProgress()} className="h-2" />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {calculateProgress()}% complete •{" "}
                                        {calculateDuration() - Math.floor((calculateProgress() / 100) * calculateDuration())} days remaining
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <History className="mr-2 h-4 w-4" />
                                View History
                            </Button>
                            {booking.status === BookingStatus.PENDING && (
                                <Button variant="default" size="sm">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Confirm Booking
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs */}
            {renderTabs(booking)}
        </div>
    )
}

