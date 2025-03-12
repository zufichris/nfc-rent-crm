import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === "/signin"

    // const token = request.cookies.get("access_token")
    // const isAuthenticated = token?.value !== undefined

    // if (!isPublicPath && !isAuthenticated) {
    //     return NextResponse.redirect(new URL("/signin", request.url))
    // }

    // if (isPublicPath && isAuthenticated) {
    //     return NextResponse.redirect(new URL("/", request.url))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

