# Complete Setup Guide for Begotten Clothing

This guide covers all three parts of your plan: product design, website creation, and Shopify integration.

## Part 1: Design Your Products

### Creating Your Logo

**Option 1: Canva (Recommended for Beginners)**
1. Go to [canva.com](https://canva.com) and create a free account
2. Click "Create a design" → "Logo"
3. Browse templates or start from scratch
4. Customize colors, fonts, and graphics
5. Download as PNG (transparent background) and SVG

**Option 2: Adobe Illustrator (Professional)**
1. Create a new document (1000x1000px)
2. Design your logo using shapes and text
3. Export as SVG for scalability
4. Also export PNG versions for web use

**Logo Tips:**
- Keep it simple - it needs to work small and large
- Test on both light and dark backgrounds
- Make sure it's readable when printed on clothing
- Consider how it looks as just an icon (for social media)

### Creating T-Shirt & Hoodie Designs

**Step 1: Choose Your Design Tool**

**For Beginners:**
- **Canva**: Use t-shirt design templates
- **Placeit**: Create product mockups easily
- **Adobe Express**: Free design tool with templates

**For Advanced:**
- **Adobe Illustrator**: Best for vector graphics
- **Adobe Photoshop**: Best for photo-based designs
- **Figma**: Great for collaborative design

**Step 2: Design Specifications**

For Print-on-Demand (recommended to start):
- **Resolution**: 300 DPI minimum
- **Size**: 4500 x 5400 pixels (15" x 18")
- **Format**: PNG with transparent background
- **Color Mode**: RGB
- **File Size**: Under 25MB

**Step 3: Design Ideas**
- Front chest logo (small, left or center)
- Full front design
- Back design (larger, more detailed)
- Sleeve designs (optional)
- All-over print (more expensive)

**Step 4: Create Mockups**
- Use **Placeit** or **Smartmockups** to visualize your designs
- This helps you see how designs look on actual garments
- Great for product photos if you don't have samples yet

### Where to Get Products Made

**Print-on-Demand (No Inventory - Recommended to Start):**
1. **Printful** (printful.com)
   - Integrates directly with Shopify
   - Handles printing and shipping
   - You only pay when someone orders
   - Good quality, many product options

2. **Printify** (printify.com)
   - Similar to Printful
   - Multiple print provider options
   - Competitive pricing

**Traditional Manufacturing:**
- Find local screen printers or DTG printers
- Better for bulk orders (lower per-unit cost)
- Requires upfront investment
- Minimum order quantities usually apply

## Part 2: Build Your Website

### Your Website is Already Built! 🎉

I've created a modern, clean website for you. Here's what you have:

**Features:**
- ✅ Beautiful hero section with navigation
- ✅ Mission statement section
- ✅ Product showcase with filtering
- ✅ Responsive design (works on mobile)
- ✅ Modern UI with smooth animations
- ✅ Ready for Shopify integration

### Getting Started Locally

1. **Install Node.js** (if you haven't):
   - Download from [nodejs.org](https://nodejs.org)
   - Install version 18 or higher

2. **Install Dependencies**:
   ```bash
   cd /Users/mschepis/Desktop/Begotten
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **View Your Site**:
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - You should see your website!

### Customizing Your Website

**Change Colors:**
- Edit `tailwind.config.js`
- Modify the `primary` color values
- Or change individual component colors

**Update Content:**
- Edit `components/Hero.tsx` for hero section text
- Edit `components/Mission.tsx` for mission content
- Edit `components/Footer.tsx` for footer information

**Add Your Logo:**
1. Place logo file in `public/` folder
2. Update `components/Hero.tsx` to use your logo image
3. Replace the text "BEGOTTEN" with an `<Image>` component

**Replace Product Images:**
- Place product images in `public/` folder
- Update `components/ProductShowcase.tsx` with your actual products
- Or wait until Shopify integration (products will come from Shopify)

### Buying a Domain

**Recommended Domain Registrars:**

1. **Namecheap** (namecheap.com)
   - Affordable pricing
   - Good customer support
   - Easy to use

2. **Google Domains** (domains.google.com)
   - Simple interface
   - Good integration with other Google services

3. **Cloudflare** (cloudflare.com)
   - At-cost pricing (very affordable)
   - Free privacy protection

**Steps:**
1. Search for your desired domain name
2. Check availability
3. Purchase (usually $10-15/year for .com)
4. You'll configure DNS later when deploying

**Domain Tips:**
- Keep it short and memorable
- Use .com if possible
- Check social media handle availability
- Consider your brand name

### Deploying Your Website

**Option 1: Vercel (Recommended - Free)**

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"
   - Add environment variables (from `.env` file)

3. **Connect Domain**:
   - In Vercel dashboard, go to your project
   - Click "Settings" → "Domains"
   - Add your domain
   - Update DNS records as instructed

**Option 2: Netlify (Also Free)**

1. Similar process to Vercel
2. Go to [netlify.com](https://netlify.com)
3. Connect GitHub and deploy

**Option 3: Shopify Hosting**

If you're using Shopify, you can host a custom storefront:
- More complex setup
- Better integration with Shopify backend
- Requires Shopify Plus for full customization

## Part 3: Integrate Shopify for Sales

### Setting Up Shopify Store

1. **Create Shopify Account**:
   - Go to [shopify.com](https://shopify.com)
   - Start 14-day free trial
   - Choose a plan:
     - **Basic Shopify**: $29/month (good to start)
     - **Shopify**: $79/month (more features)
     - **Advanced**: $299/month (for scaling)

2. **Set Up Your Store**:
   - Complete store setup wizard
   - Add store name and details
   - Set up payment processing (Stripe, PayPal, etc.)
   - Configure shipping settings

### Adding Products to Shopify

1. **Go to Products**:
   - Click "Products" in Shopify admin
   - Click "Add product"

2. **Fill in Product Details**:
   - Product name
   - Description
   - Images (upload your product photos/mockups)
   - Price
   - Variants (sizes: S, M, L, XL, etc.)
   - Inventory (if not using print-on-demand)

3. **For Print-on-Demand**:
   - Install Printful or Printify app
   - Connect to your Shopify store
   - Products sync automatically
   - Orders are fulfilled automatically

### Getting Shopify API Credentials

1. **Create Storefront API App**:
   - In Shopify Admin, go to "Apps"
   - Click "Develop apps" (bottom of page)
   - Click "Create an app"
   - Name it (e.g., "Storefront API")
   - Click "Create app"

2. **Configure API Scopes**:
   - Click "Configure Storefront API scopes"
   - Enable these scopes:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_checkouts`
     - `unauthenticated_write_checkouts`
   - Click "Save"

3. **Install App and Get Token**:
   - Click "Install app"
   - Copy the "Storefront API access token"
   - You'll need this for your website

### Connecting Website to Shopify

1. **Create Environment File**:
   ```bash
   cp env.template .env.local
   ```

2. **Add Your Credentials**:
   Edit `.env.local`:
   ```
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
   ```

3. **Update Product Component**:
   - The `lib/shopify.ts` file has the integration code
   - Update `components/ProductShowcase.tsx` to fetch from Shopify
   - Replace placeholder products with real Shopify data

4. **Test Integration**:
   - Restart your dev server
   - Check that products load from Shopify
   - Test "Add to Cart" functionality

### Alternative: Shopify Buy Button

If the full integration seems complex, you can use Shopify's Buy Button:
- Simpler setup
- Less customization
- Good for quick launch
- Can upgrade to full integration later

**Steps:**
1. In Shopify, go to "Online Store" → "Themes"
2. Click "..." → "Edit code"
3. Or use Shopify's Buy Button embed code
4. Add to your website

## Complete Workflow

### Phase 1: Design (Week 1)
- [ ] Create logo
- [ ] Design t-shirt graphics
- [ ] Design hoodie graphics
- [ ] Create product mockups
- [ ] Get feedback from friends/family

### Phase 2: Setup (Week 2)
- [ ] Set up Shopify store
- [ ] Add products to Shopify
- [ ] Set up payment processing
- [ ] Configure shipping
- [ ] Test checkout process

### Phase 3: Website (Week 2-3)
- [ ] Customize website content
- [ ] Add your logo and branding
- [ ] Connect Shopify to website
- [ ] Test product display
- [ ] Test on mobile devices

### Phase 4: Launch Prep (Week 3)
- [ ] Buy domain name
- [ ] Deploy website
- [ ] Connect domain
- [ ] Final testing
- [ ] Prepare launch announcement

### Phase 5: Launch! (Week 4)
- [ ] Launch website
- [ ] Share on social media
- [ ] Tell friends and family
- [ ] Start marketing
- [ ] Monitor sales and feedback

## Quick Reference

**Design Tools:**
- Logo: Canva, Adobe Illustrator, Figma
- Product Design: Canva, Adobe Photoshop/Illustrator
- Mockups: Placeit, Smartmockups

**Print-on-Demand:**
- Printful (printful.com)
- Printify (printify.com)

**Domain:**
- Namecheap, Google Domains, Cloudflare

**Hosting:**
- Vercel (vercel.com) - Recommended
- Netlify (netlify.com)

**E-commerce:**
- Shopify (shopify.com)

## Need Help?

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Shopify Docs**: [shopify.dev](https://shopify.dev)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Next Steps

1. **Right Now**: Run `npm install` and `npm run dev` to see your website
2. **This Week**: Create your logo and product designs
3. **Next Week**: Set up Shopify and add products
4. **Week 3**: Deploy website and connect everything
5. **Week 4**: Launch! 🚀

Good luck with your clothing brand! Remember, start small, test everything, and iterate based on feedback.

