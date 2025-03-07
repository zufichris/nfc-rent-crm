'use server'
import React from 'react'
import { SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { Header } from './header'
import { Footer } from './footer'

export async function Shell({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='w-full px-6 h-screen overflow-y-auto overflow-x-hidden relative'>
                <Header />
                <main className='w-full relative scrollbar'>
                    {children}
                </main>
                <Footer />
            </div>
        </SidebarProvider>
    )
}
