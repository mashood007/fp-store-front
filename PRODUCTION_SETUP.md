# Store Front Production Setup

## Fixed: Image Configuration

The store-front has been updated to support Vercel Blob Storage images. The configuration now includes:

```javascript
// next.config.mjs
images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000',
      pathname: '/uploads/**',
    },
    {
      protocol: 'https',
      hostname: '*.public.blob.vercel-storage.com',
      pathname: '/**',
    },
  ],
}
```

This allows Next.js Image Optimization to work with images from Vercel Blob Storage.

## Production Deployment Checklist

### Step 1: Configure Environment Variables in Vercel

Your store-front needs to know where the admin API is located. Add this environment variable to your Vercel project:

1. Go to your store-front project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:

   **Key**: `NEXT_PUBLIC_API_URL`  
   **Value**: `https://fp-admin-six.vercel.app/api/store`  
   **Environment**: Production ✓ (and optionally Preview)

### Step 2: Redeploy Your Store-Front

After adding the environment variable:

```bash
# Option 1: Push a new commit
git add .
git commit -m "Fix image configuration for Vercel Blob"
git push

# Option 2: Use Vercel CLI
vercel --prod

# Option 3: Redeploy from Vercel Dashboard
# Go to Deployments → Click on latest → Redeploy
```

### Step 3: Verify the Setup

After deployment, check:

1. **Images Load**: Product images from Vercel Blob should display correctly
2. **API Connection**: Products load from the admin panel's database
3. **Network Tab**: Check that image URLs resolve properly

Example working image URL:
```
https://kvrayugaswnnzrlb.public.blob.vercel-storage.com/1760902469284-xuge6buwwhf.jpeg
```

### Local Development

For local development, you can create a `.env.local` file (this file is gitignored):

```env
# .env.local (for local development only)
NEXT_PUBLIC_API_URL=http://localhost:3000/api/store
```

The default value in the code already points to localhost, so this is optional.

## How It Works

### Image Flow

1. **Admin Panel** uploads images → Vercel Blob (in production)
2. **Database** stores the Vercel Blob URL
3. **Store Front** fetches product data with image URLs
4. **Next.js Image** component optimizes and serves images

### API Flow

```
Store Front → NEXT_PUBLIC_API_URL → Admin Panel /api/store → Database
```

### Development vs Production

| Environment | Image Storage | API URL |
|------------|--------------|---------|
| Development | Local `/uploads/` | `http://localhost:3000/api/store` |
| Production | Vercel Blob | `https://fp-admin-six.vercel.app/api/store` |

## Troubleshooting

### Images Still Not Loading

1. **Check Next.js config**: Ensure `*.public.blob.vercel-storage.com` is in `remotePatterns`
2. **Clear cache**: Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
3. **Check browser console**: Look for CORS or image loading errors
4. **Verify Blob access**: Open the Blob URL directly in browser to ensure it's accessible

### API Connection Issues

1. **Check environment variable**: Verify `NEXT_PUBLIC_API_URL` is set in Vercel
2. **Test API directly**: Visit `https://fp-admin-six.vercel.app/api/store/products` in browser
3. **Check CORS**: Ensure the admin API allows requests from your store-front domain

### Still Having Issues?

Check the browser console and Vercel deployment logs for specific error messages.

## Next Steps

After deployment:
- Test product pages with images
- Verify cart and checkout functionality
- Check mobile responsiveness
- Test search and category filters

