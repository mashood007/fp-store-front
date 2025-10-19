"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black py-20">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full glass p-8">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
        </div>
        <h2 className="mb-4 font-luxury text-3xl font-bold text-white">
          Something went wrong!
        </h2>
        <p className="mb-8 text-white/70">
          We encountered an error while processing your request.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full luxury-button px-8 py-4 font-medium text-black transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
