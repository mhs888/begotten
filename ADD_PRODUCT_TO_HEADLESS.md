# How to Add Products to Headless Sales Channel

## Quick Steps

1. **Go to Shopify Admin → Products**
   - Click on your new product

2. **Scroll down to "Sales channels" section**
   - You'll see checkboxes for different sales channels
   - Look for "Headless" in the list

3. **Check the "Headless" checkbox**
   - Click the checkbox next to "Headless"
   - If "Headless" isn't visible, you may need to enable it first (see below)

4. **Save the product**
   - Click "Save" at the top right

## If "Headless" Channel Isn't Visible

1. **Go to Shopify Admin → Settings → Sales channels**
   - Or click the "Sales channels" link in the left sidebar

2. **Look for "Headless" or "Custom Storefront"**
   - If it's not there, click "Add sales channel"
   - Search for "Headless" or "Custom Storefront"

3. **Enable the Headless channel**
   - Click "Add" or "Enable" next to Headless

4. **Go back to your product**
   - Now you should see "Headless" in the sales channels list
   - Check the box and save

## Note

Actually, for the Storefront API (which your custom Next.js site uses), products typically need to be in the **"Online Store"** sales channel, not necessarily "Headless".

The "Headless" channel is usually for Shopify's official Headless storefront solution.

**However**, if Shopify requires both channels, or if adding it to Headless fixes the issue, follow the steps above!

## After Adding to Headless

1. Save the product in Shopify
2. Wait 1-2 minutes for changes to propagate
3. Refresh your site (begotten.shop)
4. Check the browser console - you should see your new product in the list

