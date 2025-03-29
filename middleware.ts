import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Languages } from './types/language';

const publicRoutes = [
    '/signin',
    '/not-found',
    '/error',
    '/verify',
];

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0] && Languages.some(lang => lang.code === segments[0]) ? segments[0] : 'en';

    const pathWithoutLocale = segments.length > 0 && Languages.some(lang => lang.code === segments[0])
        ? `/${segments.slice(1).join('/')}`
        : pathname;

    const isPublicRoute = publicRoutes.some(route =>
        pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
    );

    const token = request.cookies.get('access_token')?.value;

    if (pathWithoutLocale === '/signin' && token) {
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    if (!isPublicRoute && !token) {
        return NextResponse.redirect(new URL(`/${locale}/signin`, request.url));
    }

    return intlMiddleware(request);
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};