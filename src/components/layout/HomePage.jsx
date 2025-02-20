"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { motion } from "framer-motion"
import { auth } from "@/lib/firebase/init"
import { getMenus } from "@/lib/firebase/service"
import useCartStore from "@/stores/useCartStore"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import HeroSection from "./HeroSection"
import AboutSection from "./AboutSection"
import MenuSection from "./MenuSection"
import FooterSection from "./FooterSection"

export default function HomePage() {
    const [products, setProducts] = useState([])
    const [user, setUser] = useState(null)
    const { toast } = useToast()
    const router = useRouter()
    const addToCartStore = useCartStore((state) => state.addToCart)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        const fetchProducts = async () => {
            try {
                const products = await getMenus()
                setProducts(products)
            } catch (error) {
                console.error("Error fetching products: ", error)
                toast({
                    title: "Error",
                    description: "Failed to fetch products. Please check your Firestore rules.",
                    variant: "destructive",
                })
            }
        }

        fetchProducts()

        return () => unsubscribe()
    }, [toast])

    const addToCart = (product) => {
        if (user) {
            addToCartStore(product)
            toast({
                title: "Produk ditambahkan",
                description: `${product.name} telah ditambahkan ke keranjang.`,
            })
        } else {
            toast({
                title: "Login diperlukan",
                description: "Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.",
                variant: "destructive",
            })
            router.push("/auth/login")
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    }

    return (
        <motion.div className="flex flex-col min-h-screen" initial="hidden" animate="visible" variants={containerVariants}>
            <Toaster />
            <HeroSection />
            <AboutSection />
            <MenuSection products={products.slice(0, 4)} addToCart={addToCart} />
            <FooterSection />
        </motion.div>
    )
}

