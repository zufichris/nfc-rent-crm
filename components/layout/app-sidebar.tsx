"use client";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Calendar,
  Car,
  LineChartIcon as ChartLine,
  ChevronRight,
  Circle,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme/theme-toggle";
import { Language } from "./language";
import { Currency } from "./currency";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../user/user-avatar";

type LinkItem = {
  title: string;
  slug: string;
};

type Group = {
  name: string;
  slug: string;
  icon: React.JSX.Element,
  links: LinkItem[];
};

export const MenuGroups: Group[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="size-4 mr-2" />,
    links: [
      { title: "Overview", },
      { title: "Analytics" },
    ],
  },
  {
    name: "Fleet Management",
    icon: <Car className="size-4 mr-2" />,
    links: [
      { title: "Vehicles", },
      { title: "Maintenance", },
      { title: "Availability" },
    ],
  },
  {
    name: "Reservations",
    icon: <Calendar className="size-4 mr-2" />,
    links: [
      { title: "New Reservation" },
      { title: "Reservation List", },
      { title: "Calendar", },
    ],
  },
  {
    name: "Customers",
    icon: <Users className="size-4 mr-2" />,
    links: [
      { title: "Customer List", },
      { title: "Feedback", },
    ],
  },
  {
    name: "Sales",
    icon: <DollarSign className="size-4 mr-2" />,
    links: [
      { title: "New Sale", },
      { title: "Sales History", },
    ],
  },
  {
    name: "Finance",
    slug: "finance",
    icon: <CreditCard className="size-4 mr-2" />,
    links: [
      { title: "Invoices", },
      { title: "Payments", },
    ],
  },
  {
    name: "Reports",
    slug: "reports",
    icon: <ChartLine className="size-4 mr-2" />,
    links: [
      { title: "Performance", },
      { title: "Revenue", },
    ],
  },
  {
    name: "Settings",
    slug: "settings",
    icon: <Settings className="size-4 mr-2" />,
    links: [
      { title: "User Management" },
      { title: "System Settings" },
    ],
  },
].map(g => ({
  name: g.name,
  slug: g.name.toLowerCase().split(" ").join("-"),
  icon: g.icon,
  links: g.links.map(l => ({
    title: l.title,
    slug: l.title.toLowerCase().split(" ").join("")
  }))
}))



export const AppSidebar = () => {
  const { openMobile } = useSidebar()
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {}

    MenuGroups.forEach((group) => {
      const isActive = group.links.some((link) => pathname === `/${group.slug}/${link.slug}`)
      initialState[group.slug] = isActive
    })

    return initialState
  })

  const toggleGroup = (slug: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }))
  }

  const isLinkActive = (groupSlug: string, linkSlug: string) => {
    return pathname === `/${groupSlug}/${linkSlug}`
  }

  return (
    <Sidebar className="shadow-card outline-0 border-0 transition-all duration-300 ease-in-out">
      <SidebarHeader className="mb-2">
        <div className="transition-transform duration-300 hover:scale-[1.02]">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent className="scrollbar">
        {MenuGroups.map((group) => (
          <SidebarGroup key={group.slug} className="space-y-1 transition-all duration-200 hover:translate-x-1">
            <SidebarGroupContent>
              <Collapsible open={openGroups[group.slug]} onOpenChange={() => toggleGroup(group.slug)}>
                <SidebarGroupLabel className="mb-1.5">
                  <CollapsibleTrigger asChild>
                    <div className="w-full flex justify-between font-bold transition-colors duration-200 hover:text-primary">
                      <div className="flex items-center space-x-1">
                        <span className="transition-transform duration-300 ease-in-out group-hover:rotate-12">
                          {group.icon}
                        </span>
                        <span>{group.name}</span>
                      </div>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform duration-300 ease-in-out",
                          openGroups[group.slug] ? "rotate-90" : "",
                        )}
                      />
                    </div>
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <SidebarGroupContent className="pl-2 space-y-1">
                  <CollapsibleContent className="transition-all duration-300 ease-in-out">
                    {group.links.map((link) => (
                      <Link
                        key={link.slug}
                        href={`/${group.slug}/${link.slug}`}
                        className={cn(
                          "flex gap-1 items-center px-3 py-2 my-0.5 text-sm rounded-sm transition-all duration-200 ease-in-out",
                          isLinkActive(group.slug, link.slug)
                            ? "bg-primary/80 text-primary-foreground scale-[1.02] shadow-sm"
                            : "hover:bg-muted hover:translate-x-1",
                        )}
                      >
                        <Circle
                          size={10}
                          className={cn(
                            "transition-all duration-300",
                            isLinkActive(group.slug, link.slug) ? "fill-primary-foreground" : "fill-transparent",
                          )}
                        />
                        {link.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </SidebarGroupContent>
              </Collapsible>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {openMobile ? (
        <SidebarFooter className="transition-all duration-300 ease-in-out">
          <div className="flex flex-col gap-1 animate-fadeIn">
            <ThemeToggle />
            <Language />
            <Currency className="w-full" />
          </div>
        </SidebarFooter>
      ) : (
        <div className="p-4 border-t transition-all duration-300 ease-in-out hover:bg-muted/50">
          <div className="flex items-center group">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <UserAvatar />
            </div>
            <div className="ml-2 transition-all duration-200 group-hover:translate-x-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      )}
      <SidebarRail className="bg-card transition-opacity duration-300 hover:opacity-100 opacity-95" />
    </Sidebar>
  )
}
