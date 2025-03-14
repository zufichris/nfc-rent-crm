import React from 'react'
import { PageBreadCrumbs } from '../misc/bread-crumbs'


export function PageShell({ children }: Readonly<{ children: React.ReactNode, }>) {

    return (
        <>
            <PageBreadCrumbs />
            {children}
        </>
    )
}