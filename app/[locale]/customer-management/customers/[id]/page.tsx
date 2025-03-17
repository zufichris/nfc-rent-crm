import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Mail, Phone, User, MapPin, CreditCard, Clock, Award, Car, FileText, Shield, Star, Users, Banknote, CalendarClock, Building, Briefcase, UserCheck, Landmark, AlertTriangle, Heart, Gift, Crown } from 'lucide-react'
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Define customer types
enum CustomerType {
  INDIVIDUAL = "INDIVIDUAL",
  CORPORATE = "CORPORATE",
  VIP = "VIP",
  TOURIST = "TOURIST",
  LONG_TERM = "LONG_TERM"
}

// Define customer status
enum CustomerStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLACKLISTED = "BLACKLISTED",
  PENDING_VERIFICATION = "PENDING_VERIFICATION"
}

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customerId = params.id;

  // In a real app, you would fetch the customer data from an API
  // For example: const customer = await fetchCustomerById(customerId);
  
  // If customer not found, return 404
  // if (!customer) return notFound();
  
  // Mock customer data - this would come from your API
  const customer = {
    id: customerId,
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    photo: "/placeholder.svg?height=300&width=300",
    type: CustomerType.VIP, // Change this to test different customer types
    status: CustomerStatus.ACTIVE,
    memberSince: new Date("2020-03-15"),
    lastActivity: new Date("2023-08-10"),
    loyaltyPoints: 2450,
    loyaltyTier: "Gold",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    paymentMethods: [
      { id: "pm1", type: "CREDIT_CARD", last4: "4242", brand: "Visa", expiryDate: "05/25", isDefault: true },
      { id: "pm2", type: "PAYPAL", email: "alex.morgan@example.com", isDefault: false }
    ],
    corporateInfo: {
      companyName: "Morgan Enterprises",
      position: "Director",
      companyAddress: "456 Business Ave, New York, NY 10001",
      taxId: "TAX-12345678",
      billingEmail: "billing@morganenterprises.com",
      creditLimit: 25000,
      contractStartDate: new Date("2021-01-01"),
      contractEndDate: new Date("2023-12-31")
    },
    vipBenefits: [
      "Free upgrades when available",
      "Priority customer service",
      "Extended rental hours",
      "Dedicated account manager",
      "Complimentary airport pickup"
    ],
    touristInfo: {
      nationality: "United Kingdom",
      passportNumber: "UK12345678",
      visaNumber: "US87654321",
      visaExpiryDate: new Date("2024-06-30"),
      accommodation: "Hilton Hotel, Manhattan",
      emergencyContact: {
        name: "Sarah Morgan",
        relationship: "Spouse",
        phone: "+44 7700 900123"
      }
    },
    longTermInfo: {
      contractNumber: "LT-2022-0042",
      rentalDuration: 12, // months
      specialRates: true,
      maintenanceIncluded: true,
      insurancePlan: "Premium",
      nextBillingDate: new Date("2023-09-01")
    },
    driverLicense: {
      number: "DL98765432",
      state: "NY",
      country: "USA",
      issueDate: new Date("2018-05-10"),
      expiryDate: new Date("2026-05-10"),
      verified: true
    },
    rentalHistory: [
      { 
        id: "r1", 
        carName: "BMW 5 Series", 
        startDate: new Date("2023-06-15"), 
        endDate: new Date("2023-06-20"), 
        totalAmount: 1250, 
        status: "COMPLETED",
        rating: 5,
        review: "Excellent car and service!"
      },
      { 
        id: "r2", 
        carName: "Mercedes-Benz E-Class", 
        startDate: new Date("2023-04-10"), 
        endDate: new Date("2023-04-15"), 
        totalAmount: 1400, 
        status: "COMPLETED",
        rating: 4,
        review: "Great experience overall."
      },
      { 
        id: "r3", 
        carName: "Audi A6", 
        startDate: new Date("2023-08-20"), 
        endDate: new Date("2023-08-27"), 
        totalAmount: 1680, 
        status: "UPCOMING",
        rating: null,
        review: null
      }
    ],
    preferences: {
      preferredCarTypes: ["Luxury Sedan", "SUV"],
      preferredLocations: ["Manhattan", "Brooklyn"],
      communicationPreferences: ["Email", "SMS"],
      additionalDrivers: true,
      childSeat: false,
      gpsNavigation: true
    },
    notes: "Alex is a high-value customer who frequently rents luxury vehicles for business trips. Prefers German cars and always returns vehicles in excellent condition.",
    documents: [
      { type: "DRIVER_LICENSE", title: "Driver's License", fileUrl: "#", verified: true, uploadDate: new Date("2022-01-15") },
      { type: "PASSPORT", title: "Passport", fileUrl: "#", verified: true, uploadDate: new Date("2022-01-15") },
      { type: "PROOF_OF_ADDRESS", title: "Utility Bill", fileUrl: "#", verified: true, uploadDate: new Date("2022-01-20") }
    ],
    spendingStats: {
      totalSpent: 15680,
      averagePerRental: 1307,
      lastYearSpent: 8750,
      currentYearSpent: 6930
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  }

  // Determine which tabs to show based on customer type
  const getTabs = () => {
    const commonTabs = [
      { id: "overview", label: "Overview" },
      { id: "rentals", label: "Rental History" },
      { id: "documents", label: "Documents" }
    ];
    
    switch (customer.type) {
      case CustomerType.CORPORATE:
        return [...commonTabs, { id: "corporate", label: "Corporate Info" }];
      case CustomerType.VIP:
        return [...commonTabs, { id: "vip", label: "VIP Benefits" }];
      case CustomerType.TOURIST:
        return [...commonTabs, { id: "tourist", label: "Tourist Info" }];
      case CustomerType.LONG_TERM:
        return [...commonTabs, { id: "longterm", label: "Contract Details" }];
      default:
        return commonTabs;
    }
  };
  
  const tabs = getTabs();

  return (
    <div className="space-y-6">
      {/* Header with back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href="/customers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Customer Profile</h1>
          <CustomerStatusBadge status={customer.status} />
          <CustomerTypeBadge type={customer.type} />
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/customers/${customerId}/edit`}>
            <Button variant="outline">Edit Profile</Button>
          </Link>
          <Button>New Booking</Button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Personal info */}
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={customer.photo} alt={`${customer.firstName} ${customer.lastName}`} />
                  <AvatarFallback>
                    {customer.firstName[0]}{customer.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{customer.firstName} {customer.lastName}</h2>
                
                {customer.type === CustomerType.VIP && (
                  <div className="flex items-center gap-1 mt-1 text-amber-500">
                    <Crown className="h-4 w-4" />
                    <span className="font-medium">{customer.loyaltyTier} Member</span>
                  </div>
                )}
                
                {customer.type === CustomerType.CORPORATE && (
                  <div className="flex items-center gap-1 mt-1 text-blue-500">
                    <Building className="h-4 w-4" />
                    <span className="font-medium">{customer.corporateInfo.companyName}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{customer.email}</div>
                    <div className="text-xs text-muted-foreground">Email</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{customer.phone}</div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{customer.address.city}, {customer.address.state}</div>
                    <div className="text-xs text-muted-foreground">Location</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Member Since {formatDate(customer.memberSince)}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.floor((new Date().getTime() - customer.memberSince.getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Last Activity</div>
                    <div className="text-xs text-muted-foreground">{formatDate(customer.lastActivity)}</div>
                  </div>
                </div>
                
                {customer.type === CustomerType.VIP && (
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{customer.loyaltyPoints.toLocaleString()} Points</div>
                      <div className="text-xs text-muted-foreground">Loyalty Program</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Driver's License</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{customer.driverLicense.number}</div>
                    <div className="text-xs text-muted-foreground">License Number</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{customer.driverLicense.state}, {customer.driverLicense.country}</div>
                    <div className="text-xs text-muted-foreground">Issuing Authority</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Expires {formatDate(customer.driverLicense.expiryDate)}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date() > customer.driverLicense.expiryDate ? (
                        <span className="text-destructive">Expired</span>
                      ) : (
                        `Valid for ${Math.ceil((customer.driverLicense.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))} months`
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {customer.driverLicense.verified ? (
                        <Badge variant="success">Verified</Badge>
                      ) : (
                        <Badge variant="destructive">Unverified</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">Verification Status</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.paymentMethods.map((payment, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {payment.type === "CREDIT_CARD" ? (
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Landmark className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div className="font-medium">
                          {payment.type === "CREDIT_CARD" 
                            ? `${payment.brand} ****${payment.last4}` 
                            : `PayPal (${payment.email})`}
                        </div>
                      </div>
                      {payment.isDefault && (
                        <Badge variant="outline">Default</Badge>
                      )}
                    </div>
                    {payment.type === "CREDIT_CARD" && (
                      <div className="text-xs text-muted-foreground">
                        Expires {payment.expiryDate}
                      </div>
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle and right columns */}
        <div className="md:col-span-2">
          <Tabs defaultValue={tabs[0].id}>
            <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
              {tabs.map(tab => (
                <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
              ))}
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Summary</CardTitle>
                  <CardDescription>Overview of customer activity and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Rental Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-2xl font-bold">{customer.rentalHistory.length}</div>
                          <div className="text-sm text-muted-foreground">Total Rentals</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-2xl font-bold">
                            {formatCurrency(customer.spendingStats.totalSpent)}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Spent</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-2xl font-bold">
                            {formatCurrency(customer.spendingStats.averagePerRental)}
                          </div>
                          <div className="text-sm text-muted-foreground">Avg. per Rental</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-2xl font-bold">
                            {customer.rentalHistory.filter(r => r.rating).reduce((sum, r) => sum + (r.rating || 0), 0) / 
                             customer.rentalHistory.filter(r => r.rating).length || 0}
                          </div>
                          <div className="text-sm text-muted-foreground">Avg. Rating</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Preferences</h3>
                      <div className="p-4 border rounded-lg space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground">Preferred Car Types</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {customer.preferences.preferredCarTypes.map((type, index) => (
                              <Badge key={index} variant="secondary">{type}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Preferred Locations</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {customer.preferences.preferredLocations.map((location, index) => (
                              <Badge key={index} variant="outline">{location}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Additional Options</div>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Badge variant={customer.preferences.additionalDrivers ? "success" : "outline"} className="h-5 w-5 p-0 flex items-center justify-center">
                                {customer.preferences.additionalDrivers ? "✓" : "✗"}
                              </Badge>
                              <span className="text-sm">Additional Drivers</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant={customer.preferences.childSeat ? "success" : "outline"} className="h-5 w-5 p-0 flex items-center justify-center">
                                {customer.preferences.childSeat ? "✓" : "✗"}
                              </Badge>
                              <span className="text-sm">Child Seat</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant={customer.preferences.gpsNavigation ? "success" : "outline"} className="h-5 w-5 p-0 flex items-center justify-center">
                                {customer.preferences.gpsNavigation ? "✓" : "✗"}
                              </Badge>
                              <span className="text-sm">GPS Navigation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {customer.notes && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Notes</h3>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="italic">{customer.notes}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                      <p>{customer.address.street}</p>
                      <p>{customer.address.city}, {customer.address.state} {customer.address.zipCode}</p>
                      <p>{customer.address.country}</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Verify</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Conditional cards based on customer type */}
              {customer.type === CustomerType.VIP && (
                <Card>
                  <CardHeader>
                    <CardTitle>VIP Status</CardTitle>
                    <CardDescription>Special benefits and loyalty program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative h-24 w-24 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Crown className="h-10 w-10 text-amber-500" />
                        </div>
                        <svg className="h-24 w-24 transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-muted"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 36}
                            strokeDashoffset={2 * Math.PI * 36 * (1 - customer.loyaltyPoints / 5000)}
                            className="text-amber-500"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{customer.loyaltyTier} Member</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.loyaltyPoints.toLocaleString()} / 5,000 points
                        </div>
                        <div className="text-sm mt-1">
                          {5000 - customer.loyaltyPoints} points until Platinum tier
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mb-3">VIP Benefits</h3>
                    <div className="space-y-2">
                      {customer.vipBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-amber-500">
                            ✓
                          </Badge>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {customer.type === CustomerType.TOURIST && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tourist Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Nationality</div>
                        <div className="font-medium">{customer.touristInfo.nationality}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Passport Number</div>
                        <div className="font-medium">{customer.touristInfo.passportNumber}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Visa Number</div>
                        <div className="font-medium">{customer.touristInfo.visaNumber}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Visa Expiry</div>
                        <div className="font-medium">{formatDate(customer.touristInfo.visaExpiryDate)}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Accommodation</div>
                      <div className="font-medium">{customer.touristInfo.accommodation}</div>
                    </div>
                    
                    <h3 className="text-sm font-medium mt-4 mb-2">Emergency Contact</h3>
                    <div className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <div className="text-sm text-muted-foreground">Name</div>
                          <div className="font-medium">{customer.touristInfo.emergencyContact.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Relationship</div>
                          <div className="font-medium">{customer.touristInfo.emergencyContact.relationship}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Phone</div>
                          <div className="font-medium">{customer.touristInfo.emergencyContact.phone}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Rental History Tab */}
            <TabsContent value="rentals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rental History</CardTitle>
                  <CardDescription>Past and upcoming rentals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {customer.rentalHistory.map((rental, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <Car className="h-5 w-5 text-primary" />
                              <div className="font-medium">{rental.carName}</div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge 
                              variant={
                                rental.status === "COMPLETED" ? "secondary" : 
                                rental.status === "UPCOMING" ? "outline" : 
                                "success"
                              } 
                              className="capitalize"
                            >
                              {rental.status.toLowerCase()}
                            </Badge>
                            <div className="font-medium">{formatCurrency(rental.totalAmount)}</div>
                            {rental.rating && (
                              <div className="flex items-center">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < rental.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {rental.review && (
                          <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                            <p className="text-sm italic">"{rental.review}"</p>
                          </div>
                        )}
                        
                        <div className="mt-3 flex justify-end gap-2">
                          <Link href={`/bookings/${rental.id}`}>
                            <Button variant="outline" size="sm">View Details</Button>
                          </Link>
                          {rental.status === "COMPLETED" && !rental.rating && (
                            <Button size="sm">Leave Review</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">View All Rentals</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Spending Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                      <div className="text-xl font-bold mt-1">{formatCurrency(customer.spendingStats.totalSpent)}</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Avg. Per Rental</div>
                      <div className="text-xl font-bold mt-1">{formatCurrency(customer.spendingStats.averagePerRental)}</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Last Year</div>
                      <div className="text-xl font-bold mt-1">{formatCurrency(customer.spendingStats.lastYearSpent)}</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Current Year</div>
                      <div className="text-xl font-bold mt-1">{formatCurrency(customer.spendingStats.currentYearSpent)}</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-3">Spending Trend</h3>
                    <div className="h-40 bg-muted/30 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Spending chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verification Documents</CardTitle>
                  <CardDescription>Customer identification and verification documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer.documents.map((doc, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-muted p-2">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{doc.title}</div>
                            <div className="text-sm text-muted-foreground">
                              Uploaded on {formatDate(doc.uploadDate)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.verified ? (
                            <Badge variant="success">Verified</Badge>
                          ) : (
                            <Badge variant="warning">Pending</Badge>
                          )}
                          <Button variant="outline" size="sm" asChild>
                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Upload New Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Corporate Info Tab - Only for Corporate customers */}
            {customer.type === CustomerType.CORPORATE && (
              <TabsContent value="corporate" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Company Name</div>
                        <div className="font-medium">{customer.corporateInfo.companyName}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Position</div>
                        <div className="font-medium">{customer.corporateInfo.position}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Tax ID</div>
                        <div className="font-medium">{customer.corporateInfo.taxId}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Billing Email</div>
                        <div className="font-medium">{customer.corporateInfo.billingEmail}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Company Address</div>
                      <div className="font-medium">{customer.corporateInfo.companyAddress}</div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Credit Limit</div>
                        <div className="font-medium">{formatCurrency(customer.corporateInfo.creditLimit)}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Contract Start</div>
                        <div className="font-medium">{formatDate(customer.corporateInfo.contractStartDate)}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Contract End</div>
                        <div className="font-medium">{formatDate(customer.corporateInfo.contractEndDate)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Corporate Fleet</CardTitle>
                    <CardDescription>Vehicles assigned to this corporate account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-8 border rounded-lg flex flex-col items-center justify-center text-center">
                      <Building className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No Assigned Fleet</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        This corporate account doesn't have any permanently assigned vehicles.
                      </p>
                      <Button>Assign Vehicles</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            {/* VIP Benefits Tab - Only for VIP customers */}
            {customer.type === CustomerType.VIP && (
              <TabsContent value="vip" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>VIP Program Details</CardTitle>
                    <CardDescription>Exclusive benefits and services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                        <Crown className="h-8 w-8 text-amber-500" />
                      </div>
                      <div>
                        <div className="text-xl font-bold">{customer.loyaltyTier} Member</div>
                        <div className="text-sm text-muted-foreground">
                          Member since {formatDate(customer.memberSince)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Loyalty Points</h3>
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-2xl font-bold">{customer.loyaltyPoints.toLocaleString()}</div>
                            <Badge variant="outline">Available Points</Badge>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress to Platinum</span>
                                <span>{customer.loyaltyPoints}/5000</span>
                              </div>
                              <Progress value={(customer.loyaltyPoints / 5000) * 100} className="h-2" />
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">Redeem Points</Button>
                            <Button size="sm">View Rewards</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">VIP Benefits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {customer.vipBenefits.map((benefit, index) => (
                            <div key={index} className="p-4 border rounded-lg flex items-start gap-3">
                              <div className="rounded-full bg-amber-100 p-1 mt-0.5">
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                              </div>
                              <div className="text-sm">{benefit}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Exclusive Offers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg bg-gradient-to-r from-amber-50 to-transparent">
                            <div className="font-medium">Weekend Upgrade</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Free upgrade to the next car category on weekend rentals
                            </div>
                            <Button variant="outline" size="sm" className="mt-3">
                              View Details
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg bg-gradient-to-r from-amber-50 to-transparent">
                            <div className="font-medium">Double Points</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Earn double loyalty points on luxury car rentals
                            </div>
                            <Button variant="outline" size="sm" className="mt-3">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Concierge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-lg">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Concierge" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Jessica Davis</div>
                        <div className="text-sm text-muted-foreground">Your Personal Concierge</div>
                        <div className="text-sm mt-1">Available Mon-Fri, 9AM-6PM EST</div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            {/* Tourist Info Tab - Only for Tourist customers */}
            {customer.type === CustomerType.TOURIST && (
              <TabsContent value="tourist" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Travel Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Nationality</div>
                        <div className="font-medium">{customer.touristInfo.nationality}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Accommodation</div>
                        <div className="font-medium">{customer.touristInfo.accommodation}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mt-4 mb-2">Travel Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Passport</div>
                        <div className="font-medium">{customer.touristInfo.passportNumber}</div>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Document
                        </Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Visa</div>
                        <div className="font-medium">{customer.touristInfo.visaNumber}</div>
                        <div className="text-xs text-muted-foreground">
                          Expires: {formatDate(customer.touristInfo.visaExpiryDate)}
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Document
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mt-4 mb-2">Emergency Contact</h3>
                    <div className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <div className="text-sm text-muted-foreground">Name</div>
                          <div className="font-medium">{customer.touristInfo.emergencyContact.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Relationship</div>
                          <div className="font-medium">{customer.touristInfo.emergencyContact.relationship}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Phone</div>
                          <div className="font-medium">{customer.touristInfo.emergencyContact.phone}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tourist Package</CardTitle>
                    <CardDescription>Special offers for tourists</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-transparent">
                      <h3 className="font-medium">Tourist Welcome Package</h3>
                      <div className="text-sm text-muted-foreground mt-1 mb-3">
                        Special benefits for international visitors
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className="h-5 w-5 p-0 flex items-center justify-center">
                            ✓
                          </Badge>
                          <span className="text-sm">Free GPS navigation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="h-5 w-5 p-0 flex items-center justify-center">
                            ✓
                          </Badge>
                          <span className="text-sm">Multilingual support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="h-5 w-5 p-0 flex items-center justify-center">
                            ✓
                          </Badge>
                          <span className="text-sm">City guide included</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="h-5 w-5 p-0 flex items-center justify-center">
                            ✓
                          </Badge>
                          <span className="text-sm">Airport pickup available</span>
                        </div>
                      </div>
                      <Button className="mt-4">Activate Package</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            {/* Long Term Contract Tab - Only for Long Term customers */}
            {customer.type === CustomerType.LONG_TERM && (
              <TabsContent value="longterm" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Long-Term Contract</CardTitle>
                    <CardDescription>Contract #{customer.longTermInfo.contractNumber}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-medium">{customer.longTermInfo.rentalDuration} months</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Special Rates</div>
                        <div className="font-medium">
                          {customer.longTermInfo.specialRates ? "Yes" : "No"}
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Next Billing</div>
                        <div className="font-medium">{formatDate(customer.longTermInfo.nextBillingDate)}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mt-4 mb-2">Included Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg flex items-center gap-3">
                        <Badge variant={customer.longTermInfo.maintenanceIncluded ? "success" : "outline"} className="h-6 w-6 p-0 flex items-center justify-center">
                          {customer.longTermInfo.maintenanceIncluded ? "✓" : "✗"}
                        </Badge>
                        <div>
                          <div className="font-medium">Maintenance</div>
                          <div className="text-xs text-muted-foreground">
                            Regular maintenance and servicing
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg flex items-center gap-3">
                        <Badge variant="success" className="h-6 w-6 p-0 flex items-center justify-center">
                          ✓
                        </Badge>
                        <div>
                          <div className="font-medium">Insurance</div>
                          <div className="text-xs text-muted-foreground">
                            {customer.longTermInfo.insurancePlan} coverage
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg flex items-center gap-3">
                        <Badge variant="success" className="h-6 w-6 p-0 flex items-center justify-center">
                          ✓
                        </Badge>
                        <div>
                          <div className="font-medium">Roadside Assistance</div>
                          <div className="text-xs text-muted-foreground">
                            24/7 emergency support
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg flex items-center gap-3">
                        <Badge variant="outline" className="h-6 w-6 p-0 flex items-center justify-center">
                          ✗
                        </Badge>
                        <div>
                          <div className="font-medium">Vehicle Replacement</div>
                          <div className="text-xs text-muted-foreground">
                            Automatic replacement not included
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end gap-2">
                      <Button variant="outline">Download Contract</Button>
                      <Button>Renew Contract</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <div className="font-medium">Next Payment</div>
                          <div className="text-sm text-muted-foreground">
                            Due on {formatDate(customer.longTermInfo.nextBillingDate)}
                          </div>
                        </div>
                        <div className="text-xl font-bold">
                          {formatCurrency(customer.spendingStats.averagePerRental)}
                        </div>
                      </div>
                      
                      <div className="relative pl-6 space-y-6">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-muted-foreground/20"></div>
                        
                        <div className="relative">
                          <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary -translate-x-[4.5px]"></div>
                          <div className="pl-6">
                            <div className="font-medium">September 2023</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(customer.longTermInfo.nextBillingDate)}
                            </div>
                            <div className="text-sm mt-1">
                              {formatCurrency(customer.spendingStats.averagePerRental)} - Upcoming
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-muted-foreground -translate-x-[4.5px]"></div>
                          <div className="pl-6">
                            <div className="font-medium">August 2023</div>
                            <div className="text-sm text-muted-foreground">
                              August 1, 2023
                            </div>
                            <div className="text-sm mt-1">
                              {formatCurrency(customer.spendingStats.averagePerRental)} - Paid
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-muted-foreground -translate-x-[4.5px]"></div>
                          <div className="pl-6">
                            <div className="font-medium">July 2023</div>
                            <div className="text-sm text-muted-foreground">
                              July 1, 2023
                            </div>
                            <div className="text-sm mt-1">
                              {formatCurrency(customer.spendingStats.averagePerRental)} - Paid
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Helper component for customer status badge
function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  const getVariant = () => {
    switch (status) {
      case CustomerStatus.ACTIVE:
        return "success"
      case CustomerStatus.INACTIVE:
        return "secondary"
      case CustomerStatus.BLACKLISTED:
        return "destructive"
      case CustomerStatus.PENDING_VERIFICATION:
        return "warning"
      default:
        return "outline"
    }
  }

  return (
    <Badge variant={getVariant()} className="capitalize">
      {status.toLowerCase().replace(/_/g, " ")}
    </Badge>
  )
}

// Helper component for customer type badge
function CustomerTypeBadge({ type }: { type: CustomerType }) {
  const getVariant = () => {
    switch (type) {
      case CustomerType.VIP:
        return "default"
      case CustomerType.CORPORATE:
        return "secondary"
      case CustomerType.TOURIST:
        return "outline"
      case CustomerType.LONG_TERM:
        return "success"
      default:
        return "outline"
    }
  }

  return (
    <Badge variant={getVariant()} className="capitalize">
      {type.toLowerCase().replace(/_/g, " ")}
    </Badge>
  )
}
