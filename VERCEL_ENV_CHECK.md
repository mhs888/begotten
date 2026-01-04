# Fix: Products Not Showing on Deployed Site

If your deployed site shows only 2 products instead of all 6 from Shopify, the environment variables are likely not set correctly in Vercel.

## Step 1: Check Environment Variables in Vercel

1. **Go to your Vercel project dashboard**
2. **Click "Settings"** (top navigation)
3. **Click "Environment Variables"** (left sidebar)
4. **Verify these two variables exist:**

   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
     - Value should be: `6tfp84-zr.myshopify.com`
   
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
     - Value should be: `2dd81fc3944054a7f32d8dab48141af9`

## Step 2: If Variables Are Missing or Wrong

1. **Add/Edit the variables:**
   - Click "Add New" or edit existing ones
   - Make sure the **exact names** match (case-sensitive!)
   - Make sure the values are correct
   - **Important:** Check all environments (Production, Preview, Development)

2. **Save the variables**

## Step 3: Redeploy After Adding Variables

**Environment variables only take effect on NEW deployments!**

1. **Go to "Deployments" tab**
2. **Click "..." menu** on your latest deployment
3. **Click "Redeploy"**
4. **Wait for it to complete**

## Step 4: Verify It's Working

1. **Visit your live site**
2. **Open browser console** (F12 or Cmd+Option+I)
3. **Check for errors** - you should see:
   - "Attempting to fetch from Shopify store: 6tfp84-zr.myshopify.com"
   - "Successfully fetched X products using API..."
4. **All 6 products should appear**

## Common Issues

**"Only 2 products showing"**
- Environment variables not set
- Wrong variable names (check for typos)
- Variables not applied to Production environment

**"No products showing"**
- Check browser console for errors
- Verify Shopify token is correct
- Check that products are in "Online Store" sales channel

## Quick Checklist

- [ ] Environment variables added in Vercel
- [ ] Variable names are EXACTLY correct (case-sensitive)
- [ ] Values are correct
- [ ] Applied to Production environment
- [ ] Redeployed after adding variables
- [ ] Checked browser console for errors

Let me know what you see in the Environment Variables section!

