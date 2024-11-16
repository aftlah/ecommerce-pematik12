'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CalendarIcon, Utensils, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
// import { Calendar } from '@/components/ui/calendar'
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

export default function MenuItemDetail({ params }) {
    const router = useRouter()
    const [quantity, setQuantity] = useState(10) 
    const [deliveryDate, setDeliveryDate] = useState ()

    // Dummy menu item data (replace with actual data fetching in a real application)
    const menuItem = {
        id: params.id,
        name: 'Grilled Chicken with Roasted Vegetables',
        price: 15.99,
        description: 'Tender grilled chicken breast served with a medley of roasted seasonal vegetables. Perfect for health-conscious events.',
        minOrder: 10,
        images: ['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400']
    }

    const handleQuantityChange = (change) => {
        setQuantity(Math.max(menuItem.minOrder, quantity + change))
    }

    const handleAddToCart = () => {
        if (!deliveryDate) {
            alert('Please select a delivery date')
            return
        }
        // Implement add to cart logic here
        console.log(`Added ${quantity} portions of ${menuItem.name} for delivery on ${format(deliveryDate, 'MMMM d, yyyy')} to cart`)
        // Navigate to cart page or show confirmation
        router.push('/cart')
    }

    return (
        <div className="container px-4 py-8 mx-auto">
            <Card>
                <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="relative aspect-square">
                                <Image
                                    src={menuItem.images[0]}
                                    alt={menuItem.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {menuItem.images.map((img, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <Image
                                            src={img}
                                            alt={`${menuItem.name} - Image ${index + 1}`}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold">{menuItem.name}</h1>
                                <p className="mt-2 text-xl font-semibold">${menuItem.price.toFixed(2)} per portion</p>
                            </div>
                            <p className="text-gray-600">{menuItem.description}</p>
                            <div>
                                <Label htmlFor="quantity">Number of Portions</Label>
                                <div className="flex items-center mt-2">
                                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>
                                        -
                                    </Button>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min={menuItem.minOrder}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(menuItem.minOrder, parseInt(e.target.value) || menuItem.minOrder))}
                                        className="w-20 mx-2 text-center"
                                    />
                                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                                        +
                                    </Button>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Minimum order: {menuItem.minOrder} portions</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="deliveryDate">Delivery Date</Label>
                                {/* <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !deliveryDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="w-4 h-4 mr-2" />
                                            {deliveryDate ? format(deliveryDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={deliveryDate}
                                            onSelect={setDeliveryDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover> */}
                            </div>
                            <Separator />
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold">Total Price:</span>
                                    <span className="text-2xl font-bold">${(menuItem.price * quantity).toFixed(2)}</span>
                                </div>
                                <Button onClick={handleAddToCart} className="w-full">
                                    <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}