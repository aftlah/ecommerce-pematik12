'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Search, Truck } from 'lucide-react'
import Image from 'next/image'
import { cityDistances } from '@/lib/datas'
import useCartStore from '@/stores/useCartStore'
import useUserStore from '@/stores/useUserStore'
import { toast } from "@/hooks/use-toast"

export default function CheckoutPage() {
    const router = useRouter()
    const { cartItems, clearCart } = useCartStore()
    const [paymentMethod, setPaymentMethod] = useState('credit-card')
    const [selectedCity, setSelectedCity] = useState('')
    const [distance, setDistance] = useState(0)
    const [shippingCost, setShippingCost] = useState(0)
    const [total, setTotal] = useState(1000000)
    const [citySearch, setCitySearch] = useState('')
    const [filteredCities, setFilteredCities] = useState(Object.keys(cityDistances))
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { isLoggedIn } = useUserStore();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        bank: ''
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            router.push('/')
        }
    }, [cartItems, router, isLoggedIn])

    const calculateShippingCost = (distance) => {
        const baseCost = 10000
        const costPerKm = 250
        return baseCost + (distance * costPerKm)
    }

    useEffect(() => {
        const newDistance = cityDistances[selectedCity] || 0
        setDistance(newDistance)
        const newShippingCost = calculateShippingCost(newDistance)
        setShippingCost(newShippingCost)
        setTotal(1000000 + newShippingCost)
    }, [selectedCity])

    useEffect(() => {
        const filtered = Object.keys(cityDistances).filter(city =>
            city.toLowerCase().includes(citySearch.toLowerCase())
        )
        setFilteredCities(filtered)
        setIsDropdownOpen(filtered.length > 0 && citySearch.length > 0)
    }, [citySearch])

    const handleCitySelect = (city) => {
        setSelectedCity(city)
        setCitySearch(city)
        setIsDropdownOpen(false)
        setFormData(prev => ({ ...prev, city }))
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && filteredCities.length > 0) {
            handleCitySelect(filteredCities[0])
        }
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
        setErrors(prev => ({ ...prev, [id]: '' }))
    }

    const validateForm = () => {
        const newErrors = {}
        const requiredFields = ['firstName', 'lastName', 'address', 'city', 'postalCode']

        if (paymentMethod === 'credit-card') {
            requiredFields.push('cardNumber', 'expiryDate', 'cvv')
        } else {
            requiredFields.push('bank')
        }

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required'
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleCreateOrder = () => {
        if (validateForm()) {
            toast({
                title: "Pesanan berhasil dibuat",
                description: "Terima kasih atas pembelian Anda!",
            })
            clearCart()
            router.push('/')
        } else {
            toast({
                title: "Error",
                description: "Harap isi semua field yang diperlukan",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="container p-4 mx-auto md:p-6 lg:p-8">
            <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Pengiriman</CardTitle>
                        <CardDescription>Masukkan alamat pengiriman Anda</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Nama Depan</Label>
                                <Input
                                    id="firstName"
                                    placeholder="Altaf"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Nama Belakang</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Fattah"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Input
                                id="address"
                                placeholder="Jl. Contoh No. 123"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">Kota</Label>
                                <div className="relative">
                                    <Input
                                        id="citySearch"
                                        placeholder="Cari kota..."
                                        value={citySearch}
                                        onChange={(e) => {
                                            setCitySearch(e.target.value)
                                            handleInputChange(e)
                                        }}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <Search className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
                                    {isDropdownOpen && (
                                        <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                                            {filteredCities.map((city) => (
                                                <li
                                                    key={city}
                                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleCitySelect(city)}
                                                >
                                                    {city}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postalCode">Kode Pos</Label>
                                <Input
                                    id="postalCode"
                                    placeholder="12345"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                />
                                {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Metode Pembayaran</CardTitle>
                        <CardDescription>Pilih metode pembayaran Anda</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup defaultValue="credit-card" onValueChange={setPaymentMethod}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="credit-card" id="credit-card" />
                                <Label htmlFor="credit-card">Kartu Kredit</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                                <Label htmlFor="bank-transfer">Transfer Bank</Label>
                            </div>
                        </RadioGroup>

                        {paymentMethod === 'credit-card' && (
                            <div className="mt-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber">Nomor Kartu</Label>
                                    <Input
                                        id="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                    />
                                    {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiryDate">Tanggal Kadaluarsa</Label>
                                        <Input
                                            id="expiryDate"
                                            placeholder="MM/YY"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                        />
                                        {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input
                                            id="cvv"
                                            placeholder="123"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                        />
                                        {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'bank-transfer' && (
                            <div className="mt-4 space-y-2">
                                <Label htmlFor="bank">Pilih Bank</Label>
                                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, bank: value }))}>
                                    <SelectTrigger id="bank">
                                        <SelectValue placeholder="Pilih bank" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bca">
                                            <div className="flex items-center">
                                                <div className="relative w-[60px] h-[30px] mr-2">
                                                    <Image
                                                        src="/images/bca.svg"
                                                        alt="Logo BCA"
                                                        layout="fill"
                                                        objectFit="contain"
                                                    />
                                                </div>
                                                BCA
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="mandiri">
                                            <div className="flex items-center">
                                                <div className="relative w-[60px] h-[30px] mr-2">
                                                    <Image
                                                        src="/images/mandiri.svg"
                                                        alt="Logo Mandiri"
                                                        layout="fill"
                                                        objectFit="contain"
                                                    />
                                                </div>
                                                Mandiri
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="bri">
                                            <div className="flex items-center">
                                                <div className="relative w-[60px] h-[30px] mr-2">
                                                    <Image
                                                        src="/images/bri.svg"
                                                        alt="Logo BRI"
                                                        layout="fill"
                                                        objectFit="contain"
                                                    />
                                                </div>
                                                BRI
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.bank && <p className="text-sm text-red-500">{errors.bank}</p>}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Rp 1.000.000</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Ongkir</span>
                            <span>Rp {shippingCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>Rp {total.toLocaleString()}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleCreateOrder}>
                        <Truck className="w-4 h-4 mr-2" /> Buat Pesanan
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}