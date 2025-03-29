import { VerifyOtp } from "@/components/auth/verify-otp"
import { notFound } from "next/navigation"

export default async function VerifyOTPPage({
    searchParams
}: Readonly<{
    searchParams: Promise<{ email?: string; token?: string }>
}>) {
    const search = await searchParams
    const email = search?.email
    const token = search?.token

    if (!token || !email) {
        return notFound()
    }

    return (
        <div className="flex items-center justify-center min-h-screen py-12">
            <VerifyOtp email={email} token={token} />
        </div>
    )
}