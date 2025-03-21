import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from 'lucide-react'
import { SignInForm } from "@/components/auth/sign-in-form"

export default function SignInPage() {


  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your account</p>
        </div>

        <Card className="border-none shadow-lg dark:shadow-slate-900/30">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-xl">Sign in</CardTitle>
            <CardDescription>Enter your credentials below</CardDescription>
          </CardHeader>
          <SignInForm />
        </Card>
      </div>
    </div>
  )
}
