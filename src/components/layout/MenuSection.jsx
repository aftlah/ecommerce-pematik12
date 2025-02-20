"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function MenuSection({ products, addToCart }) {
    const router = useRouter()

    return (
        <motion.main
            id="menu"
            className="container flex-grow px-4 py-8 mx-auto xl:px-[50px]"
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5 },
                },
            }}
        >
            <h2 className="mb-6 text-3xl font-bold text-center">Menu Favorit Kami</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product, index) => (
                    <motion.div
                        key={product.name}
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: {
                                y: 0,
                                opacity: 1,
                                transition: { duration: 0.5, delay: index * 0.1 },
                            },
                        }}
                    >
                        <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                            <CardHeader className="relative h-48">
                                <Image
                                    src={product.images || "/placeholder.svg"}
                                    alt={product.name}
                                    className="object-cover w-full h-full rounded-t-lg"
                                    width={1000}
                                    height={1000}
                                />
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardTitle className="-mt-4 text-xl">{product.name}</CardTitle>
                                <CardDescription className="mt-2">
                                    {product.description?.length > 100
                                        ? `${product.description.substring(0, 100)}...`
                                        : product.description}
                                </CardDescription>
                                <p className="mt-2 text-lg font-semibold">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                    }).format(product.price)}
                                </p>
                            </CardContent>
                            <CardFooter className="mt-auto">
                                <Button className="w-full" onClick={() => addToCart(product)}>
                                    Tambah ke Keranjang
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <div className="mt-12 text-center">
                <Button
                    size="lg"
                    variant="outline"
                    className="text-gray-800 border-gray-700 hover:bg-gray-100"
                    onClick={() => router.push("/menu/list")}
                >
                    Lihat Semua Menu <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
        </motion.main>
    )
}

