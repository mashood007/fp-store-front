"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { trackGuestOrder } from "@/lib/api";
import { Order } from "@/types";
import { ArrowLeft, Package, Search, Truck, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import Price from "@/components/Price";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [orderNumber, setOrderNumber] = useState(searchParams.get("orderNumber") || "");
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // If we have URL params, automatically track the order
  React.useEffect(() => {
    const emailParam = searchParams.get("email");
    const orderNumberParam = searchParams.get("orderNumber");

    if (emailParam && orderNumberParam && !order && !isLoading) {
      setEmail(emailParam);
      setOrderNumber(orderNumberParam);
      handleTrackOrder(emailParam, orderNumberParam);
    }
  }, [searchParams, order, isLoading]); // Include dependencies used in the effect

  const handleTrackOrder = async (emailValue: string, orderNumberValue: string) => {
    if (!emailValue.trim() || !orderNumberValue.trim()) {
      setError("Please enter both email and order number");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await trackGuestOrder(emailValue.trim(), orderNumberValue.trim());
      setOrder(result.order);

      // Update URL params
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("email", emailValue.trim());
      newUrl.searchParams.set("orderNumber", orderNumberValue.trim());
      window.history.replaceState({}, "", newUrl.toString());

    } catch (err) {
      console.error("Error tracking order:", err);
      setError(err instanceof Error ? err.message : "Failed to track order");
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrackOrder(email, orderNumber);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "CONFIRMED":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "PROCESSING":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "SHIPPED":
        return <Truck className="h-5 w-5 text-green-500" />;
      case "DELIVERED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "CANCELLED":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      case "CONFIRMED":
        return "text-blue-600 bg-blue-100";
      case "PROCESSING":
        return "text-blue-600 bg-blue-100";
      case "SHIPPED":
        return "text-green-600 bg-green-100";
      case "DELIVERED":
        return "text-green-600 bg-green-100";
      case "CANCELLED":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="font-luxury text-4xl font-bold text-white mb-4">
            Track Your Order
          </h1>
          <p className="text-white/70">
            Enter your email address and order number to track your order status.
          </p>
        </div>

        {/* Tracking Form */}
        {!order && (
          <div className="rounded-lg glass p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="orderNumber" className="mb-2 block text-sm font-medium text-white/70">
                    Order Number
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                    required
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    placeholder="e.g. ORD-2025-12345-123"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg luxury-button py-4 font-medium text-black transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    Tracking Order...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Track Order
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="space-y-8">
            {/* Order Header */}
            <div className="rounded-2xl glass p-6 border border-[var(--gold)]/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-luxury text-2xl font-bold text-white mb-2">
                    Order {order.orderNumber}
                  </h2>
                  <p className="text-white/70">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white mb-4">Order Items</h3>
                {order.orderProducts?.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 rounded-lg bg-white/5 p-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{item.productName}</h4>
                      <p className="text-sm text-white/60">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <Price
                        amount={item.subtotal}
                        className="font-semibold text-white"
                        symbolClassName="text-white"
                        symbolSize={16}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-[var(--gold)]/30">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <Price amount={order.subtotal} className="text-white/70" symbolClassName="text-white/70" symbolSize={14} />
                  </div>
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-<Price amount={order.discountAmount} className="text-green-400" symbolClassName="text-green-400" symbolSize={14} /></span>
                    </div>
                  )}
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <Price amount={order.shippingCost} className="text-white/70" symbolClassName="text-white/70" symbolSize={14} />
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Tax (VAT 5%)</span>
                    <Price amount={order.taxAmount} className="text-white/70" symbolClassName="text-white/70" symbolSize={14} />
                  </div>
                  <div className="flex justify-between font-semibold text-white pt-2 border-t border-[var(--gold)]/20">
                    <span>Total</span>
                    <Price amount={order.totalAmount} className="text-[var(--gold)]" symbolClassName="text-[var(--gold)]" symbolSize={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="rounded-2xl glass p-6 border border-[var(--gold)]/30">
              <h3 className="font-semibold text-white mb-4">Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-white/70 text-sm mb-1">Recipient</p>
                  <p className="text-white">{order.shippingName}</p>
                  <p className="text-white">{order.shippingEmail}</p>
                  <p className="text-white">{order.shippingPhone}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Address</p>
                  <p className="text-white">
                    {order.shippingAddress1}
                    {order.shippingAddress2 && `, ${order.shippingAddress2}`}
                  </p>
                  <p className="text-white">
                    {order.shippingCity}, {order.shippingState} {order.shippingZip}
                  </p>
                  <p className="text-white">{order.shippingCountry}</p>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            {order.deliveryOrder && (
              <div className="rounded-2xl glass p-6 border border-[var(--gold)]/30">
                <h3 className="font-semibold text-white mb-4">Delivery Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-[var(--gold)]" />
                    <div>
                      <p className="text-white font-medium">Airway Bill Number</p>
                      <p className="text-white/70 text-sm">{order.deliveryOrder.airwayBillNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-[var(--gold)]" />
                    <div>
                      <p className="text-white font-medium">Destination</p>
                      <p className="text-white/70 text-sm">{order.deliveryOrder.destinationCode}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Track Another Order */}
            <div className="text-center">
              <button
                onClick={() => {
                  setOrder(null);
                  setEmail("");
                  setOrderNumber("");
                  setError("");
                  const newUrl = new URL(window.location.href);
                  newUrl.searchParams.delete("email");
                  newUrl.searchParams.delete("orderNumber");
                  window.history.replaceState({}, "", newUrl.toString());
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--gold)]/30 px-6 py-3 font-medium text-[var(--gold)] transition-all hover:bg-black/20"
              >
                Track Another Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--gold)]"></div>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
