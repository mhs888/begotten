# How to Test Your Website Locally

## Quick Start

1. **Make sure you're in the project folder**:
   ```bash
   cd /Users/mschepis/Desktop/Begotten
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

That's it! Your website is now running locally.

## What You'll See

- ✅ Your custom design
- ✅ Hero section with your quote
- ✅ Products from Shopify (if credentials are set up)
- ✅ Logo in navigation (once you add the logo file)
- ✅ All your custom styling

## Making Changes

- **Edit any file** in `components/` or `app/`
- **Save the file**
- **Browser automatically refreshes** with your changes
- No need to restart the server!

## Stopping the Server

- Press `Ctrl + C` in the terminal
- Server stops

## Troubleshooting

### "Port 3000 already in use"
- Another app is using port 3000
- Stop that app, or run: `npm run dev -- -p 3001`
- Then visit: `http://localhost:3001`

### "Cannot find module" errors
- Run: `npm install`
- Then try again

### Products not showing
- Check that `.env.local` file exists with Shopify credentials
- Check browser console (F12) for errors
- Make sure Shopify products exist in your store

## Testing Checklist

- [ ] Website loads at localhost:3000
- [ ] Hero section shows your quote
- [ ] Products section displays
- [ ] Products from Shopify appear (if credentials set)
- [ ] Logo appears (once added)
- [ ] Hover effects work on products
- [ ] Mobile responsive (resize browser window)

## Next Steps

Once everything looks good locally:
1. Add your logo file
2. Test all functionality
3. Deploy to Vercel
4. Connect your domain

Happy testing! 🚀

