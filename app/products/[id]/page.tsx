import { getProduct, getProducts } from "@/lib/api";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

// Force dynamic rendering for product detail pages
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const product = await getProduct(params.id);
    return <ProductDetailClient product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}

