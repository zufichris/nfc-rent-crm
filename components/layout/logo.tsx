import Link from 'next/link'
import React from 'react'

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center">
            <div className="px-3 bg-primary rounded-xs flex items-center justify-center mr-2 shadow-lg shadow-primary/25">
                <span className="text-white text-xl font-bold">NFC</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Rent</span>
        </Link>
    )
}
