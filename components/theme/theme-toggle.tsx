"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: Readonly<{ className?: string }>) {
  const { setTheme, themes } = useTheme()

  return (
    <div className={cn("relative rounded-full w-10 h-10 transition-transform duration-300 hover:scale-110", className)}>
      <Button
        onClick={() => setTheme((c) => themes.find((t) => t !== c) ?? "light")}
        variant="ghost"
        size="icon"
        className="transition-all duration-300 hover:bg-primary/20"
      >
        <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all duration-500 ease-out dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all duration-500 ease-out dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}

