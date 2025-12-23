import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// JSON-LD structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.fleurdorparfums.com/#organization",
      "name": "Flëur d'Or Perfumes",
      "url": "https://www.fleurdorparfums.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.fleurdorparfums.com/logos/logo1.png",
        "width": 200,
        "height": 200
      },
      "sameAs": [
        // Add social media links if available
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+971-XX-XXX-XXXX", // Update with actual phone
        "contactType": "customer service",
        "areaServed": "AE",
        "availableLanguage": "English"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.fleurdorparfums.com/#website",
      "url": "https://www.fleurdorparfums.com",
      "name": "Flëur d'Or Luxury Perfume Boutique",
      "description": "Premium fragrances and luxury perfumes in UAE. Authentic scents for men and women.",
      "publisher": {
        "@id": "https://www.fleurdorparfums.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.fleurdorparfums.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.fleurdorparfums.com/#localbusiness",
      "name": "Flëur d'Or Perfumes",
      "description": "Luxury perfume boutique offering authentic fragrances in UAE",
      "url": "https://www.fleurdorparfums.com",
      "telephone": "+971569298916", // Update with actual phone
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AE",
        "addressRegion": "Sharjah", // Update with actual location
        "addressLocality": "Sharjah" // Update with actual location
      },
      "openingHours": "Mo-Su 09:00-21:00", // Update with actual hours
      "priceRange": "$$$",
      "paymentAccepted": "Cash, Credit Card",
      "currenciesAccepted": "AED"
    }
  ]
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Flëur d'Or - Luxury Perfume Boutique | Premium Fragrances UAE",
  description: "Discover the finest collection of luxury perfumes and fragrances in UAE. Shop authentic men's and women's perfumes, oud, luxury scents, and premium fragrance collections at Flëur d'Or.",
  keywords: [
    // High-volume primary keywords
    "perfumes and fragrances",
    "men's perfume",
    "women's perfume",
    "luxury perfume",
    "oud perfume",
    "perfume shop",
    "fragrances UAE",
    "parfum UAE",
    "luxury fragrance",
    "premium perfume",

    // Men's fragrances
    "men's fragrance",
    "men's cologne",
    "luxury men's fragrance",
    "men's perfume UAE",
    "men's fragrance collection",

    // Women's fragrances
    "women's fragrance",
    "women's perfume UAE",
    "luxury women's fragrance",
    "women's fragrance collection",
    "elegant women's perfume",

    // Oud and oriental
    "oud perfume UAE",
    "amber perfume",
    "oriental perfume",
    "oud elixir",

    // Luxury and premium
    "luxury perfume UAE",
    "expensive perfume",
    "premium fragrance",
    "high end perfume",
    "luxury perfume collection",

    // Store and shopping
    "perfume shop UAE",
    "fragrance store",
    "perfume boutique UAE",
    "buy perfumes online UAE",
    "perfume delivery UAE",

    // Types and categories
    "unisex perfume",
    "eau de parfum",
    "extrait de parfum",
    "perfume sets",
    "fragrance collection",

    // Dubai/Sharjah specific
    "perfume shop Dubai",
    "perfume shop Sharjah",
    "perfumes in Dubai",
    "perfumes in Sharjah",

    // Brand and authenticity
    "authentic perfumes",
    "genuine fragrances",
    "original perfume",
    "100% authentic perfume",

    // Popular searches
    "best perfume UAE",
    "luxury perfume for men",
    "luxury perfume for women",
    "perfume gift UAE",
    "fragrance gift set"
  ],
  authors: [{ name: "Flëur d'Or Perfumes" }],
  creator: "Flëur d'Or",
  publisher: "Flëur d'Or Perfumes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.fleurdorparfums.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flëur d'Or - Luxury Perfume Boutique | Premium Fragrances UAE",
    description: "Discover authentic luxury perfumes and fragrances in UAE. Shop men's and women's perfumes, oud, and premium scents at Flëur d'Or - Your trusted perfume boutique.",
    url: "https://www.fleurdorparfums.com",
    siteName: "Flëur d'Or Perfumes",
    images: [
      {
        url: "/logos/logo1.png",
        width: 1200,
        height: 630,
        alt: "Flëur d'Or Luxury Perfume Boutique",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flëur d'Or - Luxury Perfume Boutique UAE",
    description: "Premium fragrances and luxury perfumes in UAE. Authentic scents for men and women.",
    images: ["/logos/logo1.png"],
    creator: "@fleurdorparfums",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logos/logo1.png",
    shortcut: "/logos/logo1.png",
    apple: "/logos/logo1.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

