"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full glass p-8">
              <ShoppingBag className="h-16 w-16 text-[var(--gold)]/50" />
            </div>
          </div>
          <h1 className="mb-4 font-luxury text-3xl font-bold text-white">
            Your cart is empty
          </h1>
          <p className="mb-8 text-white/70">
            Add some products to your cart before checking out.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full luxury-button px-8 py-4 font-medium text-black transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/cart"
          className="mb-8 inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="mb-8 font-luxury text-4xl font-bold text-white">
          Checkout
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="rounded-lg glass p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  Contact Information
                </h2>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-white/70">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-white/5 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-lg glass p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-white/70">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-white/5 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-white/70">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-white/5 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="mb-1 block text-sm font-medium text-white/70">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-white/5 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="mb-1 block text-sm font-medium text-white/70">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-white/5 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="mb-1 block text-sm font-medium text-white/70">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-white/5 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="mb-1 block text-sm font-medium text-white/70">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-white/5 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="mb-1 block text-sm font-medium text-white/70">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-white/5 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="rounded-lg glass p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="mb-1 block text-sm font-medium text-white/70">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full rounded-lg border border-[var(--gold)]/30 bg-white/5 px-4 py-2 pr-12 text-white placeholder:text-white/30 focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                      />
                      <CreditCard className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="mb-1 block text-sm font-medium text-white/70">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="w-full rounded-lg border border-[var(--gold)]/30 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="cardCvv" className="mb-1 block text-sm font-medium text-white/70">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cardCvv"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full rounded-lg border border-[var(--gold)]/30 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full rounded-lg luxury-button py-4 font-medium text-black transition-all disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : `Pay ${formatPrice(getCartTotal())}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg glass p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-white">
                Order Summary
              </h2>
              <div className="mb-4 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-white/70">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-[var(--gold)]/20 pt-4">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span className="font-medium text-white">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span className="font-medium text-[var(--gold)]">Free</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Tax</span>
                  <span className="font-medium">{formatPrice(0)}</span>
                </div>
                <div className="border-t border-[var(--gold)]/20 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-[var(--gold)]">{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
