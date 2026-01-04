# How to Add Multiple Images for Products

You can now show multiple images for each product (like front and back views of a t-shirt).

## Quick Example

Instead of a single image:
```tsx
image: '/products/cross-tee.jpg'
```

Use an array of images:
```tsx
image: ['/products/cross-tee-front.jpg', '/products/cross-tee-back.jpg']
```

## Step-by-Step Instructions

### Step 1: Prepare Your Images

Name your images clearly:
- Front view: `cross-tee-front.jpg`
- Back view: `cross-tee-back.jpg`
- Or: `crown-tee-front.jpg`, `crown-tee-back.jpg`

### Step 2: Add Images to Folder

Place all images in: `/Users/mschepis/Desktop/Begotten/public/products/`

### Step 3: Update Product Data

Open `components/ProductShowcase.tsx` and update the product:

**Before (single image):**
```tsx
{
  id: '1',
  name: 'Cross Tee',
  price: 29.99,
  image: '/products/cross-tee.jpg',
  description: 'Minimal black cross design on premium white cotton',
  category: 'tshirt',
}
```

**After (multiple images):**
```tsx
{
  id: '1',
  name: 'Cross Tee',
  price: 29.99,
  image: [
    '/products/cross-tee-front.jpg',
    '/products/cross-tee-back.jpg'
  ],
  description: 'Minimal black cross design on premium white cotton',
  category: 'tshirt',
}
```

### Step 4: How It Works

- **Hover over the product**: Images will switch automatically
- **Click the dots**: Click the small dots at the bottom to switch images
- **Single image**: If you only provide one image, it works as before

## Examples

### Example 1: Front and Back Views
```tsx
{
  id: '1',
  name: 'Cross Tee',
  image: [
    '/products/cross-tee-front.jpg',
    '/products/cross-tee-back.jpg'
  ],
  // ... rest of product data
}
```

### Example 2: Front, Back, and Detail
```tsx
{
  id: '2',
  name: 'Crown of Thorns Tee',
  image: [
    '/products/crown-tee-front.jpg',
    '/products/crown-tee-back.jpg',
    '/products/crown-tee-detail.jpg'
  ],
  // ... rest of product data
}
```

### Example 3: Single Image (Still Works)
```tsx
{
  id: '3',
  name: 'Simple Tee',
  image: '/products/simple-tee.jpg', // Still works with single image
  // ... rest of product data
}
```

## Image Naming Tips

Use consistent naming:
- `product-name-front.jpg`
- `product-name-back.jpg`
- `product-name-detail.jpg`
- `product-name-side.jpg`

## Best Practices

1. **Consistent Angles**: Use the same angle/perspective for all views
2. **Same Background**: Keep backgrounds consistent across images
3. **Same Lighting**: Use similar lighting for all product photos
4. **Order Matters**: First image is the default/main view
5. **File Size**: Keep each image under 2MB for fast loading

## Troubleshooting

### Images Don't Switch
- Make sure you're using an array `[]` not a string
- Check that all image paths are correct
- Verify files exist in `/public/products/`

### Only One Image Shows
- Check that you're using array syntax: `['image1.jpg', 'image2.jpg']`
- Make sure both images exist in the folder
- Restart dev server after adding images

### Images Look Wrong
- Ensure all images are the same aspect ratio (square works best)
- Use consistent backgrounds
- Keep image quality consistent

## Complete Example

Here's a complete product with multiple images:

```tsx
const products: Product[] = [
  {
    id: '1',
    name: 'Cross Tee',
    price: 29.99,
    image: [
      '/products/cross-tee-front.jpg',
      '/products/cross-tee-back.jpg'
    ],
    description: 'Minimal black cross design on premium white cotton',
    category: 'tshirt',
  },
]
```

That's it! Your products can now show multiple views. 🎉

