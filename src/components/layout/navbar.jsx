'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuth } from '@/hooks/useAuth'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    // const [user, setUser] = useState(null)
    const router = useRouter()
    const pathname = usePathname()
    const { user, username, loading } = useAuth()


    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser)
    //     })

    //     return () => unsubscribe()
    // }, [])



    console.log(username);



    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };



    const authPaths = ['/auth/login', '/auth/register']

    return (
        <>
            {!authPaths.includes(pathname) ? (

                <header className="sticky top-0 z-10 bg-[#1A1A1D] shadow xl:px-[50px] text-white">
                    <div className="container flex items-center justify-between py-4 mx-auto">
                        <h1 onClick={() => router.push('/')} className="text-2xl font-bold cursor-pointer">WaroengKuh</h1>
                        {pathname == '/order/list' ? (
                            <nav className="hidden md:flex">
                                <button onClick={() => router.push('/')} className=" hover:underline">Home</button>
                            </nav>
                        ) : (
                            <nav className="hidden space-x-4 md:flex">
                                <button onClick={() => scrollToSection('beranda')} className=" hover:underline">Beranda</button>
                                <button onClick={() => scrollToSection('menu')} className=" hover:underline">Menu</button>
                                <button onClick={() => scrollToSection('tentang-kami')} className=" hover:underline">Tentang Kami</button>
                                <button onClick={() => scrollToSection('kontak')} className=" hover:underline">Kontak</button>
                                {user ? (
                                    <Button variant="ghost" onClick={() => auth.signOut()}>Logout</Button>
                                ) : (
                                    <Button variant="ghost" onClick={() => router.push('/auth/login')}>Login</Button>
                                )}

                            </nav>
                        )}

                        <div className="flex items-center p-1 space-x-4 text-primary ">
                            {user && (
                                <>
                                    <Button variant="outline" size="icon" className="relative " onClick={() => router.push('/order/list')}>
                                        <ShoppingCart className="w-5 h-5" />
                                        <span className="sr-only">Keranjang Belanja</span>
                                        <span className="absolute items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -right-1 -top-1 inlie-flex">
                                            5
                                        </span>
                                    </Button>
                                    <p className='text-white'>{username}</p>
                                </>

                            )}
                            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                <span className="sr-only">Menu</span>
                            </Button>
                        </div>

                    </div>
                    {isMenuOpen && (
                        <nav className="absolute left-0 flex flex-col w-full px-4 py-2 space-y-2 bg-blue-900 shadow-md top-full md:hidden">
                            <button onClick={() => scrollToSection('beranda')} className=" hover:underline">Beranda</button>
                            <button onClick={() => scrollToSection('menu')} className=" hover:underline">Menu</button>
                            <button onClick={() => scrollToSection('tentang-kami')} className=" hover:underline">Tentang Kami</button>
                            <button onClick={() => scrollToSection('kontak')} className=" hover:underline">Kontak</button>
                            {user ? (
                                <Button variant="ghost" onClick={() => auth.signOut()}>Logout</Button>
                            ) : (
                                <Button variant="ghost" onClick={() => router.push('/auth/login')}>Login</Button>
                            )}
                        </nav>
                    )}
                </header>
            ) : (
                null
            )}

        </>

    )
}

export default Navbar