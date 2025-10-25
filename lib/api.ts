import { Product, ProductsResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/store";

export async function getProducts(params?: {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();
  
  if (params?.category) searchParams.append("category", params.category);
  if (params?.search) searchParams.append("search", params.search);
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.offset) searchParams.append("offset", params.offset.toString());

  const url = `${API_BASE_URL}/products${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  
  const response = await fetch(url, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  return getProducts({ search: query });
}

// Order and Customer APIs
import { 
  Order, 
  OrdersResponse, 
  CreateOrderRequest, 
  CheckoutRequest, 
  CheckoutResponse,
  CustomerUser 
} from "@/types";

// Helper function to get auth headers
function getAuthHeaders(token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

// Customer Profile API
export async function getCustomerProfile(token: string): Promise<CustomerUser> {
  const response = await fetch(`${API_BASE_URL}/customers/profile`, {
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customer profile");
  }

  const result = await response.json();
  return result.customer;
}

// Order APIs
export async function createOrder(
  orderData: CreateOrderRequest,
  token: string
): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create order");
  }

  const result = await response.json();
  return result.order;
}

export async function getOrders(
  token: string,
  params?: {
    limit?: number;
    offset?: number;
    status?: string;
  }
): Promise<OrdersResponse> {
  const searchParams = new URLSearchParams();
  
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.offset) searchParams.append("offset", params.offset.toString());
  if (params?.status) searchParams.append("status", params.status);

  const url = `${API_BASE_URL}/orders${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  
  const response = await fetch(url, {
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}

export async function getOrder(orderId: string, token: string): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }

  const result = await response.json();
  return result.order;
}

export async function cancelOrder(
  orderId: string,
  reason: string,
  token: string
): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify({
      action: "cancel",
      cancelReason: reason,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to cancel order");
  }

  const result = await response.json();
  return result.order;
}

// Checkout APIs
export async function initializeCheckout(
  checkoutData: CheckoutRequest,
  token: string
): Promise<CheckoutResponse> {
  const response = await fetch(`${API_BASE_URL}/checkout`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(checkoutData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to initialize checkout");
  }

  return response.json();
}

export async function completePayment(
  checkoutId: string,
  paymentData: {
    paymentReference: string;
    paymentGateway: string;
    sessionId: string;
  },
  token: string
): Promise<{ order: Order; checkout: any }> {
  const response = await fetch(`${API_BASE_URL}/checkout/${checkoutId}/complete`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to complete payment");
  }

  return response.json();
}

