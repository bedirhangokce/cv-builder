'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', { ...Object.fromEntries(formData), redirectTo: '/dashboard' })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error // Rethrow to allow redirect
    }
}

export async function register(prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password || !name) {
        return 'Missing Fields'
    }

    try {
        const exists = await db.user.findUnique({ where: { email } })
        if (exists) {
            return 'Email already in use.'
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    } catch (error) {
        console.error("Registration error:", error)
        return 'Registration failed.'
    }

    // Sign in the user after registration
    try {
        await signIn('credentials', { ...Object.fromEntries(formData), redirectTo: '/dashboard' })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Something went wrong during auto-login.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}
