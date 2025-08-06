'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { useState } from 'react'
import { AuthError, Session, User } from '@supabase/supabase-js'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUp } from '@/actions/auth'
const Page = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const { data, error }: {
            data: { user: User | null; session: Session | null }
            error: AuthError | null
        } = await signUp({
            email,
            password,
            name,
        })
        setLoading(false);

        if (error) {
            console.error('Signup error:', error.message)
            toast.error(error.message)
        } else {
            console.log("Data:", data)
            toast.success("Verification link has been sent to your email")
            router.push('/login')
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[400px]">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Enter your details to create your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full mt-2" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Account'}
                            </Button>

                            <p className="text-sm text-center mt-2">
                                Already have an account?{' '}
                                <Link href="/login" className="text-blue-600 hover:underline">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Page
