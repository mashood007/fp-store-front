# Local Face - Perfume Store Front

A modern, responsive e-commerce store front built with Next.js 14, featuring a beautiful UI for browsing and purchasing premium perfumes.

## Features

- 🛍️ **Product Browsing**: Browse products with beautiful card layouts
- 🔍 **Search & Filter**: Search products and filter by categories
- 🛒 **Shopping Cart**: Full-featured shopping cart with local storage persistence
- 💳 **Checkout Flow**: Complete checkout process with order summary
- 📱 **Responsive Design**: Fully responsive design for all screen sizes
- 🎨 **Modern UI**: Clean, elegant interface inspired by luxury perfume brands
- ⚡ **Fast Performance**: Built on Next.js 14 with App Router and Server Components
- 🔄 **API Integration**: Seamless integration with admin backend APIs

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **API Communication**: Native Fetch API with ISR

## Project Structure

```
store-front/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── cart/              # Shopping cart page
│   ├── categories/        # Categories listing page
│   ├── checkout/          # Checkout flow
│   │   └── success/       # Order success page
│   ├── products/          # Products listing & detail
│   │   └── [id]/          # Dynamic product detail page
│   ├── search/            # Search results page
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer component
│   ├── ProductCard.tsx    # Product card component
│   ├── ProductGrid.tsx    # Product grid layout
│   └── Loading.tsx        # Loading spinner
├── context/               # React Context providers
│   └── CartContext.tsx    # Shopping cart state management
├── lib/                   # Utility functions
│   ├── api.ts             # API integration functions
│   └── utils.ts           # Helper utilities
├── types/                 # TypeScript type definitions
│   └── index.ts           # Shared types
└── public/                # Static assets

```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Admin backend running on `http://localhost:3000`

### Installation

1. Navigate to the store-front directory:
   ```bash
   cd store-front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file (optional):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api/store
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:3001
   ```

## API Integration

The store front integrates with the admin backend APIs:

- **Products List**: `GET /api/store/products`
  - Query params: `category`, `search`, `limit`, `offset`
  
- **Product Detail**: `GET /api/store/products/:id`
  - Supports both `id` and `friendlyId`

All API calls are configured in `lib/api.ts` and use Next.js ISR (Incremental Static Regeneration) for optimal performance.

## Key Components

### Shopping Cart

The shopping cart is implemented using React Context API and persists to localStorage:

```typescript
import { useCart } from "@/context/CartContext";

const { items, addToCart, removeFromCart, getCartTotal } = useCart();
```

### Product Grid

Displays products in a responsive grid layout with add-to-cart functionality:

```typescript
<ProductGrid products={products} />
```

### Product Card

Individual product card with image, details, and quick add-to-cart:

```typescript
<ProductCard product={product} onAddToCart={handleAddToCart} />
```

## Pages

- **Home (`/`)**: Hero section, featured products, and category links
- **Products (`/products`)**: All products with filtering
- **Product Detail (`/products/[id]`)**: Detailed product view with image gallery
- **Categories (`/categories`)**: Browse products by category
- **Search (`/search`)**: Search results page
- **Cart (`/cart`)**: Shopping cart with quantity management
- **Checkout (`/checkout`)**: Checkout form with order summary
- **About (`/about`)**: About the store

## Styling

The project uses Tailwind CSS with a custom color scheme:

```javascript
colors: {
  primary: {
    50: '#fdf8f6',
    100: '#f2e8e5',
    // ... more shades
    900: '#43302b',
  },
}
```

Custom fonts:
- **Body**: Inter (sans-serif)
- **Display**: Playfair Display (serif)

## Build for Production

```bash
npm run build
npm start
```

The production build will be optimized and ready for deployment.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Admin backend API URL | `http://localhost:3000/api/store` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a practice project. Feel free to use it as a reference or starting point for your own e-commerce store.

## License

MIT License - feel free to use this project for learning or as a template.

