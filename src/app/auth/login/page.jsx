'use client'
import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useFirestore } from '../../../hooks/useFirestore'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const { user, loading } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
		
			await useFirestore.authenticationUser(auth, email, password)
            toast({
                title: "Login berhasil",
                description: "Anda telah berhasil masuk ke akun Anda.",
            })
            router.push('/')
        } catch (error) {
            toast({
                title: "Login gagal",
                description: "Gagal masuk. Periksa kembali email dan password Anda.",
                variant: "destructive",
            })
        }
    }

    useEffect(() => {
        if (loading) return
        if (user) {
            router.push('/')
        }
    }, [user, loading, router])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Masuk ke Akun Anda</CardTitle>
                    <CardDescription className="text-center">
                        Silakan masuk dengan email dan password Anda.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center px-2"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Checkbox
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <Label htmlFor="rememberMe" className="ml-2">
                                    Ingat saya
                                </Label>
                            </div>
                            <Button type="submit" className="w-full">
                                Masuk
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/register" className="text-sm text-blue-500 hover:underline">
                        Belum punya akun? Daftar
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}