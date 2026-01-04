# Image Loading Troubleshooting

## Quick Fix for Images Not Loading

### Step 1: Check Your Image Files

Make sure your images are in the correct location:
- **Path**: `/Users/mschepis/Desktop/Begotten/public/products/`
- **File names must be exactly**:
  - `cross-tee.jpg` (or .png)`
  - `crown-tee.jpg` (or .png)

### Step 2: Verify Files Exist

Open Terminal and run:
```bash
cd /Users/mschepis/Desktop/Begotten
ls -la public/products/
```

You should see your image files listed.

### Step 3: Check File Names Match

In `components/ProductShowcase.tsx`, the image paths are:
- `/products/cross-tee.jpg`
- `/products/crown-tee.jpg`

**Important**: File names are case-sensitive!
- ✅ `cross-tee.jpg` - Correct
- ❌ `Cross-Tee.jpg` - Wrong (capital letters)
- ❌ `cross_tee.jpg` - Wrong (underscore instead of hyphen)

### Step 4: Restart Dev Server

After adding images, restart your dev server:
1. Press `Ctrl + C` in terminal to stop
2. Run `npm run dev` again
3. Refresh your browser (Cmd+R or F5)

### Step 5: Check Browser Console

If images still don't load:
1. Open browser developer tools (F12 or Cmd+Option+I)
2. Go to "Console" tab
3. Look for any error messages about images
4. Check "Network" tab to see if image requests are failing

## Common Issues

### Issue: "Image Not Found" placeholder shows
**Solution**: 
- Check file name matches exactly (case-sensitive)
- Make sure file is in `/public/products/` folder
- Restart dev server

### Issue: Images are broken/not displaying
**Solution**:
- Check file format (JPG, PNG, or WebP)
- Make sure file isn't corrupted
- Try a different image file to test

### Issue: Images load but look wrong
**Solution**:
- Use square images (1:1 ratio) for best results
- Recommended size: 1200x1200px
- Use white/light backgrounds

## Testing Your Images

To test if an image path works, try accessing it directly in your browser:
- `http://localhost:3000/products/cross-tee.jpg`
- `http://localhost:3000/products/crown-tee.jpg`

If you see the image, the path is correct. If you get a 404 error, the file isn't in the right place.

## Still Having Issues?

1. **Double-check file location**: Must be in `public/products/` (not just `public/`)
2. **Check file extensions**: Use `.jpg`, `.jpeg`, or `.png`
3. **Verify file names**: Must match exactly what's in `ProductShowcase.tsx`
4. **Clear browser cache**: Sometimes old cached versions cause issues
5. **Try a different image**: Test with a simple image to see if it's a file-specific issue

