import { create } from 'zustand';

const useCartStore = create((set) => {
    const savedCartItems = JSON.parse(sessionStorage?.getItem('cartItems')) || [];

    const setCartItems = (cartItems) => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
        // sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        set({ cartItems });
    };

    return {
        cartItems: savedCartItems,

        addToCart: (product) =>
            set((state) => {
                const existingItem = state.cartItems.find((item) => item.id === product.id);
                let newCartItems;
                if (existingItem) {
                    newCartItems = state.cartItems.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    newCartItems = [...state.cartItems, { ...product, quantity: 1 }];
                }
                setCartItems(newCartItems);
                return { cartItems: newCartItems };
            }),

        updateQuantity: (id, quantity) =>
            set((state) => {
                const newCartItems = state.cartItems.map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                );
                setCartItems(newCartItems);
                return { cartItems: newCartItems };
            }),

        removeFromCart: (id) =>
            set((state) => {
                const newCartItems = state.cartItems.filter((item) => item.id !== id);
                setCartItems(newCartItems);
                return { cartItems: newCartItems };
            }),

        clearCart: () =>
            set(() => {
                if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('cartItems');
                }
                // sessionStorage.removeItem('cartItems');
                return { cartItems: [] };
            }),

    };
});

export default useCartStore;
