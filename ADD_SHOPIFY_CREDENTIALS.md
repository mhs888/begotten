# Add Shopify Storefront API Credentials

You have your Storefront API tokens! Here's how to add them to your website.

## Step 1: Create .env.local File

1. **In your project folder**, create a new file called `.env.local`
2. **Add these lines** (replace with your actual values):

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_YOUR_TOKEN_HERE
```

**Important:**
- Replace `6tfp84-zr.myshopify.com` with your actual store domain if different
- Use the **Private access token** (starts with `shpat_`)
- Don't use the Public access token for this

## Step 2: Verify Your Store Domain

Your store domain should be in the format: `your-store-name.myshopify.com`

You can find it:
- In your Shopify admin URL
- In Settings → General → Store details

## Step 3: Restart Your Dev Server

After creating `.env.local`:

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Test the Integration

1. **Open your website**: http://localhost:3000
2. **Check the Products section**
3. **Products from Shopify should appear!**

If you see your Shopify products, it's working! 🎉

## Troubleshooting

### Products Don't Appear

1. **Check browser console** (F12 → Console tab)
   - Look for any error messages
   - Check if it says "Shopify credentials not configured"

2. **Verify .env.local file**:
   - Make sure it's in the project root (same folder as package.json)
   - Make sure it's named exactly `.env.local` (with the dot at the start)
   - Check that values don't have extra spaces

3. **Check your store domain**:
   - Should be: `your-store.myshopify.com`
   - No `https://` or trailing slashes

4. **Verify token**:
   - Should start with `shpat_`
   - No extra spaces or quotes

### "Invalid API key" Error

- Make sure you're using the **Private access token** (shpat_...)
- Not the Public access token
- Check for typos

### Still Using Local Products

- Check browser console for errors
- Make sure you restarted the dev server after creating .env.local
- Verify products exist in your Shopify store

## What Happens Next

Once working:
- ✅ Products from Shopify (via Printify) will display
- ✅ Your custom design stays the same
- ✅ Products update automatically when you add new ones in Printify
- ✅ Ready to add checkout functionality

## Next Steps

After products are loading:
1. Test that products display correctly
2. Add "Add to Cart" functionality (we can implement this)
3. Set up checkout (Shopify Buy Button or Cart API)
4. Deploy your website!

Let me know once you've added the credentials and restarted the server - we can test it together!

