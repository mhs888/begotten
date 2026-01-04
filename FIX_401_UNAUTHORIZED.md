# Fix: 401 Unauthorized Error

You're getting a 401 Unauthorized error, which means the API token isn't working correctly.

## The Problem

The error `401 (Unauthorized)` with code `UNAUTHORIZED` means:
- ❌ Token is invalid, OR
- ❌ Token doesn't have the right permissions, OR
- ❌ Token is for a different store, OR
- ❌ API version is wrong

## Solutions

### Solution 1: Verify Token is Correct

1. **Go back to Shopify Dev Dashboard**
2. **Go to your app** → **Settings** → **Credentials**
3. **Check the "Private access token"** (starts with `shpat_`)
4. **Make sure it matches** what's in your `.env.local` file
5. **Copy it again** if needed

### Solution 2: Check Token Permissions

The token needs these scopes:
- ✅ `unauthenticated_read_product_listings`
- ✅ `unauthenticated_read_product_inventory`
- ✅ `unauthenticated_read_checkouts`
- ✅ `unauthenticated_write_checkouts`

**To check:**
1. Dev Dashboard → Your app → **Versions**
2. Click on your active version
3. Check **"Access"** section
4. Make sure all 4 scopes are listed

### Solution 3: Try Public Access Token

You might need to use the **Public access token** instead:

1. **In Dev Dashboard** → **Settings** → **Credentials**
2. **Find "Public access token"** (the one that's NOT `shpat_`)
3. **Try using that** in `.env.local` instead

### Solution 4: Regenerate Token

If token is wrong:

1. **Dev Dashboard** → **Settings** → **Credentials**
2. **Click "Rotate private access token"** or **"Generate new token"**
3. **Copy the new token**
4. **Update `.env.local`** with new token
5. **Restart server**

### Solution 5: Check API Version

I've updated the code to try multiple API versions automatically. But you can also check:

- Current: `2025-01`
- Alternatives: `2024-10`, `2024-07`, `2024-04`

## What to Do Now

1. **Check your token** in Dev Dashboard → Settings → Credentials
2. **Verify it matches** `.env.local`
3. **Check scopes** are correct
4. **Try regenerating token** if needed
5. **Restart server** after changing `.env.local`

## Quick Test

After updating token:

1. **Restart server**: `npm run dev`
2. **Check console** - should see "Successfully fetched X products"
3. **Products should appear** on website

Let me know what token you see in Dev Dashboard and we can verify it's correct!

