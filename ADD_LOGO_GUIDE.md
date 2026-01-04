# Add Your Logo to the Custom Website

I've updated the code to use your logo. Here's how to add it:

## Step 1: Add Your Logo Image

1. **Save your logo** as a PNG or SVG file
2. **Name it**: `begotten-logo.png` (or `.svg`)
3. **Place it in**: `/Users/mschepis/Desktop/Begotten/public/logo/`

**Recommended:**
- PNG with transparent background
- SVG for best quality
- Size: around 200-300px wide

## Step 2: Test It

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Check your website** - logo should appear in the top left

3. **If logo doesn't show**, it will fallback to "BEGOTTEN" text

## Step 3: Adjust Logo Size (If Needed)

If the logo is too big or small, edit `components/Hero.tsx`:

Change this line:
```tsx
className="h-8 w-auto"
```

To adjust size:
- `h-6` = smaller
- `h-10` = larger
- `h-12` = even larger

## What I've Updated

✅ Navigation now uses logo image  
✅ Falls back to "BEGOTTEN" text if image not found  
✅ Matches your minimal design  

## Also Available: Shopify Theme Customization

If you want to add the logo to your Shopify theme instead:

1. **Shopify Admin** → **"Online Store"** → **"Themes"**
2. **Click "Customize"**
3. **Find "Header"** section
4. **Upload logo**
5. **Save**

Let me know once you've added the logo file and we can test it!

