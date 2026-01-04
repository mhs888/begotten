# Deploy Your Website and Connect Your Domain

Great! You have a domain. Let's get your website live!

## Current Setup

✅ Website built and working locally  
✅ Products displaying (local images)  
✅ Domain purchased  
✅ Ready to deploy!

## Step 1: Prepare for Deployment

### Option A: Deploy to Vercel (Recommended - Free)

Vercel is perfect for Next.js websites and offers free hosting.

1. **Push your code to GitHub**:
   ```bash
   cd /Users/mschepis/Desktop/Begotten
   git init
   git add .
   git commit -m "Initial commit"
   ```
   
   Then create a GitHub repo and push:
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Your site will be live in minutes!

### Option B: Deploy to Netlify (Also Free)

Similar process:
- Go to [netlify.com](https://netlify.com)
- Connect GitHub
- Deploy

## Step 2: Connect Your Domain

### If Using Vercel:

1. **In Vercel dashboard**, go to your project
2. **Click "Settings"** → **"Domains"**
3. **Click "Add Domain"**
4. **Enter your domain** (e.g., begotten.com)
5. **Follow DNS instructions**:
   - Vercel will show you DNS records to add
   - Go to your domain registrar (where you bought the domain)
   - Add the DNS records Vercel provides
   - Usually takes 24-48 hours to propagate

### If Using Netlify:

1. **In Netlify dashboard**, go to your site
2. **Click "Domain settings"**
3. **Add custom domain**
4. **Follow DNS setup instructions**

## Step 3: Update Domain DNS

### Common Domain Registrars:

**Namecheap:**
1. Go to Domain List
2. Click "Manage" next to your domain
3. Go to "Advanced DNS"
4. Add records Vercel/Netlify provides

**Google Domains:**
1. Go to DNS settings
2. Add custom records

**Cloudflare:**
1. Add site to Cloudflare
2. Update nameservers
3. Add DNS records

## Step 4: Test Your Live Site

1. **Wait for DNS to propagate** (can take up to 48 hours)
2. **Visit your domain** - should see your website!
3. **Test on mobile** - make sure it looks good
4. **Test product display** - verify images load

## Step 5: Optional - Add Shopify Buy Button Later

Once your site is live, you can add Shopify Buy Button for checkout:

1. **In Shopify** → Products → Click a product
2. **"..." menu** → **"Buy Button"**
3. **Get embed code**
4. **Add to your website** where you want buy buttons

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel/Netlify
- [ ] Domain added to hosting platform
- [ ] DNS records updated at domain registrar
- [ ] Wait for DNS propagation
- [ ] Test live website
- [ ] Share your site!

## What Domain Did You Buy?

Let me know:
- What domain you purchased (e.g., begotten.com)
- Where you bought it (Namecheap, Google, etc.)
- If you've deployed to Vercel/Netlify yet

I can help you with the specific steps for your domain registrar!

## Next Steps After Deployment

1. ✅ Website live
2. ✅ Domain connected
3. ✅ Products displaying
4. ⏭️ Add Buy Button for checkout (optional)
5. ⏭️ Set up analytics (optional)
6. ⏭️ Start marketing!

Let me know what domain you got and I can help with the specific setup!

