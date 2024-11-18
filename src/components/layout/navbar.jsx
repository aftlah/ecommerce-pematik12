'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, ShoppingCart, X, User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { auth } from '@/lib/firebase/init'
import { useAuth } from '@/hooks/useAuth'
import useCartStore from '@/stores/useCartStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const { user, username, loading } = useAuth()
    const { cartItems } = useCartStore()
    const menuRef = useRef(null)
    const buttonRef = useRef(null)

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const authPaths = ['/auth/login', '/auth/register','/dashboard']

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { name: 'Beranda', id: 'beranda' },
        { name: 'Menu', id: 'menu' },
        { name: 'Tentang Kami', id: 'tentang-kami' },
        { name: 'Kontak', id: 'kontak' },
    ];

    const pathOtherThanHome = ['/menu/list', '/order/list']

    return (
        <>
            {!authPaths.includes(pathname) && (
                <header className="sticky top-0 z-10 shadow-lg bg-gradient-to-r from-gray-800 to-gray-900">
                    <div className="container flex items-center justify-between py-4 mx-auto">
                        <motion.h1 
                            onClick={() => router.push('/')} 
                            className="text-2xl font-bold text-gray-100 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            WaroengKuh
                        </motion.h1>
                        
                        {pathOtherThanHome.includes(pathname) ? (
                            <nav className="hidden md:flex">
                                <Button variant="ghost" onClick={() => router.push('/')} className="text-gray-300 hover:text-white hover:bg-gray-700">
                                    Home
                                </Button>
                            </nav>
                        ) : (
                            <nav className="hidden space-x-1 md:flex">
                                {navItems.map((item) => (
                                    <Button
                                        key={item.id}
                                        variant="ghost"
                                        onClick={() => scrollToSection(item.id)}
                                        className="text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700"
                                    >
                                        {item.name}
                                    </Button>
                                ))}
                            </nav>
                        )}
                        
                        <div className="flex items-center space-x-4">
                            {user && (
                                <>
                                    <Button size="icon" className="relative bg-transparent hover:text-white hover:bg-gray-700" onClick={() => router.push('/order/list')}>
                                        <ShoppingCart className="w-6 h-6" />
                                        <span className="sr-only">Keranjang Belanja</span>
                                        {cartItems.length > 0 && (
                                            <span className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -right-2 -top-2">
                                                {cartItems.length}
                                            </span>
                                        )}
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="relative text-gray-300 rounded-full size-8 hover:text-white hover:bg-gray-700">
                                                <User className="w-6 h-6" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="end" forceMount>
                                            <DropdownMenuLabel className="font-normal">
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">{username}</p>
                                                    <p className="text-xs leading-none text-muted-foreground">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => auth.signOut()}>
                                                <LogOut className="w-4 h-4 mr-2" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            )}
                            {!user && (
                                <Button variant="ghost" onClick={() => router.push('/auth/login')} className="text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700">
                                    Login
                                </Button>
                            )}
                            <Button 
                                ref={buttonRef}
                                variant="ghost" 
                                size="icon" 
                                className="text-gray-300 md:hidden " 
                                onClick={toggleMenu}
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </div>
                    </div>
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                id="mobile-menu"
                                ref={menuRef}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute left-0 w-full overflow-hidden bg-gray-800 shadow-md top-full md:hidden"
                            >
                                <nav className="flex flex-col px-4 py-2 space-y-2">
                                    {navItems.map((item) => (
                                        <Button
                                            key={item.id}
                                            variant="ghost"
                                            onClick={() => scrollToSection(item.id)}
                                            className="justify-start text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700"
                                        >
                                            {item.name}
                                        </Button>
                                    ))}
                                    {user ? (
                                        <Button variant="ghost" onClick={() => auth.signOut()} className="justify-start text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700">
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </Button>
                                    ) : (
                                        <Button variant="ghost" onClick={() => router.push('/auth/login')} className="justify-start text-gray-300 transition-colors duration-200 hover:text-white hover:bg-gray-700">
                                            Login
                                        </Button>
                                    )}
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </header>
            )}
        </>
    )
}

export default Navbar