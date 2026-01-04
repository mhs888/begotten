# Deploy Your Website Now

This guide will help you deploy your Begotten website to Vercel (recommended for Next.js) or another platform.

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is made by the creators of Next.js and is the easiest way to deploy.

### Step 1: Prepare Your Code

1. **Make sure your code is in Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub:**
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/begotten.git
     git push -u origin main
     ```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Log in** (you can use your GitHub account)
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Configure the project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

6. **Add Environment Variables:**
   Click "Environment Variables" and add:
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` = `6tfp84-zr.myshopify.com`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` = `YOUR_TOKEN_HERE`

7. **Click "Deploy"**
8. **Wait 2-3 minutes** for deployment to complete
9. **Your site will be live!** You'll get a URL like `begotten.vercel.app`

### Step 3: Connect Your Domain (Optional)

1. In Vercel dashboard, go to your project → **Settings** → **Domains**
2. Add your domain (e.g., `begotten.shop`)
3. Follow Vercel's instructions to update your DNS records
4. Wait for DNS propagation (can take up to 24 hours, usually faster)

## Option 2: Deploy to Netlify

### Step 1: Prepare Your Code

Same as Vercel - push to GitHub first.

### Step 2: Deploy to Netlify

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/Log in**
3. **Click "Add new site" → "Import an existing project"**
4. **Connect to GitHub** and select your repository
5. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - **IMPORTANT:** Create a `netlify.toml` file in your project root:
     ```toml
     [build]
       command = "npm run build"
       publish = ".next"
     
     [[plugins]]
       package = "@netlify/plugin-nextjs"
     ```

6. **Add Environment Variables:**
   - Go to **Site settings** → **Environment variables**
   - Add your Shopify credentials

7. **Deploy!**

## Important: Environment Variables

**You MUST add your environment variables in the deployment platform!**

Your `.env.local` file is NOT deployed. You need to add these in Vercel/Netlify:

- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` = `6tfp84-zr.myshopify.com`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` = `2dd81fc3944054a7f32d8dab48141af9`

## Quick Checklist

Before deploying:
- [ ] Code is pushed to GitHub
- [ ] Environment variables are ready
- [ ] Tested locally (`npm run build` works)
- [ ] Logo image is in `/public/logo/`
- [ ] Product images are set up in Shopify

After deploying:
- [ ] Add environment variables in deployment platform
- [ ] Test the live site
- [ ] Connect your domain (if you have one)
- [ ] Update DNS records (if using custom domain)

## Troubleshooting

**Build fails:**
- Check that all dependencies are in `package.json`
- Make sure `npm run build` works locally first

**Products not showing:**
- Verify environment variables are set correctly
- Check that Shopify credentials are correct
- Look at deployment logs for errors

**Images not loading:**
- Make sure images are in `/public/` folder
- Check that Shopify image URLs are accessible

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Next.js Deployment: https://nextjs.org/docs/deployment

Good luck! 🚀

