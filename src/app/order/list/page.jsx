'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import useCartStore from '@/stores/useCartStore';
import { useAuth } from '@/hooks/useAuth';

export default function OrderListPage() {
    const router = useRouter();
    const { user, username, loading } = useAuth()
    const { cartItems, updateQuantity, removeFromCart } = useCartStore();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    

    const handleCheckout = () => {
        console.log('Melanjutkan ke checkout dengan item:', cartItems);
        router.push('/checkout');
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [loading, user, router]);

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-6 text-3xl font-bold">Keranjang Anda</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Keranjang Anda kosong.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-4 md:col-span-2">
                        {cartItems.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            src={item.images}
                                            alt={item.name}
                                            width={500}
                                            height={500}
                                            className="rounded-md size-24"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                Pengiriman pada {format(new Date(), 'd MMMM yyyy', { locale: id })}
                                            </p>
                                            <div className="flex items-center mt-2">
                                                <Label htmlFor={`quantity-${item.id}`} className="sr-only">
                                                    Jumlah
                                                </Label>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    aria-label="Kurangi jumlah"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </Button>
                                                <Input
                                                    id={`quantity-${item.id}`}
                                                    type="number"
                                                    min={1}
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateQuantity(item.id, parseInt(e.target.value, 10) || 1)
                                                    }
                                                    className="w-16 mx-2 text-center"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    aria-label="Tambah jumlah"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Hapus
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div>
                        <Card>
                            <CardContent className="p-4">
                                <h2 className="mb-4 text-xl font-semibold">Ringkasan Pesanan</h2>
                                <div className="space-y-2">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span>{item.name} (x{item.quantity})</span>
                                            <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                                        </div>
                                    ))}
                                </div>
                                <Separator className="my-4" />
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>Rp {total.toLocaleString('id-ID')}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4">
                                <Button onClick={handleCheckout} className="w-full">
                                    Lanjutkan ke Pembayaran
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
