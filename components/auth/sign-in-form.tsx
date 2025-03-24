"use client"
import { login } from "@/lib/actions/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type React from "react"

import { useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { requestOtp, verifyOtp } from "@/lib/actions/auth"

export const SignInForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [message, setMessage] = useState("")
    const router = useRouter()
    const [showVerificationModal, setShowVerificationModal] = useState(false)
    const [verificationToken, setVerificationToken] = useState("")

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault()
        setMessage("")
        setIsLoading(true)
        const res = await login({
            email,
            password,
        })
        if (res.success) {
            if (res.data.requiresOtp && res.data.token) {
                setVerificationToken(res.data.token)
                setShowVerificationModal(true)
            } else if (res.data.accessToken) {
                toast.success(res.message)
                router.push("/")
            } else {
                setMessage("An error occurred")
            }
        } else {
            setMessage(res.message)
        }
        setIsLoading(false)
    }

    const handleVerificationSuccess = () => {
        setShowVerificationModal(false)
        toast.success("Verification successful")
        router.push("/")
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Email address
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-11"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Password
                        </Label>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-10 h-11"
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1.5 h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => {
                            if (typeof checked === "boolean") {
                                setRememberMe(checked)
                            }
                        }}
                    />
                    <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Remember me for 30 days
                    </label>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
                {message ? <p className="text-destructive text-sm font-bold w-full text-left">{message}</p> : null}
                <Button
                    className="w-full h-11 font-medium text-base transition-all duration-200 hover:shadow-md"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign in"
                    )}
                </Button>

                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>

                <div className="flex items-center">
                    <Button variant="outline" className="h-11">
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                    </Button>
                </div>
            </CardFooter>
            {/* Verification Modal */}
            <Dialog open={showVerificationModal} onOpenChange={setShowVerificationModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Verification Required</DialogTitle>
                        <DialogDescription>
                            Enter the 6-digit code sent to your email: <span className="text-primary underline">{email}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <VerifyOtp token={verificationToken} email={email} onSuccess={handleVerificationSuccess} inModal={true} />
                    </div>
                </DialogContent>
            </Dialog>
        </form>
    )
}

export const VerifyOtp = ({
    token,
    email,
    onSuccess,
    inModal = false,
}: {
    token: string
    email: string
    onSuccess?: () => void
    inModal?: boolean
}) => {
    const length = 6
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
            toast("Please enter all 6 digits of your verification code.")
            return
        }

        if (isSubmitting) return
        setIsSubmitting(true)

        const res = await verifyOtp({ email, code: otp, token })
        if (res.success && res.data.accessToken && res.data.refreshToken) {
            toast("Your account has been verified successfully.")
            if (onSuccess) {
                onSuccess()
            } else {
                router.push("/")
            }
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
            setTimer(30)
            setTimerActive(true)
        } else {
            toast("An error occurred. Please try again later.")
        }
        setIsResending(false)
    }

    if (inModal) {
        return (
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="flex justify-center py-4">
                        <InputOTP maxLength={6} value={otp} onChange={(value: string) => setOtp(value.trim())}>
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
                </div>
            </form>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Verification Required</CardTitle>
                <CardDescription className="text-center">
                    Enter the 4-digit code sent to your email: <span className="text-primary underline">{email}</span>
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="flex justify-center py-4">
                        <InputOTP maxLength={6} value={otp} onChange={(value: string) => setOtp(value.trim())}>
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

