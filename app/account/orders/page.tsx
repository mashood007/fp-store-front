"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getOrders, cancelOrder } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, Eye, X, Calendar, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import { Order, OrderStatus } from "@/types";
import Price from "@/components/Price";

const statusConfig = {
  PENDING: { icon: Clock, color: "text-yellow-400", bg: "bg-black/60", label: "Pending" },
  CONFIRMED: { icon: CheckCircle, color: "text-blue-400", bg: "bg-black/60", label: "Confirmed" },
  PROCESSING: { icon: Package, color: "text-purple-400", bg: "bg-black/60", label: "Processing" },
  SHIPPED: { icon: Truck, color: "text-green-400", bg: "bg-black/60", label: "Shipped" },
  DELIVERED: { icon: CheckCircle, color: "text-green-500", bg: "bg-black/60", label: "Delivered" },
  CANCELLED: { icon: XCircle, color: "text-red-400", bg: "bg-black/60", label: "Cancelled" },
  REFUNDED: { icon: XCircle, color: "text-gray-400", bg: "bg-black/60", label: "Refunded" },
};

export default function OrdersPage() {
  const { isAuthenticated, isLoading, token } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/account/orders");
    }
  }, [isAuthenticated, isLoading, router]);

  // Load orders
  useEffect(() => {
    const loadOrders = async () => {
      if (!token) return;
      
      try {
        setIsLoadingOrders(true);
        const response = await getOrders(token);
        setOrders(response.orders);
      } catch (error) {
        console.error("Error loading orders:", error);
        setError("Failed to load orders");
      } finally {
        setIsLoadingOrders(false);
      }
    };

    if (isAuthenticated && token) {
      loadOrders();
    }
  }, [isAuthenticated, token]);

  const handleCancelOrder = async (orderId: string) => {
    if (!token) return;

    const reason = prompt("Please provide a reason for cancellation (optional):");
    if (reason === null) return; // User cancelled the prompt

    setCancellingOrderId(orderId);
    try {
      const updatedOrder = await cancelOrder(orderId, reason || "Cancelled by customer", token);
      setOrders(orders.map(order => order.id === orderId ? updatedOrder : order));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updatedOrder);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setCancellingOrderId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const canCancelOrder = (order: Order) => {
    return ["PENDING", "CONFIRMED"].includes(order.status);
  };

  if (isLoading || isLoadingOrders) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--gold)]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-full bg-[var(--gold)]/10 p-4">
              <Package className="h-8 w-8 text-[var(--gold)]" />
            </div>
            <div>
              <h1 className="font-luxury text-4xl font-bold text-white">
                Order History
              </h1>
              <p className="text-white/70">
                Track and manage your orders
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400">
              {error}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full glass p-8">
                  <Package className="h-16 w-16 text-[var(--gold)]/50" />
                </div>
              </div>
              <h2 className="mb-4 font-luxury text-2xl font-bold text-white">
                No Orders Yet
              </h2>
              <p className="mb-8 text-white/70">
                You haven&apos;t placed any orders yet. Start shopping to see your orders here.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full luxury-button px-8 py-4 font-medium text-black transition-all"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <div key={order.id} className="rounded-lg glass p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className={`rounded-full p-2 ${statusConfig[order.status].bg}`}>
                          <StatusIcon className={`h-5 w-5 ${statusConfig[order.status].color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            Order #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-white/60 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[order.status].label}
                          </div>
                          <div className="mt-1">
                            <Price 
                              amount={order.totalAmount}
                              className="text-lg font-semibold text-[var(--gold)]"
                              symbolClassName="text-[var(--gold)]"
                              symbolSize={18}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="flex items-center gap-2 rounded-lg border border-[var(--gold)]/30 px-4 py-2 text-sm font-medium text-[var(--gold)] transition-all hover:bg-black/50"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </button>
                          {canCancelOrder(order) && (
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              disabled={cancellingOrderId === order.id}
                              className="flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/5 disabled:opacity-50"
                            >
                              {cancellingOrderId === order.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order items preview */}
                    <div className="space-y-3">
                      {order.orderProducts.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-black/50">
                            {item.product.images[0] && (
                              <Image
                                src={`http://localhost:3000${item.product.images[0].url}`}
                                alt={item.productName}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">
                              {item.productName}
                            </p>
                            <p className="text-xs text-white/60">
                              Qty: {item.quantity} × <Price amount={item.unitPrice} className="text-white/60" symbolSize={12} />
                            </p>
                          </div>
                          <Price 
                            amount={item.subtotal}
                            className="text-sm font-medium text-white"
                            symbolSize={14}
                          />
                        </div>
                      ))}
                      {order.orderProducts.length > 2 && (
                        <p className="text-sm text-white/60 italic">
                          +{order.orderProducts.length - 2} more items
                        </p>
                      )}
                    </div>

                    {order.trackingNumber && (
                      <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                        <p className="text-sm text-green-400">
                          <Truck className="inline h-4 w-4 mr-2" />
                          Tracking Number: <span className="font-mono">{order.trackingNumber}</span>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Order Detail Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg glass p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-luxury text-2xl font-bold text-white">
                    Order Details
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-lg border border-[var(--gold)]/20 p-4">
                      <h3 className="font-semibold text-white mb-3">Order Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-white/60">Order Number</p>
                          <p className="text-white font-mono">{selectedOrder.orderNumber}</p>
                        </div>
                        <div>
                          <p className="text-white/60">Status</p>
                          <div className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${statusConfig[selectedOrder.status].bg} ${statusConfig[selectedOrder.status].color}`}>
                            {React.createElement(statusConfig[selectedOrder.status].icon, {
                              className: "h-3 w-3"
                            })}
                            {statusConfig[selectedOrder.status].label}
                          </div>
                        </div>
                        <div>
                          <p className="text-white/60">Order Date</p>
                          <p className="text-white">{formatDate(selectedOrder.createdAt)}</p>
                        </div>
                        {selectedOrder.trackingNumber && (
                          <div>
                            <p className="text-white/60">Tracking</p>
                            <p className="text-white font-mono">{selectedOrder.trackingNumber}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="rounded-lg border border-[var(--gold)]/20 p-4">
                      <h3 className="font-semibold text-white mb-3">Shipping Address</h3>
                      <div className="text-sm text-white/80">
                        <p className="font-medium">{selectedOrder.shippingName}</p>
                        <p>{selectedOrder.shippingAddress1}</p>
                        {selectedOrder.shippingAddress2 && <p>{selectedOrder.shippingAddress2}</p>}
                        <p>{selectedOrder.shippingCity}, {selectedOrder.shippingState} {selectedOrder.shippingZip}</p>
                        <p>{selectedOrder.shippingCountry}</p>
                        {selectedOrder.shippingPhone && <p>Phone: {selectedOrder.shippingPhone}</p>}
                      </div>
                    </div>

                    <div className="rounded-lg border border-[var(--gold)]/20 p-4">
                      <h3 className="font-semibold text-white mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {selectedOrder.orderProducts.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-black/50">
                            <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-white/10">
                              {item.product.images[0] && (
                                <Image
                                  src={`http://localhost:3000${item.product.images[0].url}`}
                                  alt={item.productName}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-white">{item.productName}</h4>
                              {item.productDescription && (
                                <p className="text-sm text-white/60 mt-1">{item.productDescription}</p>
                              )}
                              <p className="text-sm text-white/60 mt-1">
                                <Price amount={item.unitPrice} className="text-white/60" symbolSize={12} /> × {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <Price 
                                amount={item.subtotal}
                                className="font-semibold text-white"
                                symbolSize={16}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-6">
                    <div className="rounded-lg border border-[var(--gold)]/20 p-4">
                      <h3 className="font-semibold text-white mb-4">Order Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-white/70">
                          <span>Subtotal</span>
                          <Price amount={selectedOrder.subtotal} className="text-white/70" symbolSize={14} />
                        </div>
                        <div className="flex justify-between text-white/70">
                          <span>Shipping</span>
                          <Price amount={selectedOrder.shippingCost} className="text-white/70" symbolSize={14} />
                        </div>
                        <div className="flex justify-between text-white/70">
                          <span>Tax</span>
                          <Price amount={selectedOrder.taxAmount} className="text-white/70" symbolSize={14} />
                        </div>
                        {selectedOrder.discountAmount > 0 && (
                          <div className="flex justify-between text-green-400">
                            <span>Discount</span>
                            <span>-<Price amount={selectedOrder.discountAmount} className="text-green-400" symbolSize={14} /></span>
                          </div>
                        )}
                        <div className="border-t border-[var(--gold)]/20 pt-3">
                          <div className="flex justify-between text-lg font-semibold">
                            <span className="text-white">Total</span>
                            <Price 
                              amount={selectedOrder.totalAmount}
                              className="text-[var(--gold)]"
                              symbolClassName="text-[var(--gold)]"
                              symbolSize={18}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {canCancelOrder(selectedOrder) && (
                      <button
                        onClick={() => handleCancelOrder(selectedOrder.id)}
                        disabled={cancellingOrderId === selectedOrder.id}
                        className="w-full flex items-center justify-center gap-2 rounded-lg border border-red-500/30 px-4 py-3 font-medium text-red-400 transition-all hover:bg-red-500/5 disabled:opacity-50"
                      >
                        {cancellingOrderId === selectedOrder.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4" />
                            Cancel Order
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
