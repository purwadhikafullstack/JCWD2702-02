import { create } from 'zustand';
import axios from 'axios';
import { CartState } from '@/zustand/cart/cartTypes'

const userId = "319c9550-267f-468d-b789-21faa2986607"
const useCartStore = create<CartState>((set) => ({
  cart: [],
  cartCount: 0,
  totalPrice: 0,

  fetchCart: async () => {
    try {
      const response = await axios.get(`http://localhost:8000/carts/count`, {
        headers: {
          Authorization: userId.toString(),
        },
      });
      const cartData = Array.isArray(response.data) ? response.data : []
      set({ cart: cartData });
      set((state) => ({
        cartCount: state.cart.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: state.cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0),
      }));
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  },

  addToCart: async (productId, qty) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/carts/`,
        { productId, qty },
        {
          headers: {
            Authorization: userId.toString(),
          },
        }
      );
      set((state) => {
        const updatedCart = [...state.cart];
        const itemIndex = updatedCart.findIndex((item) => item.productId === productId);
        if (itemIndex > -1) {
          updatedCart[itemIndex].quantity += qty;
        } else {
          updatedCart.push(response.data);
        }
        return {
          cart: updatedCart,
          cartCount: state.cartCount + qty,
          totalPrice: state.totalPrice + response.data.quantity * response.data.product.price,
        };
      });
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  },

  updateCartItem: async (productId, quantity) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/carts/`,
        { productId, quantity },
        {
          headers: {
            Authorization: userId.toString(),
          },
        }
      );
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        const cartCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedCart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
        return {
          cart: updatedCart,
          cartCount,
          totalPrice,
        };
      });
    } catch (error) {
      console.error('Error updating cart item', error);
    }
  },

  deleteCartItem: async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/carts/`, {
        headers: {
          Authorization: userId.toString(),
        },
        data: {
          productId,
        },
      });
      set((state) => {
        const updatedCart = state.cart.filter((item) => item.productId !== productId);
        const cartCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedCart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
        return {
          cart: updatedCart,
          cartCount,
          totalPrice,
        };
      });
    } catch (error) {
      console.error('Error deleting cart item', error);
    }
  },
}));

export default useCartStore;
