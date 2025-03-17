import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  User,
  MapPin,
  Briefcase,
  Clock,
  Award,
  Car,
  FileText,
  Shield,
  Star,
  Users,
  Banknote,
  CalendarClock,
  BookOpen,
  Headphones,
} from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Define employee status enum
enum EmployeeStatus {
  ACTIVE = "ACTIVE",
  ON_LEAVE = "ON_LEAVE",
  TERMINATED = "TERMINATED",
  SUSPENDED = "SUSPENDED",
}

// Define employee role enum
enum EmployeeRole {
  MANAGER = "MANAGER",
  SALES_AGENT = "SALES_AGENT",
  CUSTOMER_SERVICE = "CUSTOMER_SERVICE",
  DRIVER = "DRIVER",
  MECHANIC = "MECHANIC",
  ADMIN = "ADMIN",
}

export default async function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const employeeId = params.id

  // In a real app, you would fetch the employee data from an API
  // For example: const employee = await fetchEmployeeById(employeeId);

  // If employee not found, return 404
  // if (!employee) return notFound();

  // Mock employee data
  const employee = {
    id: employeeId,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 987-6543",
    photo: "/placeholder.svg?height=300&width=300",
    status: EmployeeStatus.ACTIVE,
    role: EmployeeRole.MANAGER,
    department: "Operations",
    hireDate: new Date("2019-05-15"),
    employeeId: "EMP-2019-0042",
    address: {
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 123-4567",
    },
    salary: {
      amount: 85000,
      currency: "USD",
      lastReviewDate: new Date("2023-01-15"),
      nextReviewDate: new Date("2024-01-15"),
    },
    bankDetails: {
      accountName: "Sarah Johnson",
      accountNumber: "****3456",
      bankName: "Chase Bank",
    },
    performance: {
      rating: 4.8,
      lastReviewDate: new Date("2023-01-15"),
      achievements: [
        {
          title: "Employee of the Month",
          date: new Date("2022-11-01"),
          description: "Recognized for exceptional customer service",
        },
        {
          title: "Sales Target Exceeded",
          date: new Date("2022-08-15"),
          description: "Exceeded quarterly sales target by 25%",
        },
      ],
      metrics: [
        { name: "Customer Satisfaction", value: 95, target: 90, unit: "%" },
        { name: "Bookings Processed", value: 142, target: 120, unit: "bookings" },
        { name: "Revenue Generated", value: 285000, target: 250000, unit: "USD" },
      ],
    },
    skills: [
      { name: "Customer Service", level: "Expert" },
      { name: "Sales", level: "Advanced" },
      { name: "Vehicle Knowledge", level: "Advanced" },
      { name: "CRM Software", level: "Expert" },
      { name: "Team Management", level: "Advanced" },
    ],
    certifications: [
      {
        name: "Certified Automotive Professional",
        issuer: "Automotive Association",
        date: new Date("2020-06-10"),
        expiryDate: new Date("2023-06-10"),
      },
      { name: "Leadership Excellence", issuer: "Management Institute", date: new Date("2021-03-22"), expiryDate: null },
    ],
    education: [{ degree: "Bachelor of Business Administration", institution: "New York University", year: "2015" }],
    workSchedule: {
      regularHours: "Mon-Fri, 9:00 AM - 5:00 PM",
      weekendAvailability: "On rotation",
      timeZone: "EST",
    },
    assignedVehicles: [{ id: "v1", name: "Company Car", details: "Toyota Camry (2022)", plateNumber: "NYC-1234" }],
    handledBookings: [
      {
        id: "b1",
        customerName: "John Smith",
        carName: "Ferrari 488 GTB",
        date: new Date("2023-07-15"),
        status: "COMPLETED",
        amount: 6000,
      },
      {
        id: "b2",
        customerName: "Emma Davis",
        carName: "Lamborghini Huracán",
        date: new Date("2023-08-10"),
        status: "CONFIRMED",
        amount: 8500,
      },
      {
        id: "b3",
        customerName: "Michael Brown",
        carName: "Porsche 911",
        date: new Date("2023-08-18"),
        status: "PENDING",
        amount: 5200,
      },
    ],
    documents: [
      { type: "CONTRACT", title: "Employment Contract", fileUrl: "#", issueDate: new Date("2019-05-15") },
      { type: "ID", title: "Employee ID Card", fileUrl: "#", issueDate: new Date("2019-05-20") },
      { type: "CERTIFICATION", title: "Automotive Certification", fileUrl: "#", issueDate: new Date("2020-06-10") },
    ],
    notes:
      "Sarah is a top performer and has been consistently exceeding expectations. She's being considered for a promotion to Regional Manager in the next fiscal year.",
    accessLevel: "Manager",
    lastLogin: new Date("2023-08-20T09:15:00"),
    createdAt: new Date("2019-05-15"),
    updatedAt: new Date("2023-01-20"),
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header with back button and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href="/employees">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Employee Profile</h1>
          <EmployeeStatusBadge status={employee.status} />
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/employees/${employeeId}/edit`}>
            <Button variant="outline">Edit Profile</Button>
          </Link>
          <Button>Send Message</Button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Personal info */}
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={employee.photo} alt={`${employee.firstName} ${employee.lastName}`} />
                  <AvatarFallback>
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">
                  {employee.firstName} {employee.lastName}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="capitalize">
                    {employee.role.replace(/_/g, " ")}
                  </Badge>
                  <Badge variant="secondary" className="capitalize">
                    {employee.department}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Employee ID: {employee.employeeId}</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{employee.email}</div>
                    <div className="text-xs text-muted-foreground">Work Email</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{employee.phone}</div>
                    <div className="text-xs text-muted-foreground">Work Phone</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {employee.address.city}, {employee.address.state}
                    </div>
                    <div className="text-xs text-muted-foreground">Location</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{employee.accessLevel} Access</div>
                    <div className="text-xs text-muted-foreground">System Permissions</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Joined {formatDate(employee.hireDate)}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.floor((new Date().getTime() - employee.hireDate.getTime()) / (1000 * 60 * 60 * 24 * 365))}{" "}
                      years of service
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Last active {new Date(employee.lastLogin).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">
                      at {new Date(employee.lastLogin).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Work Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{employee.workSchedule.regularHours}</div>
                    <div className="text-xs text-muted-foreground">Regular Hours</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{employee.workSchedule.weekendAvailability}</div>
                    <div className="text-xs text-muted-foreground">Weekend Availability</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{employee.workSchedule.timeZone}</div>
                    <div className="text-xs text-muted-foreground">Time Zone</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{employee.emergencyContact.name}</div>
                    <div className="text-xs text-muted-foreground">{employee.emergencyContact.relationship}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{employee.emergencyContact.phone}</div>
                    <div className="text-xs text-muted-foreground">Emergency Phone</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle and right columns */}
        <div className="md:col-span-2">
          <Tabs defaultValue="performance">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
            </TabsList>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Last reviewed on {formatDate(employee.performance.lastReviewDate)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-24 w-24 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-2xl font-bold">{employee.performance.rating}</div>
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
                            strokeDashoffset={2 * Math.PI * 36 * (1 - employee.performance.rating / 5)}
                            className="text-primary"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">Overall Rating</div>
                        <div className="flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < Math.floor(employee.performance.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                              />
                            ))}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">Out of 5.0</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                      {employee.performance.metrics.map((metric, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="text-sm font-medium">{metric.name}</div>
                          <div className="flex items-end justify-between mt-1">
                            <div className="text-2xl font-bold">
                              {metric.unit === "%"
                                ? `${metric.value}%`
                                : metric.unit === "USD"
                                  ? formatCurrency(metric.value, "USD")
                                  : metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Target:{" "}
                              {metric.unit === "%"
                                ? `${metric.target}%`
                                : metric.unit === "USD"
                                  ? formatCurrency(metric.target, "USD")
                                  : metric.target}
                            </div>
                          </div>
                          <Progress value={(metric.value / metric.target) * 100} className="h-2 mt-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-3">Achievements & Recognition</h3>
                    <div className="space-y-4">
                      {employee.performance.achievements.map((achievement, index) => (
                        <div key={index} className="flex gap-4 p-4 border rounded-lg">
                          <div className="rounded-full bg-primary/10 p-2 h-fit">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{achievement.title}</div>
                            <div className="text-sm text-muted-foreground">{formatDate(achievement.date)}</div>
                            <div className="text-sm mt-1">{achievement.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {employee.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Manager's Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="italic">{employee.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings Handled</CardTitle>
                  <CardDescription>Bookings processed by this employee</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employee.handledBookings.map((booking, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 p-4 border rounded-lg"
                      >
                        <div className="flex flex-col">
                          <div className="font-medium">{booking.carName}</div>
                          <div className="text-sm text-muted-foreground">
                            Customer: {booking.customerName} • {formatDate(booking.date)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              booking.status === "COMPLETED"
                                ? "secondary"
                                : booking.status === "CONFIRMED"
                                  ? "success"
                                  : "warning"
                            }
                            className="capitalize"
                          >
                            {booking.status.toLowerCase()}
                          </Badge>
                          <div className="font-medium">${booking.amount.toLocaleString()}</div>
                          <Link href={`/bookings/${booking.id}`}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">View All Bookings</Button>
                </CardFooter>
              </Card>

              {employee.assignedVehicles && employee.assignedVehicles.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Assigned Vehicles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employee.assignedVehicles.map((vehicle, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-muted p-2">
                              <Car className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{vehicle.name}</div>
                              <div className="text-sm text-muted-foreground">{vehicle.details}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{vehicle.plateNumber}</Badge>
                            <Link href={`/vehicles/${vehicle.id}`}>
                              <Button variant="ghost" size="sm">
                                Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Qualifications Tab */}
            <TabsContent value="qualifications" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employee.skills.map((skill, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="font-medium">{skill.name}</div>
                          <Badge
                            variant={
                              skill.level === "Expert"
                                ? "default"
                                : skill.level === "Advanced"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {skill.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employee.certifications.map((cert, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{cert.name}</div>
                            {cert.expiryDate && new Date(cert.expiryDate) < new Date() ? (
                              <Badge variant="destructive">Expired</Badge>
                            ) : (
                              <Badge variant="success">Active</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Issued by {cert.issuer} on {formatDate(cert.date)}
                          </div>
                          {cert.expiryDate && (
                            <div className="text-sm text-muted-foreground">
                              {new Date(cert.expiryDate) > new Date()
                                ? `Expires on ${formatDate(cert.expiryDate)}`
                                : `Expired on ${formatDate(cert.expiryDate)}`}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employee.education.map((edu, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                        <div className="rounded-full bg-muted p-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{edu.degree}</div>
                          <div className="text-sm text-muted-foreground">
                            {edu.institution}, Class of {edu.year}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employee.documents.map((doc, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-muted p-2">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{doc.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {doc.type.replace(/_/g, " ")} • Issued: {formatDate(doc.issueDate)}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Employment Tab */}
            <TabsContent value="employment" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Compensation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 border rounded-lg">
                        <div className="rounded-full bg-muted p-2">
                          <Banknote className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            {formatCurrency(employee.salary.amount, employee.salary.currency)}
                          </div>
                          <div className="text-sm text-muted-foreground">Annual Salary</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Last Review</div>
                          <div className="font-medium">{formatDate(employee.salary.lastReviewDate)}</div>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Next Review</div>
                          <div className="font-medium">{formatDate(employee.salary.nextReviewDate)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Banking Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Account Name</div>
                            <div className="font-medium">{employee.bankDetails.accountName}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Account Number</div>
                            <div className="font-medium">{employee.bankDetails.accountNumber}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Bank Name</div>
                            <div className="font-medium">{employee.bankDetails.bankName}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Employment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 space-y-6">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-muted-foreground/20"></div>

                    <div className="relative">
                      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary -translate-x-[4.5px]"></div>
                      <div className="pl-6">
                        <div className="font-medium">{employee.role.replace(/_/g, " ")}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(employee.hireDate)} - Present</div>
                        <div className="text-sm mt-1">{employee.department} Department</div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-muted-foreground -translate-x-[4.5px]"></div>
                      <div className="pl-6">
                        <div className="font-medium">Assistant Manager</div>
                        <div className="text-sm text-muted-foreground">
                          Jan 2018 - {formatDate(new Date(employee.hireDate.getTime() - 86400000))}
                        </div>
                        <div className="text-sm mt-1">Operations Department</div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-muted-foreground -translate-x-[4.5px]"></div>
                      <div className="pl-6">
                        <div className="font-medium">Senior Sales Agent</div>
                        <div className="text-sm text-muted-foreground">Mar 2016 - Dec 2017</div>
                        <div className="text-sm mt-1">Sales Department</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Access & Permissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <span>Access Level</span>
                      </div>
                      <Badge>{employee.accessLevel}</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span>User Management</span>
                      </div>
                      <Badge variant="outline">Full Access</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-muted-foreground" />
                        <span>Fleet Management</span>
                      </div>
                      <Badge variant="outline">View & Edit</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Banknote className="h-5 w-5 text-muted-foreground" />
                        <span>Financial Data</span>
                      </div>
                      <Badge variant="outline">View Only</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Headphones className="h-5 w-5 text-muted-foreground" />
                        <span>Customer Support</span>
                      </div>
                      <Badge variant="outline">Full Access</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Helper component for employee status badge
function EmployeeStatusBadge({ status }: { status: EmployeeStatus }) {
  const getVariant = () => {
    switch (status) {
      case EmployeeStatus.ACTIVE:
        return "success"
      case EmployeeStatus.ON_LEAVE:
        return "warning"
      case EmployeeStatus.SUSPENDED:
        return "destructive"
      case EmployeeStatus.TERMINATED:
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Badge variant={getVariant()} className="capitalize">
      {status.toLowerCase().replace(/_/g, " ")}
    </Badge>
  )
}

