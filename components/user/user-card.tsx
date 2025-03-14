"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Calendar, Check, Edit, MailIcon, MoreHorizontal, PhoneIcon, Shield, Trash2, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { renderStatus } from "../misc/table/data-table"
import { getVariant } from "../theme/variants"

interface UserData {
    fullName: string
    email: string
    phone?: string
    photo?: string
    id: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt?: string
    deletedAt?: string
    password?: string
    emailVerified: boolean
    phoneVerified: boolean
    roles: string[]
}

interface UserCardProps {
    user: UserData
    className?: string
    onEdit?: (user: UserData) => void
    onDelete?: (user: UserData) => void
    onActivate?: (user: UserData) => void
    onDeactivate?: (user: UserData) => void
}

export function UserCard({ user, className }: Readonly<UserCardProps>) {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    const formatDate = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true })
        } catch (error) {
            return "Invalid date"
        }
    }

    const primaryRole = user.roles[0] || "User"

    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="p-0">
                <div className="relative h-24 bg-muted">
                    {/* Status indicator */}
                    <div className="absolute top-2 right-2 flex gap-1">
                        {renderStatus({ isActive: user.isActive, isDeleted: user.isDeleted })}
                    </div>

                    {/* Avatar */}
                    <div className="absolute -bottom-10 left-4">
                        <Avatar className="h-20 w-20 border-4 border-background shadow-sm">
                            <AvatarImage src={user.photo} alt={user.fullName} />
                            <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                                {getInitials(user.fullName)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-12 pb-4">
                <div className="space-y-3">
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg leading-none">{user.fullName}</h3>
                            <Badge variant={"outline"}>{primaryRole}</Badge>
                        </div>

                        {user.roles.length > 1 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                                {user.roles.slice(1).map((role, index) => (
                                    <Badge key={index} variant="outline" className="text-xs px-1 py-0 h-4 font-normal">
                                        {role}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center text-sm">
                            <MailIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{user.email}</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Badge
                                            variant={user.emailVerified ? "outline" : "outline"}
                                            className={cn(
                                                "ml-2 h-4 w-4 p-0 rounded-full",
                                                user.emailVerified
                                                    ? "border-primary bg-primary/10 hover:bg-primary/10"
                                                    : "border-muted-foreground hover:bg-transparent",
                                            )}
                                        >
                                            {user.emailVerified ? (
                                                <Check className="h-2.5 w-2.5 text-primary" />
                                            ) : (
                                                <X className="h-2.5 w-2.5 text-muted-foreground" />
                                            )}
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="text-xs">
                                        {user.emailVerified ? "Email verified" : "Email not verified"}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {user.phone && (
                            <div className="flex items-center text-sm">
                                <PhoneIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">{user.phone}</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge
                                                variant={user.phoneVerified ? "outline" : "outline"}
                                                className={cn(
                                                    "ml-2 h-4 w-4 p-0 rounded-full",
                                                    user.phoneVerified
                                                        ? "border-primary bg-primary/10 hover:bg-primary/10"
                                                        : "border-muted-foreground hover:bg-transparent",
                                                )}
                                            >
                                                {user.phoneVerified ? (
                                                    <Check className="h-2.5 w-2.5 text-primary" />
                                                ) : (
                                                    <X className="h-2.5 w-2.5 text-muted-foreground" />
                                                )}
                                            </Badge>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="text-xs">
                                            {user.phoneVerified ? "Phone verified" : "Phone not verified"}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="border-t px-6 py-3 text-xs text-muted-foreground">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        <span>Created {formatDate(user.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                        <Shield className="h-3.5 w-3.5 mr-1.5" />
                        <span>ID: {user.id.substring(0, 8)}</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

