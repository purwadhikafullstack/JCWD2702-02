export interface OrderItem {
  productId: number;
  qty: number;
}

export interface Order {
  userId: string;
  address: string;
  items: OrderItem[];
  paymentMethod: string;
}

export interface Warehouse {
  id: number;
  latitude: number;
  longitude: number;
  stock: Record<number, number>;
}

export interface createOrderServiceProps {
  uid: string;
  orderId: number;
  addressId: number;
  totalAmount: number;
  shippingCost: number;
  paymentUrl: string;
}
