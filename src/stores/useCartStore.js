import { create } from 'zustand';

const useCartStore = create((set) => ({
    cartItems: [],

    // Tambahkan produk ke keranjang
    addToCart: (product) =>
        set((state) => {
            const existingItem = state.cartItems.find((item) => item.id === product.id);
            if (existingItem) {
                // Jika produk sudah ada, tambahkan jumlahnya
                return {
                    cartItems: state.cartItems.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                // Tambahkan produk baru
                return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
            }
        }),

    // Ubah jumlah produk
    updateQuantity: (id, quantity) =>
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            ),
        })),

    // Hapus produk dari keranjang
    removeFromCart: (id) =>
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
}));

export default useCartStore;
