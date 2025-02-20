"use client"

import { Utensils, Clock, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutSection() {
    return (
        <motion.section
            id="tentang-kami"
            className="py-16 bg-gray-50 xl:px-[50px]"
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
                <h2 className="mb-12 text-3xl font-bold text-center uppercase">Mengapa Memilih Kami?</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <Feature
                        icon={<Utensils className="w-8 h-8" />}
                        title="Menu Beragam"
                        description="Pilihan menu yang luas untuk memenuhi selera semua tamu Anda."
                    />
                    <Feature
                        icon={<Clock className="w-8 h-8" />}
                        title="Tepat Waktu"
                        description="Kami menjamin ketepatan waktu pengiriman untuk kenyamanan acara Anda."
                    />
                    <Feature
                        icon={<Users className="w-8 h-8" />}
                        title="Pelayanan Prima"
                        description="Tim kami siap memberikan pelayanan terbaik untuk kepuasan Anda."
                    />
                </div>
            </div>
        </motion.section>
    )
}

function Feature({ icon, title, description }) {
    return (
        <motion.div
            className="flex flex-col items-center text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="p-4 mb-4 text-gray-100 bg-gray-700 rounded-full">{icon}</div>
            <h3 className="mb-2 text-xl font-semibold uppercase">{title}</h3>
            <p className="max-w-sm">{description}</p>
        </motion.div>
    )
}

