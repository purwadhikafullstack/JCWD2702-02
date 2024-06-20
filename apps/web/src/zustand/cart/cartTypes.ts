export interface CartItem {
    productId: number;
    product: {
        name: string;
        price: number;
    };
    quantity: number;
}

export interface CartState {
    cart: CartItem[];
    cartCount: number;
    totalPrice: number;
    fetchCart: () => Promise<void>;
    addToCart: (productId: number, quantity: number) => Promise<void>;
    updateCartItem: (productId: number, quantity: number) => Promise<void>;
    deleteCartItem: (productId: number) => Promise<void>;
}