"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2 } from "lucide-react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { requestOtp, verifyOtp } from "@/lib/actions/auth"


export const VerifyOtp = ({ token, email }: { token: string, email: string }) => {
    const length = 6;
    const router = useRouter()
    const [otp, setOtp] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [timer, setTimer] = useState(30)
    const [timerActive, setTimerActive] = useState(true)


    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (timerActive) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        setTimerActive(false)
                        clearInterval(interval!)
                        return 0
                    }
                    return prevTimer - 1
                })
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [timerActive])

    useEffect(() => {
        if (otp.length === length && !isSubmitting) {
            handleSubmit()
        }
    }, [otp])

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()

        if (otp.length !== length) {
            toast("Please enter all 4 digits of your verification code.")
            return
        }

        if (isSubmitting) return
        setIsSubmitting(true)

        const res = await verifyOtp({ email, code: otp, token })
        if (res.success && res.data.accessToken && res.data.refreshToken) {
            toast("Your account has been verified successfully.")
            router.push("/")
        } else {
            toast(res.message)
            setOtp("")
        }
        setIsSubmitting(false)
    }

    const handleResendOTP = async () => {
        setIsResending(true)
        const res = await requestOtp(email)
        if (res.success && res.data.sent) {
            toast("A new verification code has been sent to your email/phone.")
            router.push(`?email=${email}&token=${res.data.token}`)
            setTimer(30)
            setTimerActive(true)
        } else {
            toast("An error occurred. Please try again later.")

        }
        setIsResending(false)
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Verification Required</CardTitle>
                <CardDescription className="text-center">Enter the 4-digit code sent to your email: <span className="text-primary underline">{email}</span></CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="flex justify-center py-4">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value: string) => setOtp(value.trim())}
                        >
                            <InputOTPGroup>
                                {new Array(length).fill(0).map((_, index) => (
                                    <InputOTPSlot className="font-black text-2xl p-6" index={index} key={_ + index + 1} />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>

                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        Didn't receive a code?{" "}
                        {timerActive ? (
                            <span>Resend in {timer}s</span>
                        ) : (
                            <Button
                                type="button"
                                variant={"ghost"}
                                onClick={handleResendOTP}
                                disabled={isResending || timerActive}
                                className="text-primary hover:underline focus:outline-none disabled:opacity-50"
                            >
                                Resend code
                            </Button>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={otp.length !== 6 || isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                Verify
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
