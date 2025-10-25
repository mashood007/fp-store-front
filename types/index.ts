export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  order: number;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  friendlyId: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  isActive: boolean;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Customer and Authentication Types
export interface CustomerUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  shippingAddress1?: string;
  shippingAddress2?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZip?: string;
  shippingCountry?: string;
  billingAddress1?: string;
  billingAddress2?: string;
  billingCity?: string;
  billingState?: string;
  billingZip?: string;
  billingCountry?: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  customer: CustomerUser;
  token?: string;
  error?: string;
}

export interface Address {
  name: string;
  email?: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// Order Types
export type OrderStatus = 
  | "PENDING" 
  | "CONFIRMED" 
  | "PROCESSING" 
  | "SHIPPED" 
  | "DELIVERED" 
  | "CANCELLED" 
  | "REFUNDED";

export type PaymentStatus = 
  | "PENDING" 
  | "PROCESSING" 
  | "COMPLETED" 
  | "FAILED" 
  | "CANCELLED" 
  | "REFUNDED";

export interface OrderProduct {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  productName: string;
  productDescription?: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  shippingName: string;
  shippingEmail: string;
  shippingPhone?: string;
  shippingAddress1: string;
  shippingAddress2?: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  notes?: string;
  trackingNumber?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  orderProducts: OrderProduct[];
  checkout?: Checkout;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  orders: Order[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: Address;
  notes?: string;
}

// Checkout Types
export interface Checkout {
  id: string;
  orderId: string;
  customerId: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentReference?: string;
  paymentGateway?: string;
  billingName: string;
  billingEmail: string;
  billingAddress1: string;
  billingAddress2?: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  sessionId?: string;
  completedAt?: string;
  failedAt?: string;
  failureReason?: string;
  order?: Order;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutRequest {
  orderId: string;
  paymentMethod: string;
  billingAddress: Address;
}

export interface CheckoutResponse {
  message: string;
  checkout: Checkout;
  paymentUrl?: string;
}

