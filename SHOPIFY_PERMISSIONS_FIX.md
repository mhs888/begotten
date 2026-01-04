# Fix: "Doesn't have permission to view this page" in Shopify

## The Problem

You're seeing this error because:
- You're logged in with an account that doesn't have **owner** or **admin** permissions
- You need to be the **store owner** or have **full admin access** to create apps

## Solution 1: Switch to Store Owner Account

1. **Click "Switch Accounts"** button (the dark button on the right)
2. **Log in with the store owner account**:
   - This is the account that **created** the Shopify store
   - Or the account that has **full admin permissions**
3. **Try the direct URL again** after switching

## Solution 2: Check Your Account Permissions

If you're already logged in as what you think is the owner:

1. **Go to Shopify Admin** (main dashboard)
2. **Click "Settings"** (gear icon, bottom left)
3. **Click "Users and permissions"**
4. **Check your account**:
   - Look for your email address
   - Check what **"Role"** it shows
   - You need **"Owner"** or **"Staff"** with **"Full permissions"**

## Solution 3: Ask Store Owner to Grant Permissions

If you're not the store owner:

1. **Contact the store owner**
2. **Ask them to**:
   - Go to Settings → Users and permissions
   - Find your account
   - Change your role to **"Staff"** with **"Full permissions"**
   - Or give you **"App development"** permissions specifically

## Solution 4: Use Store Owner Account

If you have access to the store owner account:

1. **Log out** of your current account
2. **Log in** with the store owner email/password
3. **Try the direct URL again**:
   ```
   https://YOUR-STORE.myshopify.com/admin/settings/apps/develop
   ```

## How to Know if You're the Owner

- **Check Settings → Users and permissions**:
  - Owner account will show "Owner" as the role
  - Owner account usually can't be deleted
  - Owner account is usually the first account created

## Alternative: Ask Store Owner to Create App

If you can't get the right permissions:

1. **Ask the store owner** to:
   - Follow the steps in `GET_SHOPIFY_CREDENTIALS.md`
   - Create the app
   - Get the Storefront API access token
   - Share the token with you (securely!)

2. **Then you can**:
   - Add the token to your `.env.local` file
   - Use it in your website

## Quick Steps to Fix Right Now

1. ✅ Click **"Switch Accounts"** button
2. ✅ Log in with **store owner account**
3. ✅ Go to: `https://YOUR-STORE.myshopify.com/admin/settings/apps/develop`
4. ✅ You should now see "Create an app" button

## Still Having Issues?

If switching accounts doesn't work:

1. **Make sure you're using the correct Shopify store**
   - You might have multiple stores
   - Make sure you're accessing the right one

2. **Check if you're on a trial**
   - Some trial accounts have limited access
   - Make sure your store is fully set up

3. **Contact Shopify Support**
   - They can help verify your account permissions
   - They can enable app development if needed

## What You Need

To create apps in Shopify, you need:
- ✅ Store owner account, OR
- ✅ Staff account with "Full permissions", OR
- ✅ Staff account with "App development" permissions

The account you're currently using (nfttnx6s84@privaterelay.appleid.com) doesn't have these permissions.

## Next Steps

Once you're logged in with the right account:
1. Go to the develop apps page
2. Create an app
3. Get your Storefront API token
4. Add it to your website

Let me know once you've switched accounts and we can continue!

