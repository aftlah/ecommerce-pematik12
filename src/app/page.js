'use client'

import { useState } from 'react'
import { Search, ShoppingCart, User, Menu, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'

const products = [
  { id: 1, name: "Smartphone XYZ", price: 2999000, image: "/placeholder.svg?height=200&width=200", rating: 4.5, sold: 1000 },
  { id: 2, name: "Laptop ABC", price: 8999000, image: "/placeholder.svg?height=200&width=200", rating: 4.7, sold: 500 },
  { id: 3, name: "Headphone 123", price: 599000, image: "/placeholder.svg?height=200&width=200", rating: 4.3, sold: 2000 },
  { id: 4, name: "Smart Watch", price: 1299000, image: "/placeholder.svg?height=200&width=200", rating: 4.6, sold: 750 },
  { id: 5, name: "Kamera DSLR", price: 5999000, image: "/placeholder.svg?height=200&width=200", rating: 4.8, sold: 300 },
  { id: 6, name: "Speaker Bluetooth", price: 399000, image: "/placeholder.svg?height=200&width=200", rating: 4.2, sold: 1500 },
]

const categories = [
  "Elektronik", "Fashion", "Kesehatan & Kecantikan", "Rumah & Dapur", "Olahraga", "Otomotif"
]

export default function TokopediaLikePage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="p-4 text-white bg-green-500">
        <div className="container flex flex-col items-center justify-between mx-auto space-y-4 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:w-auto">
            <h1 className="text-2xl font-bold">TokopediaLike</h1>
            <div className="relative w-full md:w-96">
              <Input
                type="text"
                placeholder="Cari di TokopediaLike"
                className="w-full pl-10 text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">
              <ShoppingCart className="mr-2" />
              <span className="hidden sm:inline">Keranjang</span>
            </Button>
            <Button variant="ghost">
              <User className="mr-2" />
              <span className="hidden sm:inline">Akun Saya</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Kategori */}
      <nav className="overflow-x-auto bg-white shadow">
        <div className="container py-2 mx-auto">
          <ul className="flex space-x-6 whitespace-nowrap">
            {categories.map((category, index) => (
              <li key={index}>
                <Button variant="ghost" className="text-sm">
                  {category}
                </Button>
              </li>
            ))}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm">
                    Kategori Lainnya <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Buku</DropdownMenuItem>
                  <DropdownMenuItem>Mainan & Hobi</DropdownMenuItem>
                  <DropdownMenuItem>Pertukangan</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </nav>

      {/* Konten Utama */}
      <main className="container py-8 mx-auto">
        <h2 className="mb-6 text-2xl font-bold">Produk Pilihan</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <Image src={product.image} alt={product.name} width={100} height={100} className="object-cover w-full h-32 sm:h-40" />
              <CardContent className="p-3 sm:p-4">
                <h3 className="mb-1 text-xs font-semibold truncate sm:text-sm sm:mb-2">{product.name}</h3>
                <p className="mb-1 text-sm font-bold sm:text-lg sm:mb-2">Rp {product.price.toLocaleString('id-ID')}</p>
                <div className="flex items-center text-xs text-gray-500 sm:text-sm">
                  <span className="mr-2">⭐ {product.rating}</span>
                  <span>| {product.sold} terjual</span>
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-0 sm:p-4">
                <Button className="w-full text-xs sm:text-sm">Beli Sekarang</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-white bg-gray-800">
        <div className="container grid grid-cols-2 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Layanan Pelanggan</h3>
            <ul className="space-y-2">
              <li>Bantuan</li>
              <li>Metode Pembayaran</li>
              <li>Lacak Pesanan</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Jual</h3>
            <ul className="space-y-2">
              <li>Pusat Edukasi Seller</li>
              <li>Mitra Toppers</li>
              <li>Daftar Official Store</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Tentang TokopediaLike</h3>
            <ul className="space-y-2">
              <li>Tentang Kami</li>
              <li>Karir</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Ikuti Kami</h3>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}