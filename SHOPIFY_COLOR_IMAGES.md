# How to Set Up Color-Specific Images in Shopify

When customers select a color on the product detail page, the images will automatically update to show that color. Here's how to set it up:

## Option 1: Use Alt Text with Color Names (Recommended)

1. **Go to Shopify Admin** → **Products**
2. **Click on a product**
3. **For each image, set the Alt Text to include the color name:**
   - Grey front image: Alt text = `grey front` or `gray front`
   - Grey back image: Alt text = `grey back` or `gray back`
   - White front image: Alt text = `white front`
   - White back image: Alt text = `white back`

4. **Save the product**

The website will automatically match images to the selected color by looking for the color name in the alt text.

## Option 2: Use Variant Images

1. **Go to Shopify Admin** → **Products**
2. **Click on a product**
3. **Go to Variants section**
4. **For each color variant, assign specific images:**
   - Click on a variant (e.g., "Grey / S")
   - Assign the grey images to this variant
   - Do the same for other color variants

5. **Save the product**

The website will use the variant's assigned images when that color is selected.

## Option 3: Organize Images by Color Order

If you organize your images in this order:
- Images 1-2: First color (front/back)
- Images 3-4: Second color (front/back)
- Images 5-6: Third color (front/back)

The website will try to match images based on the order, but **Option 1 (Alt Text) is more reliable**.

## Best Practice

**Recommended setup for each product:**

1. **Upload all images for all colors**
2. **Set alt text for each image:**
   - `grey front`, `grey back`
   - `white front`, `white back`
   - `black front`, `black back`
   - etc.

3. **Make sure color names in alt text match the variant color names exactly** (case-insensitive)

## Example

For "Armor of God Tee Shirt" with Grey and White colors:

**Images:**
- Image 1: Alt text = `grey front`
- Image 2: Alt text = `grey back`
- Image 3: Alt text = `white front`
- Image 4: Alt text = `white back`

**Variants:**
- Grey / S
- Grey / M
- White / S
- White / M

When customer selects "Grey", images 1-2 will show.
When customer selects "White", images 3-4 will show.

## Troubleshooting

**Images don't change when selecting color:**
1. Check that alt text includes the color name
2. Make sure color names match (e.g., "Grey" in variant = "grey" in alt text)
3. Try using variant images instead (Option 2)

**Only some images show:**
- Make sure you have front and back images for each color
- Check that alt text is set correctly

