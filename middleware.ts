import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    request.headers.set('next-url', path)
    const isPublicPath = path === "/signin"

    const isAuthenticated = true

    if (!isPublicPath && !isAuthenticated) {
        return NextResponse.redirect(new URL("/signin", request.url))
    }

    if (isPublicPath && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

