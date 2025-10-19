import { getProduct, getProducts } from "@/lib/api";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const { products } = await getProducts({ limit: 100 });
    return products.map((product) => ({
      id: product.friendlyId,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

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

