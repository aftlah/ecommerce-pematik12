"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function FooterSection() {
    const [email, setEmail] = useState("")
    const { toast } = useToast()

    const handleSubscribe = (e) => {
        e.preventDefault()
        toast({
            title: "Berlangganan berhasil",
            description: `Anda telah berlangganan dengan email: ${email}`,
        })
        setEmail("")
    }

    return (
        <motion.footer
            id="kontak"
            className="mt-12 bg-gray-800 text-gray-100 xl:px-[50px]"
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5 },
                },
            }}
        >
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
                            <Button type="submit" className="text-gray-900 bg-gray-100 hover:bg-gray-200">
                                Langganan
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; 2024 WaroengKuh. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </motion.footer>
    )
}

