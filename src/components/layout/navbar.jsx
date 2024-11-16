'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()

    


    return (
        <header className="sticky top-0 z-10 bg-red-600 shadow xl:px-[50px] text-white">
            <div className="container flex items-center justify-between px-4 py-4 mx-auto">
                <h1 onClick={() => router.push('/')} className="text-2xl font-bold cursor-pointer">WaroengKuh</h1>
                <nav className="hidden space-x-4 md:flex">
                    <button onClick={() => scrollToSection('beranda')} className="hover:opacity-80">Beranda</button>
                    <button onClick={() => scrollToSection('menu')} className="hover:opacity-80">Menu</button>
                    <button onClick={() => scrollToSection('tentang-kami')} className="hover:opacity-80">Tentang Kami</button>
                    <button onClick={() => scrollToSection('kontak')} className="hover:opacity-80">Kontak</button>
                </nav>
                <div className="flex items-center p-1 space-x-4 text-primary">
                    {/* <Button variant="outline" size="icon" onClick={() => toast({ title: "Keranjang Belanja", description: `Jumlah item: ${cart.length}` })}> */}
                    <Button variant="outline" size="icon" className="relative " onClick={() => router.push('/order/list') }>
                        <ShoppingCart className="w-5 h-5" />
                        <span className="sr-only">Keranjang Belanja</span>
                        {/* {cart.length > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                                {cart.length}
                            </span>
                        )} */}
                        <span className="absolute items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -right-1 -top-1 inlie-flex">
                            5
                        </span>
                    </Button>
                    <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        <span className="sr-only">Menu</span>
                    </Button>
                </div>
            </div>
            {isMenuOpen && (
                <nav className="absolute left-0 flex flex-col w-full px-4 py-2 space-y-2 bg-white shadow-md top-full md:hidden">
                    <button onClick={() => scrollToSection('beranda')} className="hover:text-primary">Beranda</button>
                    <button onClick={() => scrollToSection('menu')} className="hover:text-primary">Menu</button>
                    <button onClick={() => scrollToSection('tentang-kami')} className="hover:text-primary">Tentang Kami</button>
                    <button onClick={() => scrollToSection('kontak')} className="hover:text-primary">Kontak</button>
                </nav>
            )}

        </header>
    )
}

export default Navbar