import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex bg-card h-[73vh]  card flex-col items-center justify-center  text-center">
      <div className="flex items-center  justify-center w-16 h-16 mb-6 rounded-full bg-muted">
        <FileQuestion className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight mb-2">Page not found</h2>
      <p className="text-muted-foreground mb-6 max-w-md">Sorry, we couldn't find the page you're looking for.</p>
      <Button asChild>
        <Link href="/">Return home</Link>
      </Button>
    </div>
  )
}

