import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black py-20">
      <div className="text-center">
        <h1 className="mb-4 font-luxury text-9xl font-bold text-[var(--gold)]">
          404
        </h1>
        <h2 className="mb-4 font-luxury text-3xl font-bold text-white">
          Page Not Found
        </h2>
        <p className="mb-8 text-white/70">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full luxury-button px-8 py-4 font-medium text-black transition-all"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
