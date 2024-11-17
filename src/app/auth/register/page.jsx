'use client'

import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const { user, loading } = useAuth()

    const handleRegister = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast({
                title: "Pendaftaran gagal",
                description: "Password dan konfirmasi password tidak cocok.",
                variant: "destructive",
            })
            return
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            toast({
                title: "Pendaftaran berhasil",
                description: "Akun Anda telah berhasil dibuat.",
            })
            router.push('/')
        } catch (error) {
            toast({
                title: "Pendaftaran gagal",
                description: "Gagal membuat akun. Silakan coba lagi.",
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Buat Akun Baru</CardTitle>
                    <CardDescription className="text-center">
                        Masukkan detail Anda untuk membuat akun baru
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute w-4 h-4 left-3 top-[0.6rem] text-muted-foreground" />
                                <Input
                                    id="email"
                                    placeholder="nama@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute w-4 h-4 left-3 top-[0.6rem] text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoCapitalize="none"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-0 right-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4 bg-white" />
                                    ) : (
                                        <Eye className="w-4 h-4 bg-white" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                            <div className="relative">
                                <Lock className="absolute w-4 h-4 left-3 top-[0.6rem] text-muted-foreground" />
                                <Input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoCapitalize="none"
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-0 right-2 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-4 h-4 bg-white" />
                                    ) : (
                                        <Eye className="w-4 h-4 bg-white" />
                                    )}
                                    <span className="sr-only">
                                        {showConfirmPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <Button className="w-full" type="submit">
                            Daftar
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="text-sm text-muted-foreground">
                        Sudah punya akun?{" "}
                        <Link href="/login" className="font-medium text-primary hover:underline">
                            Masuk di sini
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}