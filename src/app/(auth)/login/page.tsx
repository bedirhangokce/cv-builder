'use client'

import { useFormStatus } from 'react-dom'
import { authenticate } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useActionState } from 'react'
import { useState } from 'react'

function LoginButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Logging in...' : 'Login'}
        </Button>
    )
}

export default function LoginPage() {
    const [errorMessage, formAction] = useActionState(authenticate, undefined)

    return (
        <Card className="w-full shadow-lg border-zinc-200 dark:border-zinc-800">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    {errorMessage && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md border border-red-200 dark:border-red-900">
                            {errorMessage}
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <LoginButton />
                    <div className="text-sm text-center text-muted-foreground">
                        Don't have an account? <Link href="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}
