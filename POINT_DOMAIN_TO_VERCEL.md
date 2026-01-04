# Point Your Domain to Vercel

This guide will help you point `begotten.shop` to your Vercel deployment instead of Shopify.

## Step 1: Add Domain in Vercel

1. **Go to your Vercel project dashboard**
2. **Click "Settings"** (top navigation)
3. **Click "Domains"** (left sidebar)
4. **Click "Add Domain"** button
5. **Enter your domain**: `begotten.shop`
6. **Click "Add"**

Vercel will show you DNS records to add.

## Step 2: Get DNS Records from Vercel

After adding the domain, Vercel will show you DNS records like:

**For apex domain (begotten.shop):**
- Type: `A`
- Name: `@` or blank
- Value: `76.76.21.21` (example - Vercel will give you the actual IP)

**OR**

- Type: `CNAME`
- Name: `@` or blank  
- Value: `cname.vercel-dns.com` (example - Vercel will give you the actual value)

**For www subdomain (www.begotten.shop):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com` (example)

**Write down these values** - you'll need them!

## Step 3: Find Your Domain Registrar

You need to know where you bought the domain. Common registrars:
- Namecheap
- Google Domains
- GoDaddy
- Cloudflare
- Domain.com
- Others

**Don't know where you bought it?**
- Check your email for purchase confirmation
- Or check where you manage DNS currently

## Step 4: Update DNS Records

Go to your domain registrar and update DNS:

### If Using Namecheap:
1. Log in to Namecheap
2. Go to **Domain List**
3. Click **"Manage"** next to `begotten.shop`
4. Go to **"Advanced DNS"** tab
5. **Remove old Shopify records** (if any)
6. **Add new records** from Vercel:
   - Click **"Add New Record"**
   - Select the type (A or CNAME)
   - Enter the name and value from Vercel
   - Click save
7. **Save all changes**

### If Using Google Domains:
1. Log in to Google Domains
2. Click on `begotten.shop`
3. Go to **"DNS"** section
4. **Remove old records** (if any)
5. **Add new records** from Vercel
6. **Save**

### If Using Cloudflare:
1. Log in to Cloudflare
2. Select your domain
3. Go to **"DNS"** → **"Records"**
4. **Remove old records** (if any)
5. **Add new records** from Vercel
6. **Save**

### If Using GoDaddy:
1. Log in to GoDaddy
2. Go to **"My Products"** → **"DNS"**
3. **Remove old records** (if any)
4. **Add new records** from Vercel
5. **Save**

## Step 5: Remove Shopify Domain (Optional)

If your domain is currently connected to Shopify:

1. **Go to Shopify Admin** → **Settings** → **Domains**
2. **Find `begotten.shop`**
3. **Click "..." menu** → **"Remove"** or **"Disconnect"**
4. This won't delete your domain, just disconnect it from Shopify

## Step 6: Wait for DNS Propagation

- **DNS changes can take 24-48 hours** to fully propagate
- **Usually works within 1-2 hours**
- Vercel will show "Valid Configuration" when it's working

## Step 7: Verify It's Working

1. **Wait 10-30 minutes** after updating DNS
2. **Visit `begotten.shop`** in your browser
3. **You should see your Vercel site** (not Shopify)
4. **Check Vercel dashboard** - domain should show "Valid Configuration"

## Troubleshooting

**Domain still shows Shopify site:**
- Wait longer (DNS can take time)
- Clear browser cache
- Try incognito/private browsing
- Check DNS records are correct

**Vercel shows "Invalid Configuration":**
- Double-check DNS records match exactly
- Make sure you removed old Shopify records
- Wait a bit longer for DNS to propagate

**Need Help?**
- Tell me which registrar you're using
- I can give you specific steps for your registrar!

## Quick Checklist

- [ ] Added domain in Vercel
- [ ] Got DNS records from Vercel
- [ ] Found domain registrar
- [ ] Updated DNS records at registrar
- [ ] Removed old Shopify DNS records (if any)
- [ ] Disconnected domain from Shopify (optional)
- [ ] Waited for DNS propagation
- [ ] Verified site works at begotten.shop

Let me know which registrar you're using and I can give you exact steps!

