import Link from "next/link";
import { Check } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full glass p-8">
            <Check className="h-16 w-16 text-[var(--gold)]" />
          </div>
        </div>
        <h1 className="mb-4 font-luxury text-4xl font-bold text-white">
          Order Successful!
        </h1>
        <p className="mb-2 text-lg text-white">
          Thank you for your purchase.
        </p>
        <p className="mb-8 text-white/70">
          You will receive an email confirmation shortly.
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
