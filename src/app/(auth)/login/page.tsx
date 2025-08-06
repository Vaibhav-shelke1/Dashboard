'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AuthError, Session, User } from '@supabase/supabase-js'
import { toast } from 'sonner'
import { login } from '@/actions/auth'

interface LoginRequest {
  email: string
  password: string
}

const Page = () => {
  const [req, setReq] = useState<LoginRequest>({ email: '', password: '' })
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const { data, error }: {
      data: { user: User | null; session: Session | null }
      error: AuthError | null
    } = await login(req)

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }
    console.log("Data:", data)
    toast.success('Login successful! Redirecting...')
    router.push('/') 
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={req.email}
                  onChange={(e) => setReq({ ...req, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={req.password}
                  onChange={(e) => setReq({ ...req, password: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <p className="text-sm text-center mt-2">
                Don’t have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
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
