'use client'
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Search } from "./search"
import { Language } from "./language"
import { Currency } from "./currency"
import { Notification } from "./notification"
import { UserAvatar } from "../user/user-avatar"
import { SidebarTrigger } from "../ui/sidebar"

export function Header() {
  return (
    <header className="sticky z-50 pt-4 top-0  mb-5 backdrop-blur-lg">
      <SidebarTrigger className="absolute top-0   -left-7"/>
      <nav className="card shadow-card rounded w-full flex items-center p-4 text-foreground font-bold">
        <Search />
        <div className="ml-auto  flex items-center space-x-4">
          <ThemeToggle className="hidden md:block" />
          <Language className="hidden sm:block" />
          <Currency className="hidden md:block" />
          <Notification />
          <UserAvatar isLoggedInUser/>
        </div>
      </nav>
    </header>
  )
}