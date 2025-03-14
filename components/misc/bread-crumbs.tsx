'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { ChevronLeft } from 'lucide-react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocale } from 'next-intl'

export const PageBreadCrumbs = () => {
    const router = useRouter()
    const pathname = usePathname()
    const locale = useLocale()
    const pathWithoutLocale = pathname.startsWith(`/${locale}`)
        ? pathname.slice(locale.length + 1)
        : pathname
    const segments = pathWithoutLocale.split("/").filter(Boolean)
    const breadcrumbPaths = segments.map((_, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`
        return {
            label: segments[index].toLowerCase().replace(/-/g, ' '),
            path
        }
    })

    return (
        <div className="mb-6">
            <Button
                onClick={() => router.back()}
                variant="outline"
                size="sm"
                className="mb-4 flex items-center gap-1"
            >
                <ChevronLeft className="h-4 w-4" />
                Back
            </Button>

            {segments.length > 0 && (
                <Breadcrumb className="mb-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                        {breadcrumbPaths.map((item, index) => {
                            let isDisabled = [breadcrumbPaths.length - 1, 0].includes(index)
                            return (
                                <React.Fragment key={item.path}>
                                    <BreadcrumbItem>
                                        {isDisabled ? (
                                            <span className="font-medium">{item.label}</span>
                                        ) : (
                                            <BreadcrumbLink href={item.path}>{item.label}</BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {index < breadcrumbPaths.length - 1 && <BreadcrumbSeparator />}
                                </React.Fragment>
                            )

                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </div>
    )
}