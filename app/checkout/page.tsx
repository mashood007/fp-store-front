"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder, createStripeCheckoutSession, verifyCoupon } from "@/lib/api";
import { formatPriceNumber } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, ShoppingBag, User, Tag, X, Check } from "lucide-react";
import Price from "@/components/Price";
import { Address } from "@/types";

export default function CheckoutPage() {
  const UAE_EMIRATES = [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah"
  ];

  const { items, getCartTotal, clearCart } = useCart();
  const { customer, isAuthenticated, isLoading, token } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'form' | 'processing' | 'payment'>('form');
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [checkoutType, setCheckoutType] = useState<'guest' | 'authenticated'>('authenticated');
  const [checkoutTypeSelected, setCheckoutTypeSelected] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    description?: string;
    discountPercent: number;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "UAE",
    phone: "",
    billingAddress: "",
    billingAddress2: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "UAE",
    useSameAddress: true,
  });

  // Set default checkout type based on authentication status
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        setCheckoutType('authenticated');
        setCheckoutTypeSelected(true);
      }
      // For unauthenticated users, don't auto-select - let them choose
    }
  }, [isAuthenticated, isLoading]);

  // Pre-fill form with customer data
  useEffect(() => {
    if (customer) {
      setFormData(prev => ({
        ...prev,
        email: customer.email,
        firstName: customer.name.split(' ')[0] || "",
        lastName: customer.name.split(' ').slice(1).join(' ') || "",
        phone: customer.phone || "",
        address: customer.shippingAddress1 || "",
        address2: customer.shippingAddress2 || "",
        city: customer.shippingCity || "",
        state: customer.shippingState || "",
        zipCode: customer.shippingZip || "",
        country: customer.shippingCountry || "UAE",
        billingAddress: customer.billingAddress1 || customer.shippingAddress1 || "",
        billingAddress2: customer.billingAddress2 || customer.shippingAddress2 || "",
        billingCity: customer.billingCity || customer.shippingCity || "",
        billingState: customer.billingState || customer.shippingState || "",
        billingZip: customer.billingZip || customer.shippingZip || "",
        billingCountry: customer.billingCountry || customer.shippingCountry || "UAE",
      }));
    }
  }, [customer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      // If "use same address" is checked, copy shipping to billing
      if (name === 'useSameAddress' && checked) {
        setFormData((prev) => ({
          ...prev,
          billingAddress: prev.address,
          billingAddress2: prev.address2,
          billingCity: prev.city,
          billingState: prev.state,
          billingZip: prev.zipCode,
          billingCountry: prev.country,
        }));
      }
    } else {
      setFormData((prev) => {
        const updatedData = { ...prev, [name]: value };

        // Auto-copy shipping to billing if "use same address" is checked
        if (updatedData.useSameAddress && ['address', 'address2', 'city', 'state', 'zipCode', 'country'].includes(name)) {
          let billingField = '';
          switch (name) {
            case 'address':
              billingField = 'billingAddress';
              break;
            case 'address2':
              billingField = 'billingAddress2';
              break;
            case 'city':
              billingField = 'billingCity';
              break;
            case 'state':
              billingField = 'billingState';
              break;
            case 'zipCode':
              billingField = 'billingZip';
              break;
            case 'country':
              billingField = 'billingCountry';
              break;
          }
          if (billingField) {
            (updatedData as any)[billingField] = value;
          }
        }

        return updatedData;
      });
    }
    if (error) setError("");
  };

  // Handle coupon validation
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setIsValidatingCoupon(true);
    setCouponError("");

    try {
      const cartTotal = getCartTotal();
      const result = await verifyCoupon(couponCode.trim(), cartTotal);

      if (result.valid && result.code && result.discountPercent !== undefined && result.discount !== undefined) {
        setAppliedCoupon({
          code: result.code,
          description: result.description,
          discountPercent: result.discountPercent,
          discount: result.discount,
        });
        setCouponError("");
      } else {
        setCouponError(result.error || "Invalid coupon code");
        setAppliedCoupon(null);
      }
    } catch (err) {
      console.error("Error verifying coupon:", err);
      setCouponError("Failed to verify coupon. Please try again.");
      setAppliedCoupon(null);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  // Handle removing applied coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Calculate total with coupon discount, shipping, and VAT
  const calculateTotal = () => {
    const subtotal = getCartTotal();
    const discount = appliedCoupon?.discount || 0;
    const taxableAmount = Math.max(0, subtotal - discount);
    const shipping = taxableAmount >= 200 ? 0 : 15;
    const vat = taxableAmount * 0.05;
    return subtotal + shipping + vat - discount;
  };

  // Calculate shipping cost
  const calculateShipping = () => {
    const subtotal = getCartTotal();
    const discount = appliedCoupon?.discount || 0;
    const taxableAmount = Math.max(0, subtotal - discount);
    return taxableAmount >= 200 ? 0 : 15;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // For authenticated checkout, require token
    if (checkoutType === 'authenticated' && (!token || !isAuthenticated)) {
      setError("Please login to continue");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      setCurrentStep('processing');

      // Create order
      const shippingAddress: Address = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        address1: formData.address,
        address2: formData.address2 || undefined,
        city: formData.city,
        state: formData.state,
        zip: formData.zipCode,
        country: formData.country,
      };

      const orderData = {
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        shippingAddress,
        notes: undefined,
        couponCode: appliedCoupon?.code,
      };

      // Use token for authenticated orders, null for guest orders
      const authToken = checkoutType === 'authenticated' ? token : null;
      const order = await createOrder(orderData, authToken);
      setOrderId(order.id);

      // Create Stripe Checkout Session
      const billingAddress: Address = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        address1: formData.useSameAddress ? formData.address : formData.billingAddress,
        address2: formData.useSameAddress ? formData.address2 : formData.billingAddress2,
        city: formData.useSameAddress ? formData.city : formData.billingCity,
        state: formData.useSameAddress ? formData.state : formData.billingState,
        zip: formData.useSameAddress ? formData.zipCode : formData.billingZip,
        country: formData.useSameAddress ? formData.country : formData.billingCountry,
      };

      const stripeSession = await createStripeCheckoutSession(
        order.id,
        billingAddress,
        authToken
      );

      // Redirect to Stripe Checkout
      if (stripeSession.sessionUrl) {
        window.location.href = stripeSession.sessionUrl;
      } else {
        throw new Error("No Stripe checkout URL returned");
      }

    } catch (error) {
      console.error("Checkout error:", error);
      setError(error instanceof Error ? error.message : "An error occurred during checkout");
      setCurrentStep('form');
      setIsProcessing(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--gold)]"></div>
      </div>
    );
  }

  // Checkout type selection - show if not authenticated and no type selected yet
  if (!isAuthenticated && !checkoutTypeSelected) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link
            href="/cart"
            className="mb-8 inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <div className="text-center mb-8">
            <h1 className="font-luxury text-4xl font-bold text-white mb-4">
              Checkout Options
            </h1>
            <p className="text-white/70">
              Choose how you&apos;d like to proceed with your order
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guest Checkout */}
            <div
              onClick={() => {
                setCheckoutType('guest');
                setCheckoutTypeSelected(true);
              }}
              className="cursor-pointer rounded-lg glass p-6 hover:bg-white/10 transition-all border border-transparent hover:border-[var(--gold)]/30"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-[var(--gold)]/20 p-3">
                  <User className="h-6 w-6 text-[var(--gold)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Continue as Guest</h3>
                  <p className="text-sm text-white/60">Quick checkout without creating an account</p>
                </div>
              </div>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Fast and simple process</li>
                <li>• No account required</li>
                <li>• Track order via email</li>
              </ul>
            </div>

            {/* Authenticated Checkout */}
            <div
              onClick={() => router.push("/auth/login?redirect=/checkout")}
              className="cursor-pointer rounded-lg glass p-6 hover:bg-white/10 transition-all border border-transparent hover:border-[var(--gold)]/30"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-[var(--gold)]/20 p-3">
                  <User className="h-6 w-6 text-[var(--gold)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Sign In</h3>
                  <p className="text-sm text-white/60">Use your existing account</p>
                </div>
              </div>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Access order history</li>
                <li>• Save shipping details</li>
                <li>• Faster future checkouts</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/auth/register"
              className="text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors text-sm"
            >
              Don&apos;t have an account? Create one for better experience →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart
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

  // Processing states
  if (currentStep === 'processing') {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[var(--gold)]"></div>
          </div>
          <h1 className="mb-4 font-luxury text-3xl font-bold text-white">
            Creating Your Order
          </h1>
          <p className="mb-8 text-white/70">
            Please wait while we process your order...
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="animate-pulse rounded-full glass p-8">
              <CreditCard className="h-16 w-16 text-[var(--gold)]" />
            </div>
          </div>
          <h1 className="mb-4 font-luxury text-3xl font-bold text-white">
            Processing Payment
          </h1>
          <p className="mb-8 text-white/70">
            Please wait while we process your payment...
          </p>
          <div className="max-w-md mx-auto">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--gold)] rounded-full animate-progress"></div>
            </div>
            <p className="text-sm text-white/50 mt-4">
              Do not close this page or press the back button
            </p>
          </div>
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

        <div className="mb-8">
          <h1 className="font-luxury text-4xl font-bold text-white">
            Checkout
          </h1>
          <p className="text-white/70 mt-2">
            {checkoutType === 'authenticated'
              ? `Complete your order as ${customer?.name}`
              : 'Complete your order as a guest'
            }
          </p>
          {checkoutType === 'guest' && (
            <div className="mt-4 rounded-lg bg-blue-500/10 border border-blue-500/30 px-4 py-3">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-blue-400 font-medium text-sm">Guest Checkout</p>
                  <p className="text-blue-400/70 text-sm mt-1">
                    You&apos;re checking out without an account. You&apos;ll receive order updates via email.
                    <Link href="/auth/register" className="ml-2 underline hover:text-blue-300">
                      Create an account
                    </Link> for a better experience.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400">
            {error}
          </div>
        )}

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
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
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
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
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
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-white/70">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="mb-1 block text-sm font-medium text-white/70">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address2" className="mb-1 block text-sm font-medium text-white/70">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
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
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="mb-1 block text-sm font-medium text-white/70">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    >
                      <option value="">Select Emirate</option>
                      {UAE_EMIRATES.map((emirate) => (
                        <option key={emirate} value={emirate}>
                          {emirate}
                        </option>
                      ))}
                    </select>
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
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="mb-1 block text-sm font-medium text-white/70">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value="UAE"
                      disabled
                      className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white opacity-50 cursor-not-allowed"
                    >
                      <option value="UAE">United Arab Emirates</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="rounded-lg glass p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    Billing Address
                  </h2>
                  <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                    <input
                      type="checkbox"
                      name="useSameAddress"
                      checked={formData.useSameAddress}
                      onChange={handleInputChange}
                      className="rounded border-[var(--gold)]/30 bg-black/50 text-[var(--gold)] focus:ring-[var(--gold)]/20"
                    />
                    Same as shipping address
                  </label>
                </div>

                {!formData.useSameAddress && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
                    <div className="md:col-span-2">
                      <label htmlFor="billingAddress" className="mb-1 block text-sm font-medium text-white/70">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        required={!formData.useSameAddress}
                        className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="billingAddress2" className="mb-1 block text-sm font-medium text-white/70">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        id="billingAddress2"
                        name="billingAddress2"
                        value={formData.billingAddress2}
                        onChange={handleInputChange}
                        required={!formData.useSameAddress}
                        className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingCity" className="mb-1 block text-sm font-medium text-white/70">
                        City
                      </label>
                      <input
                        type="text"
                        id="billingCity"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleInputChange}
                        required={!formData.useSameAddress}
                        className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingState" className="mb-1 block text-sm font-medium text-white/70">
                        State
                      </label>
                      <select
                        id="billingState"
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleInputChange}
                        required={!formData.useSameAddress}
                        className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                      >
                        <option value="">Select Emirate</option>
                        {UAE_EMIRATES.map((emirate) => (
                          <option key={emirate} value={emirate}>
                            {emirate}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="billingZip" className="mb-1 block text-sm font-medium text-white/70">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="billingZip"
                        name="billingZip"
                        value={formData.billingZip}
                        onChange={handleInputChange}
                        required={!formData.useSameAddress}
                        className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingCountry" className="mb-1 block text-sm font-medium text-white/70">
                        Country
                      </label>
                      <select
                        id="billingCountry"
                        name="billingCountry"
                        value="UAE"
                        disabled
                        className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-2 text-white opacity-50 cursor-not-allowed"
                      >
                        <option value="UAE">United Arab Emirates</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full rounded-lg luxury-button py-4 font-medium text-black transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <span>Pay</span>
                    <Price
                      amount={calculateTotal()}
                      className="font-semibold"
                      symbolClassName="text-black"
                      symbolSize={16}
                    />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl glass p-6 shadow-luxury border border-[var(--gold)]/30">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-luxury text-2xl font-bold text-white">
                    Order Summary
                  </h2>
                  <div className="rounded-full bg-[var(--gold)]/20 px-3 py-1">
                    <span className="text-sm font-medium text-[var(--gold)]">
                      {items.length} {items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>

                {/* Product List */}
                <div className="mb-6 max-h-60 overflow-y-auto space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="group">
                      <div className="flex items-start gap-3 rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white truncate mb-1">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <span>Qty: {item.quantity}</span>
                            <span>•</span>
                            <Price
                              amount={item.product.price}
                              className="text-white/70"
                              symbolClassName="text-white/70"
                              symbolSize={12}
                            />
                            <span className="text-white/40">each</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Price
                            amount={item.product.price * item.quantity}
                            className="font-semibold text-white"
                            symbolClassName="text-white"
                            symbolSize={16}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Section */}
                <div className="mb-6 space-y-3">
                  {!appliedCoupon ? (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/70">
                        Have a coupon code?
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            placeholder="Enter code"
                            className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 pl-10 pr-4 py-2 text-white placeholder:text-white/30 focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
                            onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={isValidatingCoupon || !couponCode.trim()}
                          className="rounded-lg bg-[var(--gold)] px-6 py-2 font-medium text-black transition-all hover:bg-[var(--gold-light)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isValidatingCoupon ? "..." : "Apply"}
                        </button>
                      </div>
                      {couponError && (
                        <p className="mt-2 text-sm text-red-400">{couponError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-green-400">{appliedCoupon.code}</span>
                              <span className="text-sm text-green-400/70">({appliedCoupon.discountPercent}% off)</span>
                            </div>
                            {appliedCoupon.description && (
                              <p className="text-sm text-white/60 mt-1">{appliedCoupon.description}</p>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="rounded-full p-1 text-white/50 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
                          aria-label="Remove coupon"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Calculations */}
                <div className="space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/80 font-medium">Subtotal</span>
                    <Price
                      amount={getCartTotal()}
                      className="font-semibold text-white text-lg"
                      symbolClassName="text-white"
                      symbolSize={18}
                    />
                  </div>



                  {/* Coupon Discount */}
                  {appliedCoupon && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-green-400 font-medium">Coupon Discount</span>
                      <div className="flex items-center gap-1">
                        <span className="text-green-400">-</span>
                        <Price
                          amount={appliedCoupon.discount}
                          className="font-semibold text-green-400 text-lg"
                          symbolClassName="text-green-400"
                          symbolSize={18}
                        />
                      </div>
                    </div>
                  )}

                  {/* Tax */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/80 font-medium">Tax (VAT 5%)</span>
                    <Price
                      amount={Math.max(0, getCartTotal() - (appliedCoupon?.discount || 0)) * 0.05}
                      className="font-semibold text-white/70 text-lg"
                      symbolClassName="text-white/70"
                      symbolSize={18}
                    />
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white/80 font-medium">Shipping</span>
                      {calculateShipping() === 0 ? (
                        <div className="rounded-full bg-green-500/20 px-2 py-0.5">
                          <span className="text-xs font-medium text-green-400">FREE</span>
                        </div>
                      ) : null}
                    </div>
                    <Price
                      amount={calculateShipping()}
                      className={`font-semibold text-lg ${calculateShipping() === 0 ? 'text-[var(--gold)]' : 'text-white'}`}
                      symbolClassName={calculateShipping() === 0 ? 'text-[var(--gold)]' : 'text-white'}
                      symbolSize={18}
                    />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[var(--gold)]/30 my-4"></div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-3 bg-[var(--gold)]/10 rounded-lg px-4">
                    <span className="font-luxury text-xl font-bold text-white">Total</span>
                    <Price
                      amount={calculateTotal()}
                      className="font-luxury text-2xl font-bold text-[var(--gold)]"
                      symbolClassName="text-[var(--gold)]"
                      symbolSize={24}
                    />
                  </div>

                  {/* Savings Badge */}
                  {appliedCoupon && calculateShipping() === 0 ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-green-400 bg-green-500/10 rounded-lg py-2 px-4">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">
                        You saved <Price amount={appliedCoupon.discount + (calculateShipping() === 0 ? 15 : 0)} className="inline" symbolClassName="text-green-400" symbolSize={12} /> total!
                      </span>
                    </div>
                  ) : appliedCoupon ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-green-400 bg-green-500/10 rounded-lg py-2 px-4">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">
                        You saved <Price amount={appliedCoupon.discount} className="inline" symbolClassName="text-green-400" symbolSize={12} /> with coupon!
                      </span>
                    </div>
                  ) : calculateShipping() === 0 ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-green-400 bg-green-500/10 rounded-lg py-2 px-4">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Free shipping on orders over AED 200!</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
