// 'use client'

import HomePage from "@/components/layout/HomePage";

// import { useState, useEffect } from 'react'
// import { ShoppingCart, Menu, X, ArrowRight, Clock, Utensils, Users } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Toaster } from "@/components/ui/toaster"
// import { useToast } from "@/hooks/use-toast"
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from '@/lib/firebase/init'
// import { getMenus } from '@/lib/firebase/service'
// import useCartStore from '@/stores/useCartStore'
// import { motion } from 'framer-motion'

// export default function HomePage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [cart, setCart] = useState([])
//   const [products, setProducts] = useState([])
//   const [email, setEmail] = useState('')
//   const [user, setUser] = useState(null)
//   const { toast } = useToast()
//   const router = useRouter()

//   const addToCartStore = useCartStore((state) => state.addToCart)

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser)
//     })

//     const fetchProducts = async () => {
//       try {
//         const products = await getMenus()
//         setProducts(products)
//       } catch (error) {
//         console.error('Error fetching products: ', error)
//         toast({
//           title: "Error",
//           description: "Failed to fetch products. Please check your Firestore rules.",
//           variant: "destructive",
//         })
//       }
//     }

//     fetchProducts()

//     return () => unsubscribe()
//   }, [toast])

//   const addToCart = (product) => {
//     if (user) {
//       addToCartStore(product)
//       toast({
//         title: "Produk ditambahkan",
//         description: `${product.name} telah ditambahkan ke keranjang.`,
//       })
//     } else {
//       toast({
//         title: "Login diperlukan",
//         description: "Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.",
//         variant: "destructive",
//       })
//       router.push('/auth/login')
//     }
//   }

//   const handleSubscribe = (e) => {
//     e.preventDefault()
//     toast({
//       title: "Berlangganan berhasil",
//       description: `Anda telah berlangganan dengan email: ${email}`,
//     })
//     setEmail('')
//   }

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id)
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' })
//     }
//     setIsMenuOpen(false)
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         duration: 0.5,
//         when: "beforeChildren",
//         staggerChildren: 0.2
//       }
//     }
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { duration: 0.5 }
//     }
//   }

//   return (
//     <motion.div 
//       className="flex flex-col min-h-screen"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <Toaster />
//       <motion.section id="beranda" className="py-16 xl:px-[50px] bg-gradient-to-r from-gray-800 to-gray-900 text-white" variants={itemVariants}>
//         <div className="container px-4 mx-auto">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="mb-4 text-4xl font-bold uppercase">Makanan Berkualitas untuk Setiap Acara Anda</h1>
//             <p className="mb-8 text-xl">Nikmati hidangan lezat dan pelayanan prima untuk berbagai acara, dari pesta ulang tahun hingga pernikahan.</p>
//             <Button size="lg" className="text-gray-900 bg-gray-100 hover:bg-gray-200" onClick={() => scrollToSection('menu')}>
//               Pesan Sekarang <ArrowRight className="w-5 h-5 ml-2" />
//             </Button>
//           </div>
//         </div>
//       </motion.section>

//       <motion.section id="tentang-kami" className="py-16 bg-gray-50 xl:px-[50px]" variants={itemVariants}>
//         <div className="container px-4 mx-auto">
//           <h2 className="mb-12 text-3xl font-bold text-center uppercase">Mengapa Memilih Kami?</h2>
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             <motion.div className="flex flex-col items-center text-center" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
//               <div className="p-4 mb-4 text-gray-100 bg-gray-700 rounded-full">
//                 <Utensils className="w-8 h-8" />
//               </div>
//               <h3 className="mb-2 text-xl font-semibold uppercase">Menu Beragam</h3>
//               <p className='max-w-sm'>Pilihan menu yang luas untuk memenuhi selera semua tamu Anda.</p>
//             </motion.div>
//             <motion.div className="flex flex-col items-center text-center" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
//               <div className="p-4 mb-4 text-gray-100 bg-gray-700 rounded-full">
//                 <Clock className="w-8 h-8" />
//               </div>
//               <h3 className="mb-2 text-xl font-semibold uppercase">Tepat Waktu</h3>
//               <p className='max-w-sm'>Kami menjamin ketepatan waktu pengiriman untuk kenyamanan acara Anda.</p>
//             </motion.div>
//             <motion.div className="flex flex-col items-center text-center" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
//               <div className="p-4 mb-4 text-gray-100 bg-gray-700 rounded-full">
//                 <Users className="w-8 h-8" />
//               </div>
//               <h3 className="mb-2 text-xl font-semibold uppercase">Pelayanan Prima</h3>
//               <p className='max-w-sm'>Tim kami siap memberikan pelayanan terbaik untuk kepuasan Anda.</p>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       <motion.main id="menu" className="container flex-grow px-4 py-8 mx-auto xl:px-[50px]" variants={itemVariants}>
//         <h2 className="mb-6 text-3xl font-bold text-center">Menu Favorit Kami</h2>
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {products.slice(0, 4).map((product, index) => (
//             <motion.div key={product.name} variants={itemVariants} custom={index}>
//               <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
//                 <CardHeader className="relative h-48">
//                   <Image
//                     src={product.images}
//                     alt={product.name}
//                     className="object-cover w-full h-full rounded-t-lg"
//                     width={1000}
//                     height={1000}
//                   />
//                 </CardHeader>
//                 <CardContent className="flex-grow">
//                   <CardTitle className="-mt-4 text-xl">{product.name}</CardTitle>
//                   <CardDescription className="mt-2">
//                     {product.description?.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
//                   </CardDescription>
//                   <p className="mt-2 text-lg font-semibold">
//                     {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
//                   </p>
//                 </CardContent>
//                 <CardFooter className="mt-auto">
//                   <Button className="w-full" onClick={() => addToCart(product)}>
//                     Tambah ke Keranjang
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//         <div className="mt-12 text-center">
//           <Button size="lg" variant="outline" className="text-gray-800 border-gray-700 hover:bg-gray-100" onClick={() => router.push('/menu/list')}>
//             Lihat Semua Menu <ArrowRight className="w-5 h-5 ml-2" />
//           </Button>
//         </div>
//       </motion.main>

//       <motion.footer id="kontak" className="mt-12 bg-gray-800 text-gray-100 xl:px-[50px]" variants={itemVariants}>
//         <div className="container px-4 py-8 mx-auto">
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             <div>
//               <h3 className="mb-4 text-lg font-semibold">Tentang Kami</h3>
//               <p>WaroengKuh menyediakan berbagai pilihan menu lezat untuk berbagai acara Anda.</p>
//             </div>
//             <div>
//               <h3 className="mb-4 text-lg font-semibold">Hubungi Kami</h3>
//               <p>Email: info@waroengkuh.com</p>
//               <p>Telepon: (021) 1234-5678</p>
//             </div>
//             <div>
//               <h3 className="mb-4 text-lg font-semibold">Berlangganan</h3>
//               <p className="mb-2">Dapatkan info terbaru dan penawaran spesial</p>
//               <form className="flex" onSubmit={handleSubscribe}>
//                 <Input
//                   type="email"
//                   placeholder="Alamat email Anda"
//                   className="mr-2 "
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <Button type="submit" className="text-gray-900 bg-gray-100 hover:bg-gray-200">Langganan</Button>
//               </form>
//             </div>
//           </div>
//           <div className="mt-8 text-center">
//             <p>&copy; 2024 WaroengKuh. Hak Cipta Dilindungi.</p>
//           </div>
//         </div>
//       </motion.footer>
//     </motion.div>
//   )
// }


export default function Home() {
  return <HomePage />
}

