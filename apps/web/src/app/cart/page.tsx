'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/zustand/cart/cartStore'
import { useGetCartDetail } from '@/helpers/cart/hooks/useGetCartItem';
import { useGetCartItemQuery } from '@/helpers/cart/api/useGetCartItemQuery';

const CartPage: React.FC = () => {
  const { cart, cartCount, totalPrice, fetchCart, updateCartItem, deleteCartItem } = useCartStore();
  const router = useRouter()

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  console.log(fetchCart)
  const handleUpdate = (productId: number, quantity: number) => {
    if (quantity > 0) {
      updateCartItem(productId, quantity);
    } else {
      deleteCartItem(productId);
    }
  };

  const handleCheckout = () => {
    router.push('/checkout/[checkoutDetail]')
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <p className="mb-4">Total items: {cartCount}</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cart) && cart.map((item) => (
              <tr key={item.productId} className="text-center">
                <td className="py-2 px-4 border-b">{item.product.name}</td>
                <td className="py-2 px-4 border-b">${item.product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleUpdate(item.productId, item.quantity + 1)}
                      className="bg-blue-500 text-white py-1 px-2 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleUpdate(item.productId, item.quantity - 1)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded"
                    >
                      -
                    </button>
                    <button
                      onClick={() => deleteCartItem(item.productId)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Total Price: Rp   {totalPrice.toFixed(2)}</h2>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
