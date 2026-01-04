# Verify Your Shopify Token

The 401 error means your token isn't authorized. Let's fix it.

## Quick Fix Steps

### Step 1: Check Your Token in Dev Dashboard

1. **Go to Dev Dashboard** → Your app → **Settings** → **Credentials**
2. **Look at "Private access token"**
3. **Copy it** (starts with `shpat_`)

### Step 2: Compare with .env.local

Your `.env.local` should have:
```
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_YOUR_TOKEN_HERE
```

**Does it match** what you see in Dev Dashboard?

### Step 3: Try Public Access Token Instead

Sometimes the **Public access token** works better:

1. **In Dev Dashboard** → **Settings** → **Credentials**
2. **Find "Public access token"** (the hexadecimal one, NOT `shpat_`)
3. **Try using that** in `.env.local`:

```
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=2dd81fc3944054a7f32d8dab48141af9
```

### Step 4: Regenerate Token

If token is wrong:

1. **Dev Dashboard** → **Settings** → **Credentials**
2. **Click "Rotate private access token"** or **"Generate new token"**
3. **Copy the NEW token**
4. **Update `.env.local`** with new token
5. **Restart server**

### Step 5: Verify Scopes

Make sure your app has these scopes:
- `unauthenticated_read_product_listings`
- `unauthenticated_read_product_inventory`
- `unauthenticated_read_checkouts`
- `unauthenticated_write_checkouts`

**Check:** Dev Dashboard → Your app → Versions → Active version → Access section

## What to Try First

**Try the Public access token** (the hex one, not `shpat_`):

1. Update `.env.local`:
   ```
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=2dd81fc3944054a7f32d8dab48141af9
   ```

2. Restart server

3. Check if it works

Let me know what happens!

