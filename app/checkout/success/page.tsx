"use client";

import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAuth } from "@/context/AuthContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const email = searchParams.get("email");
  const { isAuthenticated, customer } = useAuth();

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-2xl">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="rounded-full bg-black/60 p-8">
                <CheckCircle className="h-20 w-20 text-green-400" />
              </div>
              <div className="absolute inset-0 rounded-full bg-black/60 animate-ping"></div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="mb-4 font-luxury text-4xl font-bold text-white md:text-5xl">
            Order Confirmed!
          </h1>
          
          {orderNumber && (
            <div className="mb-6 rounded-lg glass p-6">
              <p className="text-lg text-white/80 mb-2">
                Your order has been successfully placed
              </p>
              <div className="flex items-center justify-center gap-2 text-[var(--gold)]">
                <Package className="h-5 w-5" />
                <span className="font-mono text-lg font-semibold">
                  {orderNumber}
                </span>
              </div>
            </div>
          )}

          <p className="mb-8 text-lg text-white/70">
            Thank you for your purchase! We&apos;ve sent a confirmation email with your order details.
            {isAuthenticated
              ? " You can track your order progress in your account."
              : " You can track your order status using the link below."
            }
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={isAuthenticated ? "/account/orders" : `/track-order?orderNumber=${orderNumber || ""}&email=${email || ""}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg luxury-button px-8 py-4 font-medium text-black transition-all hover:scale-105"
            >
              <Package className="h-5 w-5" />
              {isAuthenticated ? "View Order Details" : "Track Your Order"}
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--gold)]/30 px-8 py-4 font-medium text-[var(--gold)] transition-all hover:bg-black/20"
            >
              Continue Shopping
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="mb-2 text-[var(--gold)]">📧</div>
              <p className="text-white/70">
                Confirmation email sent to your email address
              </p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-[var(--gold)]">🚚</div>
              <p className="text-white/70">
                Fast and secure shipping to your location
              </p>
            </div>
            <div className="text-center">
              <div className="mb-2 text-[var(--gold)]">↩️</div>
              <p className="text-white/70">
                30-day return policy for all items
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--gold)]"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}