"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Save, Settings } from "lucide-react";

export default function ProfilePage() {
  const { customer, isAuthenticated, isLoading, updateProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    shippingAddress1: "",
    shippingAddress2: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "",
    billingAddress1: "",
    billingAddress2: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/account/profile");
    }
  }, [isAuthenticated, isLoading, router]);

  // Load customer data when available
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        phone: customer.phone || "",
        shippingAddress1: customer.shippingAddress1 || "",
        shippingAddress2: customer.shippingAddress2 || "",
        shippingCity: customer.shippingCity || "",
        shippingState: customer.shippingState || "",
        shippingZip: customer.shippingZip || "",
        shippingCountry: customer.shippingCountry || "",
        billingAddress1: customer.billingAddress1 || "",
        billingAddress2: customer.billingAddress2 || "",
        billingCity: customer.billingCity || "",
        billingState: customer.billingState || "",
        billingZip: customer.billingZip || "",
        billingCountry: customer.billingCountry || "",
      });
    }
  }, [customer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    const result = await updateProfile(formData);
    
    if (result.success) {
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } else {
      setError(result.error || "Failed to update profile");
    }
    
    setIsSaving(false);
  };

  const copyShippingToBilling = () => {
    setFormData((prev) => ({
      ...prev,
      billingAddress1: prev.shippingAddress1,
      billingAddress2: prev.shippingAddress2,
      billingCity: prev.shippingCity,
      billingState: prev.shippingState,
      billingZip: prev.shippingZip,
      billingCountry: prev.shippingCountry,
    }));
  };

  if (isLoading) {
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
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-full bg-[var(--gold)]/10 p-4">
                <User className="h-8 w-8 text-[var(--gold)]" />
              </div>
              <div>
                <h1 className="font-luxury text-4xl font-bold text-white">
                  My Profile
                </h1>
                <p className="text-white/70">
                  Manage your account information and addresses
                </p>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 rounded-lg luxury-button px-6 py-3 font-medium text-black transition-all"
              >
                <Settings className="h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-lg bg-green-500/10 border border-green-500/30 px-4 py-3 text-green-400">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="rounded-lg glass p-6">
              <h2 className="mb-6 text-2xl font-semibold text-white">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/70">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/70">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customer?.email || ""}
                    disabled
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white/60 cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-white/50">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-lg glass p-6">
              <h2 className="mb-6 text-2xl font-semibold text-white">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="shippingAddress1" className="mb-2 block text-sm font-medium text-white/70">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="shippingAddress1"
                    name="shippingAddress1"
                    value={formData.shippingAddress1}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="shippingAddress2" className="mb-2 block text-sm font-medium text-white/70">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    id="shippingAddress2"
                    name="shippingAddress2"
                    value={formData.shippingAddress2}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="shippingCity" className="mb-2 block text-sm font-medium text-white/70">
                    City
                  </label>
                  <input
                    type="text"
                    id="shippingCity"
                    name="shippingCity"
                    value={formData.shippingCity}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="shippingState" className="mb-2 block text-sm font-medium text-white/70">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="shippingState"
                    name="shippingState"
                    value={formData.shippingState}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="shippingZip" className="mb-2 block text-sm font-medium text-white/70">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    id="shippingZip"
                    name="shippingZip"
                    value={formData.shippingZip}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="shippingCountry" className="mb-2 block text-sm font-medium text-white/70">
                    Country
                  </label>
                  <input
                    type="text"
                    id="shippingCountry"
                    name="shippingCountry"
                    value={formData.shippingCountry}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="rounded-lg glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  Billing Address
                </h2>
                {isEditing && (
                  <button
                    type="button"
                    onClick={copyShippingToBilling}
                    className="text-sm text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
                  >
                    Copy from shipping address
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="billingAddress1" className="mb-2 block text-sm font-medium text-white/70">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="billingAddress1"
                    name="billingAddress1"
                    value={formData.billingAddress1}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="billingAddress2" className="mb-2 block text-sm font-medium text-white/70">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    id="billingAddress2"
                    name="billingAddress2"
                    value={formData.billingAddress2}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="billingCity" className="mb-2 block text-sm font-medium text-white/70">
                    City
                  </label>
                  <input
                    type="text"
                    id="billingCity"
                    name="billingCity"
                    value={formData.billingCity}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="billingState" className="mb-2 block text-sm font-medium text-white/70">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="billingState"
                    name="billingState"
                    value={formData.billingState}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="billingZip" className="mb-2 block text-sm font-medium text-white/70">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    id="billingZip"
                    name="billingZip"
                    value={formData.billingZip}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="billingCountry" className="mb-2 block text-sm font-medium text-white/70">
                    Country
                  </label>
                  <input
                    type="text"
                    id="billingCountry"
                    name="billingCountry"
                    value={formData.billingCountry}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-[var(--gold)]/30 bg-black/50 px-4 py-3 text-white focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-lg luxury-button px-8 py-3 font-medium text-black transition-all disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setError("");
                    setSuccess("");
                    // Reset form data
                    if (customer) {
                      setFormData({
                        name: customer.name || "",
                        phone: customer.phone || "",
                        shippingAddress1: customer.shippingAddress1 || "",
                        shippingAddress2: customer.shippingAddress2 || "",
                        shippingCity: customer.shippingCity || "",
                        shippingState: customer.shippingState || "",
                        shippingZip: customer.shippingZip || "",
                        shippingCountry: customer.shippingCountry || "",
                        billingAddress1: customer.billingAddress1 || "",
                        billingAddress2: customer.billingAddress2 || "",
                        billingCity: customer.billingCity || "",
                        billingState: customer.billingState || "",
                        billingZip: customer.billingZip || "",
                        billingCountry: customer.billingCountry || "",
                      });
                    }
                  }}
                  className="rounded-lg border border-[var(--gold)]/30 px-8 py-3 font-medium text-[var(--gold)] transition-all hover:bg-black/50"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
