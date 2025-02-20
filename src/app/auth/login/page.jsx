// 'use client'

import LoginForm from "@/components/layout/LoginForm";

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '@/lib/firebase/init'
// import { useAuth } from '@/hooks/useAuth'
// import Link from 'next/link'
// import { Eye, EyeOff, Loader2 } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import useUserStore from '@/stores/useUserStore'

// export default function LoginPage() {
// 	const [email, setEmail] = useState('')
// 	const [password, setPassword] = useState('')
// 	const [showPassword, setShowPassword] = useState(false)
// 	const [rememberMe, setRememberMe] = useState(false)
// 	const [isLoggingIn, setIsLoggingIn] = useState(false)
// 	const router = useRouter()
// 	const { toast } = useToast()
// 	const { user, loading } = useAuth()
// 	const { login } = useUserStore()

// 	const handleLogin = async (e) => {
// 		e.preventDefault()
// 		setIsLoggingIn(true)
// 		try {
// 			const userCredential = await signInWithEmailAndPassword(auth, email, password)
// 			const user = userCredential.user

// 			login({
// 				email: user.email,
// 				uid: user.uid,
// 				displayName: user.displayName || "Guest"
// 			})

// 			toast({
// 				title: "Login berhasil",
// 				description: "Anda telah berhasil masuk ke akun Anda.",
// 			})
// 			router.push('/')
// 		} catch (error) {
// 			toast({
// 				title: "Login gagal",
// 				description: "Gagal masuk. Periksa kembali email dan password Anda.",
// 				variant: "destructive",
// 			})
// 		} finally {
// 			setIsLoggingIn(false)
// 		}
// 	}

// 	useEffect(() => {
// 		if (loading) return
// 		if (user) {
// 			login({
// 				email: user.email,
// 				uid: user.uid,
// 				displayName: user.displayName || "Guest"
// 			})
// 			router.push('/')
// 		}
// 	}, [user, loading, router, login])

// 	if (loading) {
// 		return <div>Loading...</div>
// 	}

// 	return (
// 		<div className="flex items-center justify-center min-h-screen bg-gray-100">
// 			<Card className="w-full max-w-md shadow-lg">
// 				<CardHeader className="space-y-1">
// 					<CardTitle className="text-2xl font-bold text-center">Selamat Datang di <br /> Waroengkuh</CardTitle>
// 					<CardDescription className="text-center">
// 						Silakan masuk dengan email dan password Anda.
// 					</CardDescription>
// 				</CardHeader>
// 				<CardContent>
// 					<form onSubmit={handleLogin}>
// 						<div className="space-y-4">
// 							<div>
// 								<Label htmlFor="email">Email</Label>
// 								<Input
// 									id="email"
// 									type="email"
// 									value={email}
// 									onChange={(e) => setEmail(e.target.value)}
// 									required
// 								/>
// 							</div>
// 							<div>
// 								<Label htmlFor="password">Password</Label>
// 								<div className="relative">
// 									<Input
// 										id="password"
// 										type={showPassword ? 'text' : 'password'}
// 										value={password}
// 										onChange={(e) => setPassword(e.target.value)}
// 										required
// 									/>
// 									<button
// 										type="button"
// 										className="absolute inset-y-0 right-0 flex items-center px-2"
// 										onClick={() => setShowPassword(!showPassword)}
// 									>
// 										{showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
// 									</button>
// 								</div>
// 							</div>
// 							<div className="flex items-center">
// 								<Input
// 									id="rememberMe"
// 									type="checkbox"
// 									checked={rememberMe}
// 									onChange={(e) => setRememberMe(e.target.checked)}
// 								/>
// 								<Label htmlFor="rememberMe" className="ml-2">
// 									Ingat saya
// 								</Label>
// 							</div>
// 							<Button type="submit" className="w-full" disabled={isLoggingIn}>
// 								{isLoggingIn ? (
// 									<>
// 										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
// 										Sedang Masuk...
// 									</>
// 								) : (
// 									'Masuk'
// 								)}
// 							</Button>
// 						</div>
// 					</form>
// 				</CardContent>
// 				<CardFooter className="flex justify-center">
// 					<Link href="/auth/register" className="text-sm text-blue-500 hover:underline">
// 						Belum punya akun? Daftar
// 					</Link>
// 				</CardFooter>
// 			</Card>
// 		</div>
// 	)
// }


export default function LoginPage() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<LoginForm />
		</div>
	)
}

