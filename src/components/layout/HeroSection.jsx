"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HeroSection() {
    const scrollToSection = () => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <motion.section
            id="beranda"
            className="py-16 xl:px-[50px] bg-gradient-to-r from-gray-800 to-gray-900 text-white"
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5 },
                },
            }}
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="mb-4 text-4xl font-bold uppercase">Makanan Berkualitas untuk Setiap Acara Anda</h1>
                    <p className="mb-8 text-xl">
                        Nikmati hidangan lezat dan pelayanan prima untuk berbagai acara, dari pesta ulang tahun hingga pernikahan.
                    </p>
                    <Button
                        size="lg"
                        className="text-gray-900 bg-gray-100 hover:bg-gray-200"
                        onClick={() => scrollToSection("menu")}
                    >
                        Pesan Sekarang <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        </motion.section>
    )
}

