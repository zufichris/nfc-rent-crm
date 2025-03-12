import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Languages, Locale } from './types/language';

const publicRoutes = ['/signin'];
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
    const response = intlMiddleware(request);
    const { pathname, searchParams } = request.nextUrl;
    const queryParams = searchParams.toString();
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0] && Languages.some(lang => lang.code === segments[0]) ? segments[0] : 'en';
    const token = request.cookies.get('token')?.value;
    const isProtectedRoute = publicRoutes.includes(`/${segments.slice(1).join('/')}`);
    if (isProtectedRoute && !token) {
        const callbackUrl = encodeURIComponent(`${pathname}${queryParams ? `?${queryParams}` : ''}`);
        const loginUrl = new URL(`/${locale}/signin?callbackUrl=${callbackUrl}`, request.url);
        return NextResponse.redirect(loginUrl);
    }
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
