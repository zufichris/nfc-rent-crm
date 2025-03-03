"use client"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useEffect, useState } from "react"
import { MenuGroups } from "./app-sidebar"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"


export function Search() {

  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (url: string) => {
    router.push(url)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-1/4 cursor-pointer flex space-x-4 items-center">
        <SearchIcon />
        <div className="dark:text-secondary-foreground/60 text-secondary-foreground/80 flex items-center gap-1">Search <span className="hidden md:block">[⌘K]</span></div>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." className="outline-0" />
        <CommandList className="scrollbar">
          <CommandEmpty>No results found.</CommandEmpty>
          {MenuGroups.map(group => (
            <CommandGroup key={group.name} heading={<div className="flex">{group.icon} {group.name}</div>}>
              {group.links.map(link => (
                <CommandItem className="cursor-pointer" key={link.title} onClick={() => handleSelect(`/${group.slug}/${link.slug}`)}>
                  <span>{link.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>

    </>
  )
}

