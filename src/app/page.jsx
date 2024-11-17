'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, ArrowRight, Clock, Utensils, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/init'
import { useAuth } from '@/hooks/useAuth'

const products = [
  { id: 1, name: 'Paket Nasi Kotak', price: 25000, image: '/images/ayam-bakar.jpg' },
  { id: 2, name: 'Paket Ikan Bakar', price: 50000, image: '/images/ayam-bakar.jpg' },
  { id: 3, name: 'Paket Snack Box', price: 15000, image: '/images/ayam-bakar.jpg' },
  { id: 4, name: 'Paket Ayam Bakar', price: 100000, image: '/images/ayam-bakar.jpg' },
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const { toast } = useToast()
  const router = useRouter()
  // const { user, loading } = useAuth()


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  // console.log(user);


  const addToCart = (product) => {
    if (user) {
      setCart([...cart, product])
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
      router.push('/auth/login')
    }
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    toast({
      title: "Berlangganan berhasil",
      description: `Anda telah berlangganan dengan email: ${email}`,
    })
    setEmail('')
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <section id="beranda" className="py-16 xl:px-[50px]">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 text-4xl font-bold uppercase">Katering Berkualitas untuk Setiap Acara Anda</h1>
            <p className="mb-8 text-xl">Nikmati hidangan lezat dan pelayanan prima untuk berbagai acara, dari pesta ulang tahun hingga pernikahan.</p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" onClick={() => scrollToSection('menu')}>
              Pesan Sekarang <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="tentang-kami" className="py-16 bg-gray-50 xl:px-[50px]">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center uppercase">Mengapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 mb-4 bg-red-500 rounded-full text-primary-foreground">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold uppercase">Menu Beragam</h3>
              <p className='max-w-sm'>Pilihan menu yang luas untuk memenuhi selera semua tamu Anda.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 mb-4 bg-red-500 rounded-full text-primary-foreground">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold uppercase">Tepat Waktu</h3>
              <p className='max-w-sm'>Kami menjamin ketepatan waktu pengiriman untuk kenyamanan acara Anda.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 mb-4 bg-red-500 rounded-full text-primary-foreground">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold uppercase">Pelayanan Prima</h3>
              <p className='max-w-sm'>Tim kami siap memberikan pelayanan terbaik untuk kepuasan Anda.</p>
            </div>
          </div>
        </div>
      </section>

      <main id="menu" className="container flex-grow px-4 py-8 mx-auto xl:px-[50px]">
        <h2 className="mb-6 text-3xl font-bold text-center">Menu Favorit Kami</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader className="relative h-48">
                <Image src={product.image} alt={product.name} className="object-cover w-full h-full rounded-t-lg" width={1000} height={1000} />
              </CardHeader>
              <CardContent>
                <CardTitle>{product.name}</CardTitle>
                <p className="mt-2 text-lg font-semibold">Rp {product.price.toLocaleString()}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => addToCart(product)}>Tambah ke Keranjang</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" onClick={() => toast({ title: "Lihat Semua Menu", description: "Fitur ini akan segera hadir!" })}>
            Lihat Semua Menu <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </main>

      <footer id="kontak" className="mt-12 bg-gray-100 xl:px-[50px]">
        <div className="container px-4 py-8 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Tentang Kami</h3>
              <p>WaroengKuh menyediakan berbagai pilihan menu lezat untuk berbagai acara Anda.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Hubungi Kami</h3>
              <p>Email: info@waroengkuh.com</p>
              <p>Telepon: (021) 1234-5678</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Berlangganan</h3>
              <p className="mb-2">Dapatkan info terbaru dan penawaran spesial</p>
              <form className="flex" onSubmit={handleSubscribe}>
                <Input
                  type="email"
                  placeholder="Alamat email Anda"
                  className="mr-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit">Langganan</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 WaroengKuh. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}