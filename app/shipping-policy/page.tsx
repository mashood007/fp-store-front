import React from 'react';

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-black py-12 text-white/80">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl space-y-8">
                    <h1 className="mb-8 font-luxury text-4xl font-bold text-[var(--gold)]">Shipping Policy</h1>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[var(--gold)]">Shipment processing time</h2>
                        <p>
                            All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.
                        </p>
                        <p>
                            If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[var(--gold)]">Shipping rates & delivery estimates</h2>
                        <p>
                            Shipping charges for your order will be calculated and displayed at checkout.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse border border-white/20">
                                <thead>
                                    <tr className="bg-white/10">
                                        <th className="p-4 border border-white/20">Shipment method</th>
                                        <th className="p-4 border border-white/20">Estimated delivery time</th>
                                        <th className="p-4 border border-white/20">Shipment cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-4 border border-white/20">Standard Shipping</td>
                                        <td className="p-4 border border-white/20">3-5 business days</td>
                                        <td className="p-4 border border-white/20">Calculated at checkout</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm italic">
                            * Delivery delays can occasionally occur.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[var(--gold)]">Shipment confirmation & Order tracking</h2>
                        <p>
                            You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[var(--gold)]">Customs, Duties and Taxes</h2>
                        <p>
                            Flëur d&apos;Or is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[var(--gold)]">Damages</h2>
                        <p>
                            Flëur d&apos;Or is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.
                        </p>
                        <p>
                            Please save all packaging materials and damaged goods before filing a claim.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[var(--gold)]">International Shipping Policy</h2>
                        <p>
                            We currently ship to select countries worldwide. Shipping availability and rates will be calculated at checkout based on your location.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
