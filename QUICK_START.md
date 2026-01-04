# Quick Start Guide

## Step 1: Install Node.js

If you don't have Node.js installed:

1. **Download Node.js**:
   - Go to: https://nodejs.org
   - Download the **LTS version** (recommended)
   - Choose the macOS installer (.pkg file)

2. **Install Node.js**:
   - Double-click the downloaded .pkg file
   - Follow the installation wizard
   - Click "Install" when prompted
   - Enter your password if needed

3. **Verify Installation**:
   - Open Terminal (Applications → Utilities → Terminal)
   - Run these commands:
     ```bash
     node --version
     npm --version
     ```
   - You should see version numbers (e.g., v18.17.0 and 9.6.7)

## Step 2: Install Project Dependencies

1. **Open Terminal**

2. **Navigate to your project**:
   ```bash
   cd /Users/mschepis/Desktop/Begotten
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
   
   This will download all the required packages (Next.js, React, etc.)
   - Takes 1-2 minutes
   - Creates a `node_modules` folder
   - You'll see a progress bar

## Step 3: Run the Development Server

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **You should see**:
   ```
   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   - Ready in 2.3s
   ```

3. **Open your browser**:
   - Go to: http://localhost:3000
   - You should see your website!

## Step 4: Making Changes

- Edit any file in the `components/` or `app/` folders
- Save the file
- The browser will automatically refresh with your changes
- No need to restart the server!

## Stopping the Server

- Press `Ctrl + C` in the terminal to stop the server

## Troubleshooting

### "command not found: node"
- Node.js is not installed
- Go back to Step 1 and install Node.js
- Make sure to restart Terminal after installing

### "npm: command not found"
- Node.js installation might be incomplete
- Reinstall Node.js from nodejs.org

### "EACCES" or permission errors
- Try: `sudo npm install` (enter your password)
- Or fix npm permissions: https://docs.npmjs.com/resolving-eacces-permissions-errors

### Port 3000 already in use
- Another app is using port 3000
- Stop that app, or run: `npm run dev -- -p 3001`
- Then visit: http://localhost:3001

### Dependencies fail to install
- Check your internet connection
- Try: `npm install --verbose` to see detailed errors
- Delete `node_modules` folder and `package-lock.json`, then try again

## What Each Command Does

- `npm install` - Downloads and installs all packages listed in `package.json`
- `npm run dev` - Starts the Next.js development server
- `npm run build` - Creates a production build (for deployment)
- `npm run start` - Runs the production build locally

## Next Steps

Once your site is running:
1. Customize the content in `components/` folder
2. Add your logo and product images
3. Set up Shopify (see `SETUP_GUIDE.md`)
4. Deploy to Vercel (see `SETUP_GUIDE.md`)

