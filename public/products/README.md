# Product Images

Place your product images in this folder.

## Current Products

1. **Cross Tee** (`cross-tee.jpg`)
   - White t-shirt with simple black cross design
   - Recommended size: 1200x1200px or larger
   - Format: JPG or PNG

2. **Crown of Thorns Tee** (`crown-tee.jpg`)
   - White t-shirt with detailed Jesus Christ illustration
   - Recommended size: 1200x1200px or larger
   - Format: JPG or PNG

## How to Add Images

1. **Save your images** with these exact names:
   - `cross-tee.jpg` (or `.png`)
   - `crown-tee.jpg` (or `.png`)

2. **Place them in this folder**: `/public/products/`

3. **Image Requirements**:
   - Square aspect ratio (1:1) works best
   - Minimum size: 800x800px
   - Recommended: 1200x1200px or larger
   - File size: Keep under 2MB for fast loading
   - Format: JPG (for photos) or PNG (for graphics with transparency)

4. **Tips**:
   - Use white or light backgrounds to match the minimal aesthetic
   - Ensure good lighting and clear product visibility
   - Crop to focus on the t-shirt design
   - Optimize images before uploading (use tools like TinyPNG or ImageOptim)

## Adding More Products

When you add more products:
1. Add the image to this folder
2. Update the `products` array in `components/ProductShowcase.tsx`
3. Use the path: `/products/your-image-name.jpg`

