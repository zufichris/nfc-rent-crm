"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Bell, Check, MoreHorizontal, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const Notification = ({ className }: Readonly<{ className?: string }>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New message from Sarah",
      description: "Hey, I wanted to check in about the project...",
      category: "message",
      link: "",
      time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
    {
      id: "2",
      title: "Your subscription is expiring soon",
      description: "Your premium plan will expire in 3 days",
      category: "alert",
      link: "",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
    },
    {
      id: "3",
      title: "New login detected",
      description: "A new login was detected from Chrome on Windows",
      category: "security",
      link: "",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: false,
    },
    {
      id: "4",
      title: "Weekly summary available",
      description: "Your activity report for last week is ready to view",
      category: "alert",
      link: "",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + " years ago"

    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"

    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"

    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"

    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + " minutes ago"

    return "Just now"
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((note) => (note.id === id ? { ...note, read: true } : note)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((note) => ({ ...note, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((note) => note.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "message":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Message
          </Badge>
        )
      case "security":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Security
          </Badge>
        )
      case "alert":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Alert
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className={cn(className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="relative text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0" align="end" sideOffset={8}>
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>
                  {unreadCount > 0
                    ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                    : "No new notifications"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-8">
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Mark all read
                  </Button>
                )}
              </div>
            </CardHeader>
            <Tabs defaultValue="all" className="w-full">
              <div className="px-4 pt-2">
                <TabsList className="w-full justify-start bg-transparent p-0 h-auto">
                  <TabsTrigger
                    value="all"
                    className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    Unread
                  </TabsTrigger>
                </TabsList>
              </div>
              <CardContent className="p-0 max-h-[350px] overflow-y-auto scrollbar">
                <TabsContent value="all" className="m-0">
                  {notifications.length > 0 ? (
                    <div className="divide-y">
                      {notifications.map((note) => (
                        <NotificationItem
                          key={note.id}
                          notification={note}
                          onMarkAsRead={markAsRead}
                          onDelete={deleteNotification}
                          formatTimeAgo={formatTimeAgo}
                          getCategoryBadge={getCategoryBadge}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground/50 mb-3" />
                      <h3 className="text-sm font-medium">No notifications</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        When you get notifications, they'll appear here
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="unread" className="m-0">
                  {notifications.filter((n) => !n.read).length > 0 ? (
                    <div className="divide-y">
                      {notifications
                        .filter((n) => !n.read)
                        .map((note) => (
                          <NotificationItem
                            key={note.id}
                            notification={note}
                            onMarkAsRead={markAsRead}
                            onDelete={deleteNotification}
                            formatTimeAgo={formatTimeAgo}
                            getCategoryBadge={getCategoryBadge}
                          />
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                      <Check className="h-12 w-12 text-muted-foreground/50 mb-3" />
                      <h3 className="text-sm font-medium">All caught up!</h3>
                      <p className="text-xs text-muted-foreground mt-1">You've read all your notifications</p>
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Tabs>
            <div className="p-2 border-t">
              <div className="flex justify-between">
                <Button variant="ghost" className="text-xs" size="sm">
                  View all notifications
                </Button>
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    className="text-xs text-destructive hover:text-destructive"
                    size="sm"
                    onClick={clearAll}
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface NotificationItemProps {
  notification: {
    id: string
    title: string
    description: string
    category: string
    link: string
    time: Date
    read: boolean
  }
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
  formatTimeAgo: (date: Date) => string
  getCategoryBadge: (category: string) => React.ReactNode
}

const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDelete,
  formatTimeAgo,
  getCategoryBadge,
}: NotificationItemProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors",
        !notification.read && "bg-muted/30",
      )}
    >
      {!notification.read && <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />}
      {notification.read && <div className="w-2 flex-shrink-0" />}
      <div className="flex-1 space-y-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p className="text-sm font-medium line-clamp-2">{notification.title}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!notification.read && (
                <DropdownMenuItem onClick={() => onMarkAsRead(notification.id)}>
                  <Check className="mr-2 h-4 w-4" />
                  Mark as read
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => onDelete(notification.id)}
                className="text-destructive focus:text-destructive"
              >
                <X className="mr-2 h-4 w-4" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{notification.description}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-muted-foreground">{formatTimeAgo(notification.time)}</p>
          {getCategoryBadge(notification.category)}
        </div>
      </div>
    </div>
  )
}

