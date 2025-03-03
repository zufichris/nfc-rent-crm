import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Mail, Phone } from "lucide-react"
import { getUserById } from "@/lib/actions/user"

export default async function UserDetailsPage({
    params,
}: Readonly<{
    params: { id: string }
}>) {
    const res = await getUserById(Number(params.id))

    if (!res.success) {
        return notFound()
    }
    const user = res.data

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
                <Link href="/users">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Users
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">{user.fullName}</CardTitle>
                            <CardDescription>User ID: {user.id}</CardDescription>
                        </div>
                        <Badge variant={user.isActive ? "default" : "destructive"}>{user.isActive ? "Active" : "Inactive"}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-muted-foreground">Email</div>
                            <div className="flex items-center">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{user.email}</span>
                                {user.emailVerified && (
                                    <Badge variant="outline" className="ml-2">
                                        Verified
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {user.phone && (
                            <div className="space-y-1">
                                <div className="text-sm font-medium text-muted-foreground">Phone</div>
                                <div className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>{user.phone}</span>
                                    {user.phoneVerified && (
                                        <Badge variant="outline" className="ml-2">
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <div className="text-sm font-medium text-muted-foreground">Created At</div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {user.updatedAt && (
                            <div className="space-y-1">
                                <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>{new Date(user.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="text-sm font-medium text-muted-foreground mb-2">Roles</div>
                        <div className="flex flex-wrap gap-2">
                            {user.roles.map((role) => (
                                <Badge key={role} className="capitalize">
                                    {role}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

