# How to Add Your T-Shirt Images to the Website

Great job on creating your first designs! Here's how to add them to your website.

## Step-by-Step Instructions

### Step 1: Prepare Your Images

1. **Make sure your images are ready**:
   - Square format works best (1:1 ratio)
   - Good quality (at least 800x800 pixels)
   - Clear, well-lit photos
   - White or light background (matches your minimal aesthetic)

2. **Name your files**:
   - Cross t-shirt: `cross-tee.jpg` (or `.png`)
   - Crown of Thorns t-shirt: `crown-tee.jpg` (or `.png`)

### Step 2: Add Images to Your Project

**Option A: Using Finder (Mac)**

1. Open Finder
2. Navigate to: `/Users/mschepis/Desktop/Begotten/public/products/`
3. Drag and drop your image files into this folder
4. Make sure the file names match exactly:
   - `cross-tee.jpg`
   - `crown-tee.jpg`

**Option B: Using Terminal**

1. Open Terminal
2. Navigate to your project:
   ```bash
   cd /Users/mschepis/Desktop/Begotten
   ```
3. Copy your images to the products folder:
   ```bash
   # Replace with your actual image file paths
   cp ~/Downloads/cross-tee.jpg public/products/
   cp ~/Downloads/crown-tee.jpg public/products/
   ```

### Step 3: Verify Images Are Added

1. Check that the files exist:
   ```bash
   ls public/products/
   ```
   You should see your image files listed.

### Step 4: View Your Website

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

3. Scroll down to the Products section - you should see your t-shirts!

### Step 5: Update Product Details (Optional)

If you want to change product names, prices, or descriptions:

1. Open `components/ProductShowcase.tsx`
2. Find the `products` array
3. Update the details:
   ```tsx
   {
     id: '1',
     name: 'Your Product Name',      // Change this
     price: 29.99,                   // Change this
     image: '/products/cross-tee.jpg',
     description: 'Your description', // Change this
     category: 'tshirt',
   }
   ```
4. Save the file - the website will update automatically!

## Troubleshooting

### Images Don't Show Up

1. **Check file names**: They must match exactly (case-sensitive)
   - `cross-tee.jpg` ✅
   - `Cross-Tee.jpg` ❌ (wrong case)

2. **Check file location**: Images must be in `/public/products/` folder

3. **Check file format**: Use `.jpg` or `.png` (not `.jpeg` or other formats)

4. **Restart dev server**: Sometimes you need to restart:
   - Press `Ctrl + C` to stop
   - Run `npm run dev` again

### Images Look Blurry

- Use higher resolution images (at least 1200x1200px)
- Make sure images are clear and well-lit
- Avoid compressing too much

### Images Are Too Large (Slow Loading)

- Compress images before adding them
- Use tools like:
  - [TinyPNG](https://tinypng.com) - online image compressor
  - [ImageOptim](https://imageoptim.com) - Mac app
- Keep file sizes under 2MB each

## Image Best Practices

1. **Consistent Style**: 
   - Use similar backgrounds for all products
   - Keep lighting consistent
   - Use the same angle/perspective

2. **Product Focus**:
   - Make sure the t-shirt design is clearly visible
   - Center the design in the frame
   - Remove distracting backgrounds if needed

3. **File Organization**:
   - Use descriptive file names
   - Keep original high-res versions somewhere safe
   - Use web-optimized versions in the website

## Next Steps

Once your images are added:
1. ✅ Test the website to see your products
2. ✅ Adjust prices and descriptions if needed
3. ✅ Add more products as you create them
4. ✅ When ready, set up Shopify to handle actual sales

## Quick Reference

**File Path**: `/Users/mschepis/Desktop/Begotten/public/products/`

**Current Products**:
- Cross Tee → `cross-tee.jpg`
- Crown of Thorns Tee → `crown-tee.jpg`

**To Add More**: Just add the image file and update the `products` array in `ProductShowcase.tsx`!

