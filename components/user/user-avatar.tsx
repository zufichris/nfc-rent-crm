import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User, User2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { logout } from "@/lib/actions/auth"

export const UserAvatar = ({ isLoggedInUser = false, className, src, alt }: Readonly<{ isLoggedInUser?: boolean, className?: string, src?: string, alt?: string }>) => {
    async function handleLogout() {
        await logout()
    }

    const renderAvatar = () => (
        <Avatar className={className}>
            <AvatarFallback>
                <User2 />
            </AvatarFallback>
            <AvatarImage src={src} alt={alt}></AvatarImage>
        </Avatar>
    )

    return (
        <>
            {isLoggedInUser ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {renderAvatar()}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> : renderAvatar()}
        </>
    )
}

