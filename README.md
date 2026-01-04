# Begotten Clothing - Charity-Focused E-commerce

A modern, clean e-commerce website for Begotten Clothing, where 100% of profits go to charity.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy the environment variables template:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
Begotten/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero.tsx          # Hero section with navigation
│   ├── Mission.tsx       # Mission statement section
│   ├── ProductShowcase.tsx # Product listing
│   ├── ProductCard.tsx   # Individual product card
│   └── Footer.tsx        # Footer component
├── lib/                   # Utility functions
│   └── shopify.ts        # Shopify API integration
└── package.json          # Dependencies
```

## 🎨 Design & Product Creation Guide

### 1. Logo Creation

**Recommended Tools:**
- **Canva** (Free, beginner-friendly): https://canva.com
  - Templates for clothing brand logos
  - Easy drag-and-drop interface
  - Export as PNG/SVG
  
- **Adobe Illustrator** (Professional, paid): https://adobe.com/products/illustrator
  - Industry standard for vector graphics
  - Best for scalable logos
  
- **Figma** (Free tier available): https://figma.com
  - Web-based design tool
  - Great for collaboration
  - Export in multiple formats

**Logo Tips:**
- Keep it simple and memorable
- Ensure it works in black & white
- Make it scalable (vector format preferred)
- Test on different backgrounds
- Consider how it'll look on clothing

### 2. T-Shirt & Hoodie Design

**Design Tools:**
- **Adobe Photoshop/Illustrator**: Professional design software
- **Canva**: Easy-to-use templates for clothing designs
- **GIMP** (Free): Open-source alternative to Photoshop
- **Inkscape** (Free): Vector graphics editor

**Design Considerations:**
- **Print Method**: DTG (Direct-to-Garment) vs Screen Printing
  - DTG: Better for detailed, full-color designs
  - Screen Printing: Better for simple, bold designs
- **Placement**: Front, back, sleeve, or all-over print
- **Colors**: Consider print costs (more colors = higher cost)
- **Sizing**: Design should scale well across sizes

**Print-on-Demand Services** (No inventory needed):
- **Printful**: Integrates with Shopify, handles printing & shipping
- **Printify**: Similar to Printful, multiple print providers
- **Gooten**: Another POD option with good quality

**Traditional Manufacturing**:
- Find local screen printers or DTG printers
- Order samples before bulk orders
- Consider minimum order quantities

## 🌐 Domain & Hosting

### Buying a Domain

**Recommended Domain Registrars:**
- **Namecheap**: https://namecheap.com (affordable, good support)
- **Google Domains**: https://domains.google.com (simple interface)
- **Cloudflare**: https://cloudflare.com (at-cost pricing)

**Domain Tips:**
- Keep it short and memorable
- Use .com if available
- Check social media handle availability
- Consider your brand name

### Hosting & Deployment

**Recommended Platforms:**

1. **Vercel** (Recommended for Next.js):
   - Free tier available
   - Automatic deployments from GitHub
   - Built by Next.js creators
   - Setup: Connect GitHub repo → Deploy

2. **Netlify**:
   - Free tier available
   - Easy deployment
   - Good for static sites

3. **Shopify Hosting** (if using Shopify):
   - Can host your custom storefront
   - Integrated with Shopify backend

**Deployment Steps (Vercel):**
1. Push code to GitHub
2. Sign up at vercel.com
3. Import your GitHub repository
4. Add environment variables
5. Deploy!

## 🛒 Shopify Integration

### Setting Up Shopify

1. **Create Shopify Store**:
   - Go to https://shopify.com
   - Start free trial
   - Choose a plan ($29/month for Basic)

2. **Get Storefront API Access**:
   - Go to Shopify Admin
   - Navigate to: Apps → Develop apps
   - Click "Create an app"
   - Name it (e.g., "Storefront API")
   - Configure Storefront API scopes:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_checkouts`
     - `unauthenticated_write_checkouts`
   - Install app and copy the Storefront API access token

3. **Add Products**:
   - Go to Products → Add product
   - Upload images, set prices, variants (sizes, colors)
   - Add product descriptions

4. **Configure Environment Variables**:
   - Add to `.env` file:
     ```
     NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
     NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
     ```

### Alternative: Shopify Buy Button

If you prefer a simpler integration, you can use Shopify's Buy Button:
- Embeddable product widgets
- Less customization but easier setup
- Good for quick launches

## 📝 Next Steps

1. **Design Your Products**:
   - Create logo using recommended tools
   - Design t-shirt and hoodie graphics
   - Get samples printed before launch

2. **Set Up Shopify**:
   - Create store and add products
   - Configure payment processing
   - Set up shipping options

3. **Customize Website**:
   - Replace placeholder product images
   - Update colors/branding in `tailwind.config.js`
   - Add your actual product data

4. **Buy Domain & Deploy**:
   - Purchase domain name
   - Deploy to Vercel/Netlify
   - Connect domain to hosting

5. **Test Everything**:
   - Test checkout process
   - Verify payment processing
   - Test on mobile devices

## 🎯 Features

- ✅ Modern, responsive design
- ✅ Product showcase with filtering
- ✅ Mission-focused messaging
- ✅ Ready for Shopify integration
- ✅ Mobile-friendly
- ✅ SEO optimized

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shopify Storefront API](https://shopify.dev/api/storefront)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Printful Integration Guide](https://www.printful.com/shopify)

## 🤝 Contributing

This is a personal project, but feel free to fork and adapt for your own use!

## 📄 License

Private project - All rights reserved

---

**Remember**: Start small, test with friends/family, iterate based on feedback, and most importantly - make sure your charitable mission is clear and transparent to customers!

