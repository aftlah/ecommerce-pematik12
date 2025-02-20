"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search } from "lucide-react"
import Image from "next/image"
import useCartStore from "@/stores/useCartStore"
import { toast } from "@/hooks/use-toast"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase/init"
import { getMenus } from "@/lib/firebase/service"
import { useRouter } from "next/navigation"

export function MenuList() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [filteredItems, setFilteredItems] = useState([])
    const [products, setProducts] = useState([])
    const [user, setUser] = useState(null)
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
                setFilteredItems(products)
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
    }, [])

    const handleAddToCart = (product) => {
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

    useEffect(() => {
        const filtered = products.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCategory === "All" || item.category === selectedCategory),
        )
        setFilteredItems(filtered)
    }, [searchTerm, selectedCategory, products])

    const categories = ["All", ...new Set(products.map((item) => item.category))]

    return (
        <>
            <div className="flex flex-col items-center justify-between mb-8 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="relative w-full md:w-64">
                    <Input
                        type="text"
                        placeholder="Cari menu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems?.length > 0 ? (
                    filteredItems.map((item) => (
                        <Card key={item.id} className="flex flex-col justify-between">
                            <CardHeader>
                                <div className="relative w-full h-48 mb-4">
                                    <Image
                                        src={item.images || "/default-image.jpg"}
                                        alt={item.name || "Menu Item"}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-t-lg"
                                    />
                                </div>
                                <CardTitle>{item.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-primary">Rp {item.price.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">{item.category}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => handleAddToCart(item)}>
                                    <ShoppingCart className="w-4 h-4 mr-2" /> Tambah ke Keranjang
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p className="mt-8 text-center text-gray-500">
                        Tidak ada item menu yang ditemukan. Silakan coba pencarian atau kategori lain.
                    </p>
                )}
            </div>
        </>
    )
}

