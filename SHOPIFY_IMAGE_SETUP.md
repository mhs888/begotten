# How to Set Up Front/Back Images in Shopify

The hover effect shows the back image when you hover over a product. To make this work properly, you need to set up your product images correctly in Shopify.

## Option 1: Use Alt Text (Recommended)

1. **Go to Shopify Admin** → **Products**
2. **Click on a product** (e.g., "Armor of God Tee Shirt")
3. **Scroll to the Images section**
4. **Upload your images in this order:**
   - **First image**: Front view of the t-shirt
   - **Second image**: Back view of the t-shirt
   - Additional images: Other views (optional)

5. **For the back image, set the Alt Text:**
   - Click on the second image
   - In the "Alt text" field, type: `back` or `rear`
   - This tells the website which image is the back view

6. **Save the product**

## Option 2: Image Order (Automatic)

If you don't set alt text, the website will automatically use:
- **First image** = Front view
- **Second image** = Back view

So just make sure your images are uploaded in the correct order:
1. Front view first
2. Back view second
3. Other views after (optional)

## Current Behavior

The website now:
- ✅ Checks alt text for "back" or "rear" keywords
- ✅ Falls back to using first 2 images as front/back
- ✅ Shows front image by default
- ✅ Shows back image on hover

## Troubleshooting

**If hover still shows color variants instead of back:**

1. **Check your image order** - Make sure front is first, back is second
2. **Set alt text** - Add "back" to the alt text of your back image
3. **Remove color variant images** - If you have separate images for each color, consider:
   - Using one set of images (front/back) for all colors
   - Or organizing images so front/back are always first two

**Example Setup:**
- Image 1: "Armor of God Tee - Front" (no alt text needed)
- Image 2: "Armor of God Tee - Back" (alt text: "back")
- Image 3+: Other views (optional)

## Quick Fix

For each product in Shopify:
1. Make sure you have at least 2 images
2. First image = front view
3. Second image = back view
4. (Optional) Set alt text "back" on second image

That's it! The hover effect will work automatically.

